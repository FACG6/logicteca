import React, { Component } from 'react';
import { Table, Icon, Dropdown } from 'antd';
import Editable from 'react-contenteditable';
import 'antd/dist/antd.css';
import './style.css';
import { filter, sort, deleteSwal, roleFilter } from './helpers.js';
import Select from './select';
import UserMenu from './menu/menu';
import Password from './password/index';

const users = require('../../utils/users.json');

class Users extends Component {
	state = {
		users: [],
		nameOptions: [],
		showSaveButton: false,
		userNameError: false,
		fullNameError: false,
		password: null,
		passwordError: false,
		rowSelected: null,
		newRow: {},
		saving: false,
		saved: false,
		show: false,
	};

	componentDidMount() {
		//Fetch to get users from database//
		//Store them in the state
		this.setState({
			users: [...users, { id: users.length + 1, user_name: '', full_name: '', role: 'developer' }],
		});
	}
	componentDidUpdate(prevProps, prevState) {
		const { users } = this.state;
		if (prevState.users !== users) {
			const allUsers = users.slice(0);
			const nameOptions = filter(allUsers);
			this.setState({ nameOptions });
		}
	}
	handleAddUser = (event, columnName) => {
		const newValue = event.target.value;
		this.setState(prevState => {
			const clonedUsers = JSON.parse(JSON.stringify(prevState.users));
			clonedUsers[clonedUsers.length - 1][columnName] = newValue;
			//Not sure if I should update the state now or after inserting the user in database!
			return { users: clonedUsers, newRow: clonedUsers[clonedUsers.length - 1], showSaveButton: true };
		});
	};

	saveNewUser = () => {
		if (this.validateUserInfo(this.state.newRow)) {
			if (this.state.password) {
				//fetch to add user in the database
				//change message
				this.setState({ passwordError: false, saved: true });
			} else {
				this.setState({ passwordError: true });
			}
		}
	};

	handleEditUserInfo = (event, record, columnName) => {
		if (record.id === this.state.users.length) {
			return this.handleAddUser(event, columnName);
		}
		this.setState({ saving: true, saved: false });
		const newValue = event.target.value;
		const memberId = record.id;

		// Editing UserInfo
		const { users } = this.state;
		const clonedUsers = JSON.parse(JSON.stringify(users));
		const updatedUser = clonedUsers.find(user => user.id === memberId);
		updatedUser[columnName] = newValue;

		//Validate
		if (this.validateUserInfo(updatedUser)) {
			this.updateUserInfo(updatedUser, clonedUsers);
		}
	};

	handleDeleteUser = event => {
		const { users, rowSelected } = this.state;
		const deletedRow = users.filter(user => user.id === rowSelected)[0];
		this.showSwal(deletedRow);
	};

	showSwal = deleteMember => {
		deleteSwal().then(response => {
			if (response.value) this.confirmDelete(deleteMember);
		});
	};

	confirmDelete = deleteMember => {
		//Fetch deleteMember to delete from datatabase
		//Update state//
	};

	validateUserInfo = user => {
		this.setState({ fullNameError: false, userNameError: false });
		if (user['user_name'].length < 3) {
			this.setState({ userNameError: true });
			return false;
		}
		if (user['full_name'].length < 6) {
			this.setState({ fullNameError: true });
			return false;
		}
		this.setState({ userNameError: false, fullNameError: false });
		return true;
	};

	updateUserInfo = (user, users) => {
		//Fetch to update userInfo//
		//Then update users in the state//
		//change message//
		// this.setState({users})
		this.setState({ saving: false, saved: true });
	};

	handleRow = id => {
		this.setState({ rowSelected: id });
	};

	showForm = () => {
		this.setState({ show: true });
	};

	AddPassword = password => {
		this.setState({ password, show: false });
	};

	render() {
		const columns = [
			{
				title: 'Username',
				dataIndex: 'user_name',
				render: (value, record) => {
					return (
						<Editable
							html={value}
							onChange={event => this.handleEditUserInfo(event, record, 'user_name')}
							tagName="span"
							className="users__cell"
						/>
					);
				},
				filters: this.state.nameOptions,
				onFilter: (value, record) => record['user_name'] === value,
				defaultSort: 'descend',
				sorter: (a, b) => sort(a, b, 'user_name'),
			},
			{
				title: 'Full Name',
				dataIndex: 'full_name',
				render: (value, record) => {
					return (
						<Editable
							html={value}
							onChange={event => this.handleEditUserInfo(event, record, 'full_name')}
							tagName="span"
							className="users__cell"
						/>
					);
				},
				defaultSort: 'descend',
				sorter: (a, b) => sort(a, b, 'full_name'),
			},
			{
				title: 'Role',
				dataIndex: 'role',
				render: (value, record) => {
					return (
						<Select onChange={event => this.handleEditUserInfo(event, record, 'role')} defaultValue={record.role} />
					);
				},
				filters: roleFilter,
				onFilter: (value, record) => record['role'] === value,
			},
			{
				render: props => {
					return (
						<Dropdown
							key={props.id}
							trigger={['click']}
							rowId={props.id}
							overlay={
								<UserMenu
									rowId={props.id}
									submitPassword={this.handleAddPassword}
									usersLength={this.state.users.length}
									handleDeleteUser={this.handleDeleteUser}
									showPasswordPopup={this.showForm}
								/>
							}
						>
							<Icon onClick={() => this.handleRow(props.id)} title="click" className="user__ellipsis" type="ellipsis" />
						</Dropdown>
					);
				},
			},
		];
		return (
			<>
				{this.state.showSaveButton ? (
					<button className="users__submitBtn" onClick={this.saveNewUser}>
						Save
					</button>
				) : null}

				{this.state.userNameError ? (
					<div className="users__error">
						<Icon className="users__alert" type="warning" />
						<span>Username should consist of at least 3 characters</span>
					</div>
				) : this.state.fullNameError ? (
					<div className="users__error">
						<Icon className="users__alert" type="warning" />
						<span>Full Name should consist of at least 6 characters</span>
					</div>
				) : this.state.passwordError ? (
					<div className="users__error">
						<Icon className="users__alert" type="warning" />
						<span>Please add Password</span>
					</div>
				) : null}
				<Table
					rowKey={record => record.id}
					dataSource={this.state.users}
					columns={columns}
					pagination={false}
					rowClassName="users__row"
					className="users__table"
				/>
				{this.state.show ? <Password submitPassword={this.AddPassword} /> : null}
			</>
		);
	}
}

export default Users;
