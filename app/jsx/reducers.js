import actionTypes from './actionTypes';

function currentPathname (previousState = '', action) {
	switch (action.type) {
		case actionTypes.ADD_BUILD:
			return action.pathname;
		case actionTypes.SELECT_BUILD:
			return action.pathname;
		case actionTypes.DELETE_BUILD:
			return (previousState === action.pathname) ? '' : previousState;
		default:
			return previousState;
	}
}

function pathnameList (previousState = [], action) {
	switch (action.type) {
		case actionTypes.ADD_BUILD:
			return [action.pathname, ...previousState];
		case actionTypes.DELETE_BUILD:
			return previousState.filter(item => item !== action.pathname)
		default:
			return previousState;
	}
}

function buildList (previousState = [], action) {
	switch (action.type) {
		case actionTypes.ADD_BUILD:
			return [{
				pathname: action.pathname,
				log: '',
				runnable: true,
				running: false,
				tasks: [],
				task: ''
			}, ...previousState];
		case actionTypes.DELETE_BUILD:
			return previousState.filter(item => item.pathname !== action.pathname);
		case actionTypes.ADD_TASKS:
			return previousState.map(build => {
				if (build.pathname === action.pathname) {
					return {
						pathname: build.pathname,
						log: build.log,
						runnable: build.runnable,
						running: build.running,
						tasks: action.tasks,
						task: ''
					};
				}
				else {
					return build;
				}
			});
		case actionTypes.SELECT_TASK:
			return previousState.map(build => {
				if (build.pathname === action.pathname) {
					return {
						pathname: build.pathname,
						log: build.log,
						runnable: build.runnable,
						running: build.running,
						tasks: build.tasks,
						task: action.task
					};
				}
				else {
					return build;
				}
			});
		case actionTypes.START_BUILD:
			return previousState.map(build => {
				if (build.pathname === action.pathname) {
					return {
						pathname: build.pathname,
						log: '',
						runnable: build.runnable,
						running: true,
						tasks: build.tasks,
						task: build.task
					};
				}
				else {
					return build;
				}
			});
		case actionTypes.STOP_BUILD:
			return previousState.map(build => {
				if (build.pathname === action.pathname) {
					return {
						pathname: build.pathname,
						log: build.log,
						runnable: build.runnable,
						running: false,
						tasks: build.tasks,
						task: build.task
					};
				}
				else {
					return build;
				}
			});
		case actionTypes.APPEND_LOG:
			return previousState.map(build => {
				if (build.pathname === action.pathname) {
					return {
						pathname: build.pathname,
						log: build.log + action.log,
						runnable: build.runnable,
						running: build.running,
						tasks: build.tasks,
						task: build.task
					};
				}
				else {
					return build;
				}
			});

		default:
			return previousState;
	}
}

export default function (previousState = {}, action) {
	return {
		currentPathname: currentPathname(previousState.currentPathname, action),
		pathnameList: pathnameList(previousState.pathnameList, action),
		buildList: buildList(previousState.buildList, action)
	}
};
