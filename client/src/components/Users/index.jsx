import React, { Component } from 'react';
import { Button, Table } from 'antd';
import './style.css';
import { filter } from './helpers.js';
import Form from './form/index';
import Error from './error/Error';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Search from '../commonComponents/search/index';
import axios from 'axios';
import {
  handleSearch,
  handleEditUserInfo,
  updateUserInfo,
  addRow,
  validateUserInfo,
  handleAddUser,
  handleForm,
  handlePassword,
  cancel,
  saveNewUser,
  handleDeleteUser,
  showSwal,
  confirmDelete,
  handleRow,
} from './usersHelpers';
import columns from './usersColumns';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      nameOptions: [],
      roleOptions: [],
      password: '',
      passwordError: false,
      rowSelected: null,
      rowAdded: false,
      newRow: {},
      saving: false,
      show: false,
      passwordAdded: false,
      error: '',
      search: '',
      searchResults: [],
      type: ''
    }

    this.handleSearch = handleSearch.bind(this);
    this.handleEditUserInfo = handleEditUserInfo.bind(this);
    this.updateUserInfo = updateUserInfo.bind(this);
    this.addRow = addRow.bind(this);
    this.validateUserInfo = validateUserInfo.bind(this);
    this.handleAddUser = handleAddUser.bind(this);
    this.handleForm = handleForm.bind(this);
    this.handlePassword = handlePassword.bind(this);
    this.cancel = cancel.bind(this);
    this.saveNewUser = saveNewUser.bind(this);
    this.handleDeleteUser = handleDeleteUser.bind(this);
    this.showSwal = showSwal.bind(this);
    this.confirmDelete = confirmDelete.bind(this);
    this.handleRow = handleRow.bind(this);
    this.columns = columns.bind(this);
  }

  _focused = React.createRef();

  componentDidMount() {
    //Fetch to get users from database//
    axios
      .get('/api/v1/users')
      .then(result => this.setState({ users: result.data.data }))
      .catch(error => this.setState({ error: 'Error' }));
  }

  render() {
    const columns = this.columns();
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
