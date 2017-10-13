import { h, Component } from 'preact';
import style from './style';

export default class extends Component {
	render() {
		return (
			<div class="route-wrapper">
				<h1>About</h1>
				<div class="alert alert-primary" role="alert">
  This is a primary alert—check it out!
</div>
				<p>This is the Home component.</p>
			</div>
		);
	}
}
