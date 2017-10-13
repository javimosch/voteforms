process.env.DEBUG = "app:*";

var sander = require('sander');
const debug = require('debug');
const gulp = require('gulp');
const watch = require('gulp-watch');
const log = debug('app:GULP');

async function generateResolver() {
	let log = debug('app:GULP:resolver');
	var dirs = await sander.readdir(__dirname + '/src/components');

	var routes = await sander.readdir(__dirname + '/src/routes');
	//throw Error('DIRS '+JSON.stringify(dirs));

	var content = `

import debug from 'debug';
var log = debug('APP:Resolver:');

`;

	dirs.forEach(dir => {
		if (dir.indexOf('.js') !== -1) return;
		content += `
import ${dir}, * as ${dir}Exports from './${dir}';`;
	});

	routes.forEach(dir => {
		if (dir.indexOf('.js') !== -1) return;
		content += `
import ${dir}, * as ${dir}Exports from '../routes/${dir}';`;
	});

	content+=`

let route = {`;
	let routesstr="";
	routes.forEach(dir => {
		if (dir.indexOf('.js') !== -1) return;
		routesstr += `
	${dir}, ${dir}Exports,`;
	});
	routesstr = routesstr.substring(0, routesstr.length - 1);
	content+=routesstr+`
};
export {route};
	`;

	let exportstr = "";
	dirs.forEach(dir => {
		if (dir.indexOf('.js') !== -1) return;
		exportstr += `
${dir}, ${dir}Exports,`;

		content += `
log('Export ${dir} and ${dir}Exports (',Object.keys(${dir}Exports)+')');
`

	});

	routes.forEach(dir => {
		if (dir.indexOf('.js') !== -1) return;
		content += `
log('Export routes.${dir} and routes.${dir}Exports (',Object.keys(${dir}Exports)+')');
`
	});

	exportstr = exportstr.substring(0, exportstr.length - 1);
	content += `
export { 
	${exportstr} 
};`

	await sander.writeFile(__dirname + '/src/components/resolver.js', content);
	log('Updated at ',Date.now());
}

gulp.task('watch', function(next) {
	let log = debug('app:GULP:JSX');
	let active = false;
	watch(["./src/**/*.js", "!node_modules", "!./**/*bundle*.js","!./**/*resolver*.js"], {
		ignoreInitial: false
	}, async function() {
		if (active) return;
		active = true;

		await generateResolver();
		active=false;
	});

	next();
});

gulp.task('default', ['watch']);