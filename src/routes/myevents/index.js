import { h, Component } from 'preact';
import style from './style';
import che from 'react-che';
import { Link } from 'preact-router/match';
export default class extends Component {
	componentWillMount() {
		
	}
	render() {
		return (
			<div class="container route-wrapper">
				<div class="row mb-4">
					<div class="col p-0">
						<ol class="breadcrumb">
						  <li class="breadcrumb-item"><a href="/">Meetful</a></li>
						  <li class="breadcrumb-item active">My events</li>
						</ol>
					</div>
				</div>

				<div class="row mb-2">
					<Link href="/event/" className="btn btn-primary">Create new!</Link>
				</div>

				<div class="row">
					<ul class="list-group w-100">
	  					<li class="list-group-item">we can't believe is empty...</li>
					</ul>
				</div>

			</div>
		);
	}
}
