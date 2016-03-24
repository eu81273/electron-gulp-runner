'use babel';

import React, { Component } from 'react';
import Path from './Path';
import TaskSelect from './TaskSelect';
import StartButton from './StartButton';
import StopButton from './StopButton';
import Console from './Console';

export default class Container extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		let currentPathname = this.props.currentPathname;
		let { runnable, running, tasks, task, log } = this.props.currentBuild;

		return (
			<div className="container">
				<div className="bs-docs-section clearfix">
					<div className="row">
						<div className="col-lg-5 col-sm-5">
							<Path
								currentPathname={currentPathname}
							/>
							<TaskSelect
								currentPathname={currentPathname}
								runnable={runnable}
								running={running}
								tasks={tasks}
								task={task}
								selectTask={this.props.selectTask}
							/>
							<StartButton
								currentPathname={currentPathname}
								runnable={runnable}
								running={running}
								task={task}
								startBuild={this.props.startBuild}
							/>
							<StopButton
								currentPathname={currentPathname}
								runnable={runnable}
								running={running}
								stopBuild={this.props.stopBuild}
							/>
						</div>
						<div className="col-lg-7 col-sm-7">
							<Console
								log={log}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Container.defaultProps = {
	currentBuild: {
		pathname: '',
		log: '',
		runnable: false,
		running: false,
		tasks: [],
		task: ''
	}
};
