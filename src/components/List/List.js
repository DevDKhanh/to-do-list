import React, { Component } from 'react';
import Task from '../Task/Task';
import Message from '../Msg/Message';

import './style.css';

export default class List extends Component {
	constructor(props) {
		super(props);
		this.handleChangeStatus = this.handleChangeStatus.bind(this);
		this.handleClickDelete = this.handleClickDelete.bind(this);
	}

	handleChangeStatus(id) {
		this.props.handleChangeStatus(id);
	}

	handleClickDelete(id) {
		this.props.handleDelete(id);
	}

	render() {
		const { list } = this.props;

		const htmls =
			list.length > 0 ? (
				list.map(value => {
					return (
						<Task
							key={value.id}
							id={value.id}
							isDone={value.isDone}
							title={value.title}
							handleChangeStatus={this.handleChangeStatus}
							handleClickDelete={this.handleClickDelete}
						/>
					);
				})
			) : (
				<Message>Danh sách đang trống!</Message>
			);

		return <div className="list">{htmls}</div>;
	}
}
