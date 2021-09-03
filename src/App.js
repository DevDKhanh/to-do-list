import React, { Component } from 'react';
import Add from './components/Add/Add';
import List from './components/List/List';
import Sort from './components/Sort/Sort';

import './App.css';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],
			sortStatus: 'all',
			indexPage: 1,
			LOCAL_NAME: 'my-list',
			msg: '',
		};
	}

	componentDidMount() {
		this.setState({ list: this.getItems() || [] });
	}

	getItems() {
		const list = localStorage.getItem(this.state.LOCAL_NAME);
		if (list) {
			return JSON.parse(list);
		} else {
			localStorage.setItem(this.state.LOCAL_NAME, []);
			return [];
		}
	}

	handleAdd = item => {
		if (item.title.trim() !== '') {
			const newList = [item, ...this.state.list];

			this.setState({ list: [item, ...this.state.list], msg: '' });
			localStorage.setItem(
				this.state.LOCAL_NAME,
				JSON.stringify(newList),
			);
		} else {
			this.setState({ msg: `Vui lòng không bỏ trống!` });
		}
	};

	handleChangeStatus = id => {
		const newList = this.state.list.map(item => {
			if (item.id === id) {
				item.isDone = !item.isDone;
			}

			this.setState({ msg: '' });
			return item;
		});

		this.setState({ list: newList });
		localStorage.setItem(this.state.LOCAL_NAME, JSON.stringify(newList));
	};

	handleDelete = id => {
		const newList = this.state.list.filter(item => item.id !== id);

		this.setState({ list: newList, msg: '' });
		localStorage.setItem(this.state.LOCAL_NAME, JSON.stringify(newList));
	};

	handeSortStatus = value => {
		this.setState({ sortStatus: value, indexPage: 1 });
	};

	handeSortPage = value => {
		this.setState({ indexPage: Number(value) });
	};

	render() {
		const skip = 5; //Skip item default = 5;

		const minIndex = this.state.indexPage * skip - skip; //index fisrt item sort
		const maxIndex = this.state.indexPage * skip; //index last item sort
		const offSort = this.state.sortStatus === 'all'; //status filter

		const listSort = {
			done: true,
			no: false,
		};

		// Filter categories by status
		const filterList = this.state.list.filter((value, index) =>
			!offSort ? value.isDone === listSort[this.state.sortStatus] : true,
		);

		// Split item into multiple pages
		const pageList = filterList.filter(
			(value, index) => index >= minIndex && index < maxIndex,
		);

		// count item after filter
		const coutItem = filterList.length;
		const numberPage = Math.ceil(coutItem / skip); //Number Item per one page

		return (
			<div className="app">
				<div className="title">To Do List</div>
				<div className="table-app">
					<Add handleAdd={this.handleAdd} />
					{coutItem <= 0 ? null : (
						<Sort
							handeSortStatus={this.handeSortStatus}
							handeSortPage={this.handeSortPage}
							indexPage={this.state.indexPage}
							countItem={numberPage}
						/>
					)}
					<div
						className={`msg animate__animated  
						${this.state.msg !== '' ? 'animate__bounceIn' : ''}`}
					>
						{this.state.msg}
					</div>
					<List
						handleChangeStatus={this.handleChangeStatus}
						handleDelete={this.handleDelete}
						list={pageList}
					/>
				</div>
			</div>
		);
	}
}
