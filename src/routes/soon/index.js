import { h, Component } from 'preact';
import style from './style';

export default class extends Component {
	render() {
		return (
			<div class={style.soon}>
				<h1>Coming soon</h1>
			</div>
		);
	}
}
