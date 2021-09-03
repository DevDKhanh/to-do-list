import React, { Component } from 'react';
import './style.css';

export default class Sort extends Component {
	handleStatusFilter = e => {
		this.props.handeSortStatus(e.target.value);
	};

	handleSortPage = e => {
		this.props.handeSortPage(e.target.value);
	};

	countPage = () => {
		let optionPage = [];
		for (let i = 1; i <= this.props.countItem; i++) {
			optionPage.push(
				<option key={i} value={i}>
					Trang {i}
				</option>,
			);
		}
		return optionPage;
	};

	render() {
		return (
			<div className="sort">
				<div className="sort-item">
					<label htmlFor="sortStatus">Lọc</label>
					<select id="sortStatus" onChange={this.handleStatusFilter}>
						<option value="all">Tất cả</option>
						<option value="done">Hoàn thành</option>
						<option value="no">Chưa hoàn thành</option>
					</select>
				</div>
				<div className="sort-item">
					<label htmlFor="page">
						Danh sách trang {this.props.indexPage}
					</label>
					<select id="page" onChange={this.handleSortPage}>
						{this.countPage()}
					</select>
				</div>
			</div>
		);
	}
}
