const firebase = require("firebase");
require("firebase/firestore");
import debug from 'debug';
import {
	che
} from '../resolver';

import * as Resolver from '../resolver';

import {
	h,
	Component
} from 'preact';
import style from './style';
const log = debug('APP:api');
export default class extends Component {
	componentWillMount() {

	}
	render() {
		return ("");
	}
}

let db; //firestore database

function getReferenceWhere(collection,where){
	return new Promise(async(resolve, reject) => {
		let rta = null;
		var docs = await db.collection(collection).where(where[0],where[1],where[2]);
		docs.forEach(function(doc) {
			log('getReference',doc.id,id);
			rta = doc.id == id ? doc.ref : null
		});
		if (rta) return resolve(rta);
		reject("Reference not found");
	});
}

function getReference(collection, id) {
	return new Promise(async(resolve, reject) => {
		let rta = null;
		var docs = await db.collection(collection).get();
		docs.forEach(function(doc) {
			log('getReference',doc.id,id);
			rta = doc.id == id ? doc.ref : null
		});
		if (rta) return resolve(rta);
		reject("Reference not found");
	});
}



async function add(collection, data) {
	try {
		await db.collection(collection).add(data);
	} catch (err) {
		log('ADD ERROR', err.stack);
	}
}


export function configure() {
	/*db.collection("users").add({
		first_name: "Pablo "+Date.now(),
	});
	log('Creado usuario'+Date.now());*/
	var config = {
		apiKey: "AIzaSyB8riHvf4BwR7qOmAARsB3XRcRfueneUOs",
		authDomain: "meeatful.firebaseapp.com",
		databaseURL: "https://meeatful.firebaseio.com",
		projectId: "meeatful",
		storageBucket: "meeatful.appspot.com",
		messagingSenderId: "520596335619"
	};
	firebase.initializeApp(config);
	db = firebase.firestore();

	che.defineActions([
		"ASK_FOR_EMAIL",

		"CLEAR_WARNING",

		"SAVE_USER", "SAVE_EVENT", "SHOW_WARNING"]);

	che.defineStore('api', {}, (action) => {
		action.on.SAVE_EVENT(async(state, data) => {

			if (!data.title) return che.action.SHOW_WARNING('title');
			if (!data.email) return che.action.ASK_FOR_EMAIL();

			await add('events', {
				title: data.title,
				created_at:new Date(),
				updated_at:new Date(),
				status: await getReference('event_statuses','draft')
			});
			return true;
		});
	});

	che.defineStore('marketing', {
		foo:1,
		askEmail:false,
		template:"QWE"
	}, (action) => {
		action.on.ASK_FOR_EMAIL((state, data) => {
			state.askEmail=true;
			state.template=Resolver.template.modals.askForEmail()
			log('marketing as for emaiasdadsad',state);
			return true;
		});
	});

	
	che.defineStore('warning', {
		title: "",
		message: "",
		active: false
	}, (action) => {
		action.on.SHOW_WARNING((state, title) => {
			state.title = "Field required";
			state.message = "The field " + title + " is required";
			state.active = true;
			setTimeout(() => che.action.CLEAR_WARNING(), 3000);
			return true;
		});

		action.on.CLEAR_WARNING((state) => {
			state.active = false;
			return true;
		});
	});

	

	log('OK')

}