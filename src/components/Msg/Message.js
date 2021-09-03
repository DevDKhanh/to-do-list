import React, { Component } from 'react';

import './style.css';

export default class Message extends Component {
	render() {
		return <div className="text-msg">{this.props.children}</div>;
	}
}
