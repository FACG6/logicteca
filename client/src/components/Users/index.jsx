import React, { Component } from 'react';
import { Button, Table, Icon, Dropdown } from 'antd';
import Editable from 'react-contenteditable';
import './style.css';
import { filter, sort, deleteSwal } from './helpers.js';
import Select from './select';
import UserMenu from './menu/menu';
import Form from './form/index';
import Error from './error/Error';
import createNotification from './notification/index';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Search from '../commonComponents/search/index';
import searchLogic from '../commonComponents/search/logic';
import axios from 'axios';

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
    rowAdded: false,
    newRow: {},
    saving: false,
    show: false,
    passwordAdded: false,
    error: '',
    search: false,
    searchResults: [],
    type: ''
  };

  _focused = React.createRef();

  componentDidMount() {
    //Fetch to get users from database//
    axios
      .get('/api/v1/users')
      .then(result => this.setState({ users: result.data.data }))
      .catch(error => this.setState({ error: 'Error' }));
  }

  handleSearch = e => {
    const { value } = e.target;
    const newData = searchLogic(value, this.state.users);
    this.setState({ search: true, searchResults: newData });
  };

  handleEditUserInfo = (event, record, columnName) => {
    const { users } = this.state;
    //Adding a new user
    if (this.state.rowAdded && record.id === users[users.length - 1].id) {
      return this.handleAddUser(event, columnName);
    }

    //Editing User Info//
    const newValue = event.target.value;
    const memberId = record.id;
    const clonedUsers = JSON.parse(JSON.stringify(users));
    const updatedUser = clonedUsers.find(user => user.id === memberId);
    updatedUser[columnName] = newValue;

    //Update
    this.updateUserInfo(updatedUser, clonedUsers);
  };

  validateUserInfo = user => {
    this.setState({ error: '' });
    if (user['user_name'].length < 3) {
      this.setState({
        error: 'Username should consist of at least 3 characters'
      });
      return false;
    }
    if (user['full_name'].length < 6) {
      this.setState({
        error: 'Full Name should consist of at least 6 characters'
      });
      return false;
    }
    this.setState({ error: '' });
    return true;
  };

  updateUserInfo = (user, users) => {
    axios
      .put(`/api/v1/users/${user.id}`, user)
      .then(result => this.setState({ users }))
      .catch(error => this.setState({ error: 'Error' }));
    //change message//
  };

  addRow = () => {
    this.setState(prevState => {
      if (this.state.rowAdded) {
        createNotification('row exist');
        return;
      }
      const clonedUsers = JSON.parse(JSON.stringify(prevState.users));
      //bug in id//
      const newUsers = clonedUsers.concat({
        id: clonedUsers[clonedUsers.length - 1].id + 1,
        user_name: '',
        full_name: '',
        role: 'developer'
      });
      return { users: newUsers, rowAdded: true };
    }, () => {
      // focus the first span of the new row
      this._focused.current.focus();
    });
  };

  handleAddUser = (event, columnName) => {
    const newValue = event.target.value;
    this.setState(prevState => {
      const clonedUsers = JSON.parse(JSON.stringify(prevState.users));
      clonedUsers[clonedUsers.length - 1][columnName] = newValue;
      //Not sure if I should update the state now or after inserting the user in database!
      return {
        saving: true,
        users: clonedUsers,
        newRow: clonedUsers[clonedUsers.length - 1]
      };
    });
  };

  handleForm = type => {
    this.setState({ show: true, type });
  };

  handlePassword = password => {
    this.setState({
      passwordAdded: true,
      saving: true,
      passwordError: false,
      password,
      show: false
    });
    createNotification('password');
  };

  cancel = () => {
    this.setState({ show: false });
  };

  saveNewUser = () => {
    const { newRow, password, users } = this.state;
    if (this.validateUserInfo(newRow)) {
      if (password) {
        const addedRow = {
          user_name: newRow.user_name,
          full_name: newRow.full_name,
          password,
          role: newRow.role
        };
        axios
          .post('/api/v1/users/new', addedRow)
          .then(result => {
            this.setState({
              rowAdded: false,
              passwordAdded: false,
              passwordError: false,
              saving: false
            });
            createNotification('success');
          })
          .catch(error => this.setState({ error: 'Error' }));
      } else {
        this.setState({ passwordError: true });
      }
    }
  };

  handleDeleteUser = event => {
    const { users, rowSelected } = this.state;
    const deletedRow = users.find(user => user.id === rowSelected);
    const rowId = deletedRow.id;
    this.showSwal(rowId);
  };

  showSwal = deleteMember => {
    deleteSwal().then(response => {
      if (response.value) this.confirmDelete(deleteMember);
    });
  };

  confirmDelete = deleteMember => {
    const { users } = this.state;
    axios
      .delete(`/api/v1/users/${deleteMember}`)
      .then(result => {
        const filterRows = users.filter(user => user.id !== deleteMember);
        this.setState({ users: filterRows });
      })
      .catch(() => this.setState({ error: 'Error' }));
  };

  handleRow = id => {
    this.setState({ rowSelected: id });
  };

  columns = [
    {
      title: 'Username',
      width: '30%',
      dataIndex: 'user_name',
      render: (value, record) => {
        return (
          <Editable
            innerRef={this._focused}
            html={value ? value : ''}
            onChange={event =>
              this.handleEditUserInfo(event, record, 'user_name')
            }
            tagName="span"
            className={
              this.state.rowAdded && record.id === this.state.users.length
                ? `users__cell focus--input`
                : 'users__cell '
            }
          />
        );
      },
      onFilter: (value, record) => record['user_name'] === value,
      sorter: (a, b) => sort(a, b, 'user_name')
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      width: '30%',
      render: (value, record) => {
        return (
          <Editable
            html={value ? value : ''}
            onChange={event =>
              this.handleEditUserInfo(event, record, 'full_name')
            }
            tagName="span"
            className="users__cell"
          />
        );
      },
      sorter: (a, b) => sort(a, b, 'full_name')
    },
    {
      title: 'Role',
      width: '20%',
      dataIndex: 'role',
      render: (value, record) => {
        return (
          <Select
            onChange={event => this.handleEditUserInfo(event, record, 'role')}
            defaultValue={record.role}
          />
        );
      },
      onFilter: (value, record) => record['role'] === value
    },
    {
      title: 'Action',
      width: '20%',
      render: record => {
        if (this.state.rowAdded) {
          if (record.id === this.state.users[this.state.users.length - 1].id) {
            return (
              <div className="users__last-cell">
                {!this.state.passwordAdded ? (
                  <button
                    onClick={() => this.handleForm('Add')}
                    className="users__btn users__btn--password"
                  >
                    Password
                  </button>
                ) : (
                  <button
                    className="users__btn users__btn--change-pass"
                    onClick={() => this.handleForm('Add')}
                  >
                    Change Pass
                  </button>
                )}
                {this.state.saving ? (
                  <button
                    onClick={this.saveNewUser}
                    className="users__btn users__btn--save"
                  >
                    Save
                  </button>
                ) : (
                  <button className="users__btn users__btn--save hidden">
                    Save
                  </button>
                )}
              </div>
            );
          }
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
                changePassword={() => this.handleForm('Change')}
              />
            }
          >
            <Icon
              onClick={() => this.handleRow(record.id)}
              title="click"
              className="user__ellipsis"
              type="ellipsis"
            />
          </Dropdown>
        );
      }
    }
  ];

  render() {
    const columns = this.columns;
    columns[0].filters = filter(this.state.users).nameOptions;
    columns[2].filters = filter(this.state.users).roleOptions;

    return (
      <main className="users__main">
        <div className="users__header">
          <Button
            onClick={this.addRow}
            type="primary"
            icon="plus"
            className="users__add-button"
          >
            Add
          </Button>
          <Search onChange={e => this.handleSearch(e)} />
        </div>
        <NotificationContainer />
        {this.state.error ? (
          <Error errorClass="users__error--wd-70" errorMsg={this.state.error} />
        ) : this.state.passwordError ? (
          <Error
            errorClass="users__error--wd-70"
            errorMsg="Please add Password"
          />
        ) : null}
        <Table
          rowKey={record => record.id}
          dataSource={
            this.state.search ? this.state.searchResults : this.state.users
          }
          columns={columns}
          pagination={false}
          rowClassName="users__row"
          className="users__table"
        />
        {this.state.show ? (
          <Form
            row={this.state.rowSelected}
            type={this.state.type}
            submitPassword={this.handlePassword}
            cancel={this.cancel}
          />
        ) : null}
      </main>
    );
  }
}

export default Users;
