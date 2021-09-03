import React, { Component } from 'react';
import './style.css';

export default class Add extends Component {
	constructor(props) {
		super(props);

		this.state = {
			valueInput: '',
		};
	}

	handleAddState = e => {
		this.setState({ valueInput: e.target.value });
	};

	handleAddItem = e => {
		e.preventDefault();

		const id = new Date();
		const newItem = {
			title: this.state.valueInput,
			id: Number(id),
			isDone: false,
		};

		this.setState({ valueInput: '' });
		this.props.handleAdd(newItem);
	};

	render() {
		return (
			<form onSubmit={this.handleAddItem} className="add">
				<div className="input-add">
					<input
						type="text"
						value={this.state.valueInput}
						placeholder="Thêm công việc..."
						onChange={this.handleAddState}
					/>
				</div>
				<div className="button-add">
					<button id="add-task">
						<ion-icon name="add-circle-outline"></ion-icon>
					</button>
				</div>
			</form>
		);
	}
}
