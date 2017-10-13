import { h, Component } from 'preact';
import style from './style';
import che from 'react-che';
export default class extends Component {
	componentWillMount() {
		
	}
	render() {
		return (
			<div class="route-wrapper">
				<h1>Explore</h1>
				<div class="alert alert-primary" role="alert">
  This is a primary alert—check it out!
</div>
				<p>This is the Home component.</p>
			</div>
		);
	}
}
