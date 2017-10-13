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
                
                link={[
                    {rel: "stylesheet", href: "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"},
                ]}
               
            />
				<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
				<Header />
				<Router onChange={this.handleRoute}>
					
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />

					<Resolver.route.event path="/event/" _id="-1" />
					<Resolver.route.event path="/event/:_id" />

					<Resolver.route.about path="/"/>
					<Resolver.route.explore path="/explore"/>
					<Resolver.route.myevents path="/my-events"/>
				</Router>
			</div>
		);
	}
}
