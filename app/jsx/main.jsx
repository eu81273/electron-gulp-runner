'use babel';

import React from 'react'
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from './App';
import reducers from './reducers';
import recentList from './recentList';

const store = createStore(reducers, recentList);
const render = (state) => {
	ReactDOM.render(
		<App
			dispatch={store.dispatch}
			buildList={state.buildList}
			pathnameList={state.pathnameList}
			currentPathname={state.currentPathname}
		/>,
		document.getElementById('application')
	);
};

render(store.getState());
store.subscribe(() => render(store.getState()));
