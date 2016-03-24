'use babel';

import React, { Component } from 'react';
import classNames from 'classnames';

export default class StopButton extends Component {
	constructor (props) {
		super(props);

		this.stopBuild = () => {
			this.props.stopBuild(this.props.currentPathname);
		};
	}

	render () {
		const { runnable, running } = this.props;
		const stopButtonClassNames = classNames('btn btn-default btn-danger btn-block', {'disabled': !runnable || !running});

		return (
			<div className="bs-component">
				<a className={stopButtonClassNames} onClick={this.stopBuild}><i className="fa fa-stop"></i> STOP</a>
			</div>
		);
	}
}

StopButton.defaultProps = {
	runnable: false,
	running: false
};
