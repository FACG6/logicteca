import React, { Component } from 'react';
import { Table, Icon, Dropdown } from 'antd';
import Editable from 'react-contenteditable';
import './style.css';
import { filter, sort, deleteSwal } from './helpers.js';
import Select from './select';
import UserMenu from './menu/menu';
import Form from './form/index';
import Error from './error/Error';
import Notification from './notification/index'

const users = require('../../utils/users.json');

class Users extends Component {
  state = {
    users: [],
    nameOptions: [],
    roleOptions: [],
    userNameError: false,
    fullNameError: false,
    password: '',
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

  handleAddUser = (event, columnName) => {
    const newValue = event.target.value;
    this.setState(prevState => {
      const clonedUsers = JSON.parse(JSON.stringify(prevState.users));
      clonedUsers[clonedUsers.length - 1][columnName] = newValue;
      //Not sure if I should update the state now or after inserting the user in database!
      return { users: clonedUsers, newRow: clonedUsers[clonedUsers.length - 1] };
    });
  };

  handleEditUserInfo = (event, record, columnName) => {
    const { users } = this.state;
    if (record.id === users[users.length - 1].id) {
      this.setState({ saving: true })
      return this.handleAddUser(event, columnName);
    }
    this.setState({ saving: true, saved: false });
    const newValue = event.target.value;
    const memberId = record.id;

    // Editing UserInfo
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
    this.setState({ users, saving: false, saved: true });
  };

  handleRow = id => {
    this.setState({ rowSelected: id });
  };

  showForm = () => {
    if (this.validateUserInfo(this.state.newRow)) {
      this.setState({ show: true });
    } else return;
  };

  handleAddPassword = password => {
    const { users, newRow } = this.state;
    //fetch to add user in the database
    const id = users[users.length - 1].id + 1;
    const updatedUsers = users.concat({ id, user_name: '', full_name: '', role: 'developer' });
    this.setState({ show: false, users: updatedUsers, passwordError: false, saving: false, saved: true });
  };

  cancel = () => {
    this.setState({ show: false })
  }

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
        filters: filter(this.state.users).nameOptions,
        onFilter: (value, record) => record['user_name'] === value,
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
        filters: filter(this.state.users).roleOptions,
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
                  users={this.state.users}
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
        {this.state.userNameError ? (
          <Error errorClass='users__error--wd-60' errorMsg='Username should consist of at least 3 characters' />
        ) : this.state.fullNameError ? (
          <Error errorClass='users__error--wd-60' errorMsg='Full Name should consist of at least 6 characters' />
        ) : this.state.passwordError ? (
          <Error errorClass='users__error--wd-60' errorMsg='Please add Password' />
            ) : this.state.saving ? <Notification notificationClass='users__saving-msg' notification='Saving...' /> : this.state.saved ? <Notification notificationClass='users__saved-msg' notification='Saved' /> : null}
        <Table
          rowKey={record => record.id}
          dataSource={this.state.users}
          columns={columns}
          pagination={false}
          rowClassName="users__row"
          className="users__table"
        />
        {this.state.show ? <Form submitPassword={this.handleAddPassword} cancel={this.cancel} /> : null}
      </>
    );
  }
}

export default Users;
