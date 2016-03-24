'use babel';

import { ipcRenderer } from 'electron';
import reducers from './reducers.js';
import actionTypes from './actionTypes';

let recentList = JSON.parse(localStorage.getItem('recentList')) || [];

export default recentList.reduce((states, pathname)=> {
	ipcRenderer.send('gulp:tasks', {path: pathname});

	return reducers(states, {
		type: actionTypes.ADD_BUILD,
		pathname: pathname
	});
}, {});
