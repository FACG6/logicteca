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
    passwordError: false,
    rowSelected: null,
    newRow: {},
    saving: false,
    saved: false,
    show: false,
    passwordAdded: false,
  };

  componentDidMount() {
    //Fetch to get users from database//
    //Store them in the state
    this.setState({
      users: [...users, { id: users.length + 1, user_name: '', full_name: '', role: 'developer' }],
    });
  }

  handleEditUserInfo = (event, record, columnName) => {
    const { users } = this.state;

    //Adding a new user
    if (record.id === users[users.length - 1].id) {
      this.setState({ saving: true, saved: false })
      return this.handleAddUser(event, columnName);
    }

    //Editing User Info//
    const newValue = event.target.value;
    const memberId = record.id;
    const clonedUsers = JSON.parse(JSON.stringify(users));
    const updatedUser = clonedUsers.find(user => user.id === memberId);
    updatedUser[columnName] = newValue;

    //Validate
    if (this.validateUserInfo(updatedUser)) {
      this.updateUserInfo(updatedUser, clonedUsers);
    }
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
    this.setState({ users, saved: true });
  };

  handleAddUser = (event, columnName) => {
    const newValue = event.target.value;
    this.setState(prevState => {
      const clonedUsers = JSON.parse(JSON.stringify(prevState.users));
      clonedUsers[clonedUsers.length - 1][columnName] = newValue;
      //Not sure if I should update the state now or after inserting the user in database!
      return { users: clonedUsers, newRow: clonedUsers[clonedUsers.length - 1] };
    });
  };

  handleForm = () => {
    this.setState({ show: true });
  };

  handlePassword = (password) => {
    this.setState({ passwordAdded: true, passwordError: false, password, show: false })
  }

  cancel = () => {
    this.setState({ show: false })
  }

  saveNewUser = () => {
    const { newRow, users, password } = this.state;
    if (this.validateUserInfo(newRow)) {
      if (password) {

        //fetch...this is the row
        const addedRow = { user_name: newRow.user_name, full_name: newRow.full_name, password }

        //Add new row to the table
        const id = users[users.length - 1].id + 1;
        const updatedUsers = users.concat({ id, user_name: '', full_name: '', role: 'developer' });
        this.setState({ passwordAdded: false, users: updatedUsers, passwordError: false, saving: false, saved: true });
      } else {
        this.setState({ passwordError: true });
      }
    }
  }

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

  handleRow = id => {
    this.setState({ rowSelected: id });
  };

  render() {
    if (this.state.saved) {
      setTimeout(() => {
        this.setState({ saved: false })
      }, 4000);
    }
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
        render: record => {
          if (record.id === this.state.users.length) {
            return (
              <span className='users__last-row--2icons'>
                {!this.state.password ? <div onClick={this.handleForm}><Icon className='users__lock-icon' type="lock" />Add Password</div> : <div><Icon className='users__lock-icon' type="lock" />Change Password</div>}
                {this.state.saving ? <div onClick={this.saveNewUser}><Icon className='users__check-icon' type="check-circle" theme="twoTone" twoToneColor="#2196f3" />Save</div>
                  : null}
              </span>
            )
          }
          return (
            <Dropdown
              key={record.id}
              trigger={['click']}
              rowId={record.id}
              overlay={
                <UserMenu
                  rowId={record.id}
                  users={this.state.users}
                  handleDeleteUser={this.handleDeleteUser}
                />
              }
            >
              <Icon onClick={() => this.handleRow(record.id)} title="click" className="user__ellipsis" type="ellipsis" />
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
        ) : this.state.saved ? <Notification notification='Saved' /> : this.state.passwordAdded ? <Notification notification='Password was added successfully. Save all changes after you finish!' /> : <Notification notificationClass='hidden' />}
        <Table
          rowKey={record => record.id}
          dataSource={this.state.users}
          columns={columns}
          pagination={false}
          rowClassName="users__row"
          className="users__table"
        />
        {this.state.show ? <Form submitPassword={this.handlePassword} cancel={this.cancel} /> : null}
      </>
    );
  }
}

export default Users;
