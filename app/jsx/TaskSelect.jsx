'use babel';

import React, { Component } from 'react';
import classNames from 'classnames';

export default class TaskSelect extends Component {
	constructor (props) {
		super(props);

		this.selectTask = (event) => {
			this.props.selectTask(this.props.currentPathname, event.target.value);
		}
	}

	render () {
		const { runnable, running } = this.props;
		const selectClassName = classNames('form-control', {'disabled': !runnable || running});

		return (
			<div className="bs-component">
				<select
					className={selectClassName}
					value={this.props.task}
					onChange={this.selectTask}
				>
					{this.props.tasks.map((task, index) =>
						<option key={index}>{task}</option>
					)}
				</select>
			</div>
		);
	}
}

TaskSelect.defaultProps = {
	runnable: false,
	running: false,
	tasks: [],
	task: ''
};
