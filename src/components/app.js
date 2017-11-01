import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Helmet from "preact-helmet";
const win = (typeof window !== "undefined"?window:{});


if(win.localStorage){
	win.localStorage.debug="APP:*,*che*";
}

import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
import * as Resolver from './resolver';

Resolver.apiExports.configure();


export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
			<Helmet
                title="Voteforms"
                link={[
                    {rel: "stylesheet", href: "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"},
                ]}
               
            />
			

				<Router onChange={this.handleRoute}>
					
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />

					<Resolver.route.event path="/event/" _id="-1" />
					<Resolver.route.event path="/event/:_id" />

					<Resolver.route.soon path="/"/>
					<Resolver.route.explore path="/explore"/>
					<Resolver.route.myevents path="/my-events"/>
				</Router>
			</div>
		);
	}
}
