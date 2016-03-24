'use babel';

import React, { Component } from 'react';

export default class Options extends Component {
	constructor (props) {
		super(props);
	}

	componentDidUpdate () {
		this.refs.console.scrollTop = this.refs.console.scrollHeight;
	}

	render () {
		return (
			<pre className="console" ref='console' dangerouslySetInnerHTML={{__html: this.props.log}} />
		);
	}
}
