'use babel';

import React, { Component } from 'react';

export default class AddBuild extends Component {
	constructor (props) {
		super(props);

		this.addBuild = () => {
			this.props.addBuild();
			this.refs.addButton.blur();
		}
	}

	render () {
		return (
			<div className="btn-group">
				<a href="#" className="btn btn-sm btn-primary" onClick={this.addBuild} ref='addButton'><i className="fa fa-plus"></i> ADD</a>
			</div>
		);
	}
}
