import React, { Component } from 'react';
import { Table, Icon, Dropdown, Menu } from 'antd';
import Editable from 'react-contenteditable';
import 'antd/dist/antd.css';
import './style.css';
import Swal from 'sweetalert2';

const users = require('../../utils/users.json');

class Users extends Component {
	state = {
		users: [],
		nameOptions: [],
		fullNameOptions: [],
		showSaveButton: false,
		userNameError: false,
		fullNameError: false,
		rowSelected: null,
		newRow: {},
		saving: false,
		saved: false,
	};

	componentDidMount() {
		//Fetch to get users from database//
		//Store them in the state
		this.setState({
			users: [...users, { id: users.length + 1, user_name: '', full_name: '', role: 'developer' }],
		});
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.users !== this.state.users) {
			const users = this.state.users.slice(0, this.state.users.length - 1);
			//Filtering users to get unique names and fullnames for filtering//
			const usernames = [];
			const nameOptions = [];
			const fullNames = [];
			const fullNameOptions = [];
			users.forEach(user => {
				const username = user['user_name'];
				const fullName = user['full_name'];
				if (usernames.indexOf(username) === -1) {
					usernames.push(username);
					nameOptions.push({ text: username, value: username });
				}
				if (fullNames.indexOf(fullName) === -1) {
					fullNames.push(fullName);
					fullNameOptions.push({ text: fullName, value: fullName });
				}
			});
			this.setState({ fullNameOptions, nameOptions });
		}
	}
	handleAddUser = (event, columnName) => {
		const newValue = event.target.value;
		this.setState(prevState => {
			const clonedUsers = JSON.parse(JSON.stringify(prevState.users));
			clonedUsers[clonedUsers.length - 1][columnName] = newValue;
			return { users: clonedUsers, newRow: clonedUsers[clonedUsers.length - 1], showSaveButton: true };
		});
	};

	saveNewUser = () => {
		if (this.validateUserInfo(this.state.newRow)) {
			//fetch to add user in the database
			//change message
			this.setState({ saved: true });
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
		const updatedUser = users.find(user => user.id === memberId);
		updatedUser[columnName] = newValue;

		//Validate
		if (this.validateUserInfo(updatedUser)) {
			this.updateUserInfo(updatedUser);
		}
	};

	handleDeleteUser = event => {
		const row = this.state.rowSelected;
		const { users } = this.state;
		const deletedRow = users.filter(user => user.id === row)[0];
		this.showSwal(deletedRow);
	};

	showSwal = deleteMember => {
		Swal.fire({
			type: 'warning',
			text: 'Are you sure?',
			showConfirmButton: true,
			showCancelButton: true,
		}).then(response => {
			if (response.value) this.confirmDelete(deleteMember);
		});
	};

	confirmDelete = deleteMember => {
		//Fetch deleteMember to delete from datatabase
		//Update state//
	};

	validateUserInfo = user => {
		this.setState({ fullNameError: false, userNameError: false });
		if (user['user_name'].trim().length < 6) {
			this.setState({ userNameError: true });
			return false;
		}
		if (user['full_name'].trim().length < 8) {
			this.setState({ fullNameError: true });
			return false;
		}
		this.setState({ userNameError: false, fullNameError: false });
		return true;
	};

	updateUserInfo = user => {
		//Fetch to update userInfo//
		//Then update users in the state//
		//change message//
		this.setState({ saving: false, saved: true });
	};

	handleRow = id => {
		this.setState({ rowSelected: id });
	};

	render() {
		const menu = (
			<Menu>
				<Menu.Item onClick={this.handleDeleteUser}>
					<Icon type="user-delete" />
					delete
				</Menu.Item>
				<Menu.Item onClick={this.handleDeleteUser}>
					<Icon type="lock" />
					change password
				</Menu.Item>
			</Menu>
		);
		const columns = [
			{
				title: 'Username',
				dataIndex: 'user_name',
				render: (value, record) => {
					return (
						<Editable
							innerRef={this.contentEditable}
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
				sorter: (a, b) => {
					if (a['user_name'] > b['user_name']) {
						return -1;
					}
					if (a['user_name'] < b['user_name']) {
						return 1;
					}
					return 0;
				},
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
				sorter: (a, b) => {
					if (a['full_name'] < b['full_name']) {
						return -1;
					}
					if (a['full_name'] > b['full_name']) {
						return 1;
					}
					return 0;
				},
			},
			{
				title: 'Role',
				dataIndex: 'role',
				render: (value, record) => {
					return (
						<select
							onChange={event => this.handleEditUserInfo(event, record, 'role')}
							defaultValue={record.role}
							className="users__select"
						>
							<option id="1" value="developer">
								Developer
							</option>
							<option id="2" value="scrum master">
								Scrum Master
							</option>
						</select>
					);
				},
				filters: [
					{
						text: 'developer',
						value: 'developer',
					},
					{
						text: 'scrum master',
						value: 'scrum master',
					},
				],
				onFilter: (value, record) => record['role'] === value,
			},
			{
				render: props => {
					return (
						<Dropdown key={props.id} trigger={['click']} rowId={props.id} overlay={menu}>
							<Icon
								onClick={() => this.handleRow(props.id)}
								title="click"
								className="user__ellipsis"
								type="ellipsis"
							/>
						</Dropdown>
					);
				},
			},
		];
		return (
			<>
				{this.state.userNameError ? (
					<div className="users__error">
						<Icon className="users__alert" type="warning" />
						<span>Username should consist of at least 6 characters</span>
					</div>
				) : this.state.fullNameError ? (
					<div className="users__error">
						<Icon type="warning" />
						<span className="users__alert">Full Name should consist of at least 8 characters</span>
					</div>
				) : null}
				{this.state.showSaveButton ? (
					<button className="users__submitBtn" onClick={this.saveNewUser}>
						Save
					</button>
				) : null}
				<Table
					rowKey={record => record.id}
					dataSource={this.state.users}
					columns={columns}
					pagination={false}
					rowClassName="users__row"
					className="users__table"
				/>
			</>
		);
	}
}

export default Users;
