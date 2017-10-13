import { h, Component } from 'preact';
import style from './style';

export default class Home extends Component {
	render() {
		return (
			<div class="route-wrapper">
				<h1>Home</h1>
				<div class="alert alert-primary" role="alert">
  This is a primary alert—check it out!
</div>
				<p>This is the Home component.</p>
			</div>
		);
	}
}
