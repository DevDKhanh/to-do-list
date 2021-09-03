import React, { Component } from 'react';

import './style.css';

export default class Task extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isEffectSatus: false,
			isEffectDel: false,
			isNew: Number(new Date()) - this.props.id < 100,
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ isNew: false });
		}, 500);
	}

	// Change status item
	handleChange = () => {
		this.setState({ isEffectSatus: !this.props.isDone, isNew: false });
		this.props.handleChangeStatus(this.props.id);
	};

	// Delete item
	handleClick = () => {
		if (!this.state.isEffectDel) {
			this.setState({
				isEffectDel: !this.state.isEffectDel,
				isEffectSatus: false,
				isNew: false,
			});
			setTimeout(() => {
				this.props.handleClickDelete(this.props.id);
			}, 500);
		}
	};

	render() {
		return (
			<div
				className={`list-item animate__animated 
					${this.props.isDone ? 'done' : ''} 
                 	${this.state.isEffectSatus ? ' animate__flipInX' : ''} 
                 	${this.state.isNew ? ' animate__flipInX' : ''} 
                 	${this.state.isEffectDel ? ' animate__bounceOutLeft' : ''}`}
			>
				<div className="check">
					<input
						checked={this.props.isDone ? true : false}
						onChange={this.handleChange}
						type="checkbox"
					/>
				</div>
				<div className="text">{this.props.title}</div>
				<div onClick={this.handleClick} className="btn-del">
					<ion-icon name="trash-bin-outline"></ion-icon>
				</div>
			</div>
		);
	}
}
