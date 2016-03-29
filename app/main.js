'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const paths = {
	module: path.join(__dirname, '..', 'node_modules'),
	gulp: path.join(__dirname, '..', 'node_modules', 'gulp', 'bin', 'gulp.js'),
	icon: path.join(__dirname, '..', 'icon.png')
};
const workerEnv = {
	NODE_PATH: paths.module,
	ELECTRON_RUN_AS_NODE: true,
	ELECTRON_NO_ATTACH_CONSOLE: false,
	ELECTRON_HIDE_INTERNAL_MODULES: true
};
const production = __dirname.includes('Contents/Resources/app') || __dirname.includes('resources/app') || __dirname.includes('resources\\app');
const mainfile = path.basename(__filename);

let mainWindow = null;
let children = {};

app.on('window-all-closed', function (event) {
	for (let child in children) {
		if (children[child] && typeof children[child].kill === 'function') {
			children[child].kill();
		}
	}

	app.quit();
});

app.on('ready', function () {
	mainWindow = new BrowserWindow({
			useContentSize: true,
			width: 1000,
			height: 450,
			resizable: false,
			fullscreen: false,
			icon: paths.icon,
			title: 'Electron Gulp Runner ' + app.getVersion()
	});
	mainWindow.loadURL('file://' + __dirname + '/index.html');
	mainWindow.setMenuBarVisibility(false);
	mainWindow.on('closed', function () {
		mainWindow = null;
	});

	if (!production) {
		mainWindow.openDevTools();
		fs.watch(__dirname, {persistent: true, recursive: true}, (event, filename) => {
			if (filename !== mainfile) {
				console.log(`\x1b[36m${new Date().toLocaleTimeString()} [${event}]\x1b[0m ${filename}`);
				mainWindow.reload();
			}
		});
	}
});

ipc.on('gulp:tasks', function (event, arg) {
	let child = childProcess.fork(paths.gulp, ['--tasks-simple', '--no-color'], {
		silent: true,
		env: workerEnv,
		cwd: arg.path
	});

	child.stdout.setEncoding('utf8');
	child.stdout.on('data', function (data) {
		event.sender.send('gulp:tasks', {path: arg.path, data: data});
	});

	child.stderr.setEncoding('utf8');
	child.stderr.on('data', function (data) {
		event.sender.send('gulp:error', {path: arg.path, data: data});
	});
});

ipc.on('gulp:start', function (event, arg) {
	if (!children[arg.path]) {
		let child = children[arg.path] = childProcess.fork(paths.gulp, [arg.task, '--no-color'], {
			silent: true,
			env: workerEnv,
			cwd: arg.path
		});

		child.stdout.setEncoding('utf8');
		child.stdout.on('data', function (data) {
			event.sender.send('gulp:console', {path: arg.path, data: data});
		});

		child.stderr.setEncoding('utf8');
		child.stderr.on('data', function (data) {
			event.sender.send('gulp:error', {path: arg.path, data: data});
		});

		child.on('exit', function (code) {
			if (code === 0) {
				event.sender.send('gulp:console', {path: arg.path, data: '\nFinished running tasks'});
			}
			else {
				event.sender.send('gulp:error', {path: arg.path, data: '\nExited with error code ' + code});
			}

			event.sender.send('gulp:terminated', {path: arg.path, data: code});
			delete children[arg.path];
		});
	}
});

ipc.on('gulp:stop', function (event, arg) {
	if (children[arg.path]) {
		if (typeof children[arg.path].kill === 'function') {
			children[arg.path].kill();
		}
		delete children[arg.path];
	}
});
