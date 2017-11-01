import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import debug from 'debug';
let log = debug('APP:header');
const win = (typeof window !== "undefined"?window:{});
export default class Header extends Component {
	componentWillMount() {
		this.setState({
			collapsed:false
		})
	}
	toggleMenu(){
		this.setState({
			collapsed:!this.state.collapsed
		});
	}
	activeLink(route){
		let cls = '';
		if(win.location){
			cls = win.location.href.replace(win.location.origin,'');
			cls = cls==route?' active' : "";
		}
		return "nav-item"+cls;
		log('activeLink',route,cls);
	}
	render() {
		let collapsable = "collapse navbar-collapse";
		collapsable = this.state.collapsed?collapsable+' show':collapsable;
		return (
			<div class={style.header}>
				<nav class="navbar navbar-expand-lg navbar-light bg-light">
				  <button onClick={this.toggleMenu.bind(this)} class="navbar-toggler" type="button"  aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
				    <span class="navbar-toggler-icon"></span>
				  </button>
				  <div class={collapsable}>
				    <a class="navbar-brand" href="/">Voteforms</a>
				    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
				      <li class={this.activeLink('/')}>
				        <Link className="nav-link"  href="/">About</Link>
				      </li>
				      <li class={this.activeLink('/explore')}>
				      <Link className="nav-link"  href="/explore">Explore</Link>
				      </li>
				      <li class={this.activeLink('/my-events')}>
				        <Link className="nav-link" href="/my-events">My events</Link>
				      </li>
				    </ul>
				    <form class="form-inline my-2 my-lg-0">
				      <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
				      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
				    </form>
				  </div>
				</nav>
				</div>
		);
	}
}
