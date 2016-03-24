'use babel';

import React, { Component } from 'react';
import classNames from 'classnames';

export default class StartButton extends Component {
	constructor (props) {
		super(props);

		this.startBuild = () => {
			this.props.startBuild(this.props.currentPathname, this.props.task);
		};
	}

	render () {
		const { runnable, running, task } = this.props;
		const startButtonClassName = classNames('btn btn-default btn-info btn-block', {'disabled': !task || !runnable || running});

		return (
			<div className="bs-component">
				<a className={startButtonClassName} onClick={this.startBuild}><i className="fa fa-play"></i> START</a>
			</div>
		);
	}
}

StartButton.defaultProps = {
	runnable: false,
	running: false
};
