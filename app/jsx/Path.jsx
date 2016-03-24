'use babel';

import React, { Component } from 'react';

export default class Path extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div className="bs-component form-group">
				<label className="control-label" htmlFor="path">Path</label>
				<textarea className="form-control" rows={5} value={this.props.currentPathname} readOnly />
			</div>
		);
	}
}
