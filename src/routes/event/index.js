import { h, Component } from 'preact';
import style from './style';
import {che} from '../../components/resolver';
import { Link } from 'preact-router/match';
import debug from 'debug';
const log = debug('APP:event');
export default class extends Component {
	name="event"
	componentWillMount() {
		che.store.bind(this,[che.STORES.warning,che.STORES.api,che.STORES.marketing]);
	}
	/*shouldComponentUpdate(nextProps, nextState) {
		log('shouldComponentUpdate',nextState);
	}*/
	componentDidUpdate(prevProps, prevState) {
		log('componentDidUpdate did',this.state)
		if(!prevState.marketing.askEmail && this.state.marketing.askEmail){
			setTimeout(()=>$('#askEmailModal').modal('show'),200)
			log('show modal!');
		} 
	}
	handleSave(){
		let data = {
			title:this.state.title.value,
			description:this.state.description.value
		};
		che.action.SAVE_EVENT(data);
	}
	render() {
		let warningAlert = !this.state.warning.active?"":`
<div class="alert alert-warning" role="alert">
  <h5>${this.state.warning.title}</h5>
  ${this.state.warning.message}
</div>
		`

		let askEmail = this.state.marketing.askEmail?this.state.marketing.template:"";




		return (
			<div class="container route-wrapper">
				<div class="row mb-4">
					<div class="col p-0">
						<ol class="breadcrumb">
						  <li class="breadcrumb-item"><a href="/">Meetful</a></li>
						  <li class="breadcrumb-item"><a href="/my-events">My events</a></li>
						  <li class="breadcrumb-item active">New</li>
						</ol>
					</div>
				</div>

				<div class="row mb-2">
					
				</div>

				<div class="row align-items-center justify-content-center">
					<div class="col col-sm-8 col-md-7 col-lg-5">
						<form class="px-2 px-sm-0 mx-auto w-100">
						  <div class="form-group">
						    <label>Title</label>
						    <input ref={(input) => { this.state.title = input; }} type="text" class="form-control"  placeholder="" />
						    <small class="form-text text-muted">Inspire us!.</small>
						  </div>
						  <div class="form-group">
						    <label>Description</label>
						    <textarea ref={(input) => { this.state.description = input; }}  type="text" class="form-control" placeholder="">
						    </textarea>
						  </div>
						  <button type="button" onClick={this.handleSave.bind(this)} class="btn btn-primary">Let's save it!</button>
						  <div dangerouslySetInnerHTML={{__html: warningAlert}} ></div>
						  <div dangerouslySetInnerHTML={{__html: askEmail}} ></div>
						  
						</form>
					</div>
				</div>

			</div>
		);
	}
}
