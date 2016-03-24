import actionTypes from './actionTypes';

export default {
	addBuild (pathname) {
		return {
			type: actionTypes.ADD_BUILD,
			pathname
		}
	},
	selectBuild (pathname) {
		return {
			type: actionTypes.SELECT_BUILD,
			pathname
		}
	},
	deleteBuild (pathname) {
		return {
			type: actionTypes.DELETE_BUILD,
			pathname
		}
	},
	addTasks (pathname, tasks) {
		return {
			type: actionTypes.ADD_TASKS,
			pathname,
			tasks
		}
	},
	selectTask (pathname, task) {
		return {
			type: actionTypes.SELECT_TASK,
			pathname,
			task
		}
	},
	startBuild (pathname) {
		return {
			type: actionTypes.START_BUILD,
			pathname
		}
	},
	stopBuild (pathname) {
		return {
			type: actionTypes.STOP_BUILD,
			pathname
		}
	},
	appendLog (pathname, log) {
		return {
			type: actionTypes.APPEND_LOG,
			pathname,
			log
		}
	}
}
