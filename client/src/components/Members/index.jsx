import React, { Component } from 'react';
import { Table, Icon, Dropdown, Menu } from 'antd';
import Editable from 'react-contenteditable';
import 'antd/dist/antd.css';
import './style.css';

const users = require('../../utils/users.json');

class Users extends Component {
	state = {
		users: [],
		nameOptions: [],
		fullNameOptions: [],
		showSaveButton: false,
		userNameError: null,
		fullNameError: null,
	};

	componentDidMount() {
		//Fetch to get users from database//
		// fetch('/api/v1/members')
		//   .then(response=>response.json())
		//   .then(results=>results.data)
		//   .then(**what is done bellow should be inside this then**)

		//Filtering the members to get unique names and fullnames for filtering//
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

		//Store them in the state
		this.setState({ users, fullNameOptions, nameOptions });
	}

	handleAddUser = event => {
		//Adding New Users
	};

	handleEditUserInfo = () => {
		//Editing UserInfo
	};

	deleteUser = () => {
		//Deleting
	};

	showSwal = () => {
		//Swal before deleting
	};

	confirmDelete = () => {
		//Confirm Delete
	};

	validateUserInfo = () => {
		//Validation
	};

	updateUserInfo = () => {};
	render() {
		//DropDown Menue//
		const menu = (
			<Menu>
				<Menu.Item onClick={this.handleDeleteUser}>
					<Icon type="user-delete" />
					delete
				</Menu.Item>
				<Menu.Item>
					<Icon type="lock" />
					change password
				</Menu.Item>
			</Menu>
		);
		//Table Columns//
		const columns = [
			{
				title: 'Username',
				dataIndex: 'user_name',
				render: (value, record) => {
					return (
						<Editable
							innerRef={this.contentEditable}
							html={value}
							onChange={event => this.handleEditUserInfo(event, record, 'Username')}
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
							onChange={event => this.handleEdit(event, record, 'Full Name')}
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
						<select disabled defaultValue={record.role} className="users__select">
							<option id='1' value="developer">Developer</option>
							<option id='2' value="scrum master">Scrum Master</option>
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
						<Dropdown key={props.key} trigger={['click']} overlay={menu}>
							<Icon title="click" className="user__ellipsis" type="ellipsis" />
						</Dropdown>
					);
				},
			},
		];
		return (
			<Table
				rowKey={record => record.id}
				dataSource={this.state.users}
				columns={columns}
				pagination={false}
				rowClassName="users__row"
				className="users__table"
			/>
		);
	}
}

export default Users;
