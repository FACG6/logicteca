import React, {Component} from 'react';
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
  }

  componentDidMount(){
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
      if(fullNames.indexOf(fullName) === -1){
        fullNames.push(fullName);
        fullNameOptions.push({ text: fullName, value: fullName});
      }
    });

    //Store them in the state
    this.setState({users, fullNameOptions, nameOptions});
  }

  handleAddUser = (event) => {
    //Adding New Users
  }

  handleEditUserInfo = () => {
    //Editing UserInfo
  }

  deleteUser = () => {
    //Deleting
  }

  showSwal = () => {
    //Swal before deleting
  }

  confirmDelete = () => {
    //Confirm Delete
  }

  validateUserInfo = () => {
    //Validation
  }

  updateUserInfo = () => {

  }

  render(){
    return (
      <div>Members</div>

    )
  }

}

export default Users;
