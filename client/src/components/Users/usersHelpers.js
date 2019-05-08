import axios from 'axios';
 
import {deleteSwal} from './helpers';
import searchLogic from '../commonComponents/search/logic';
import createNotification from './notification/index';


function handleSearch(e) {
  const { value } = e.target;
  const newData = searchLogic(value, this.state.users);
  this.setState({ search: true, searchResults: newData });
};

function handleEditUserInfo(event, record, columnName) {
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

function updateUserInfo(user, users) {
  axios
    .put(`/api/v1/users/${user.id}`, user)
    .then(result => this.setState({ users }))
    .catch(error => this.setState({ error: 'Error' }));
  //change message//
};

function addRow() {
  this.setState(prevState => {
    if (this.state.rowAdded) {
      createNotification('row exist');
      return;
    }
    const clonedUsers = JSON.parse(JSON.stringify(prevState.users));
    const newUsers = clonedUsers.concat({
      id: clonedUsers[clonedUsers.length - 1].id + 1,
      user_name: '',
      full_name: '',
      role: 'Developer'
    });
    return { users: newUsers, rowAdded: true };
  }, () => {
    this._focused.current.focus();
  });
};

function validateUserInfo(user) {
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

function handleAddUser(event, columnName) {
  const newValue = event.target.value;
  this.setState(prevState => {
    const clonedUsers = JSON.parse(JSON.stringify(prevState.users));
    clonedUsers[clonedUsers.length - 1][columnName] = newValue;
    return {
      saving: true,
      users: clonedUsers,
      newRow: clonedUsers[clonedUsers.length - 1]
    };
  });
};

function handleForm(type) {
  this.setState({ show: true, type });
};

function handlePassword(password) {
  this.setState({
    passwordAdded: true,
    saving: true,
    passwordError: false,
    password,
    show: false
  });
  createNotification('password');
};

function cancel() {
  this.setState({ show: false });
};

function saveNewUser() {
  const { newRow, password } = this.state;
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

function handleDeleteUser(event) {
  const { users, rowSelected } = this.state;
  const deletedRow = users.find(user => user.id === rowSelected);
  const rowId = deletedRow.id;
  this.showSwal(rowId);
};

function showSwal(deleteMember) {
  deleteSwal().then(response => {
    if (response.value) this.confirmDelete(deleteMember);
  });
};

function confirmDelete(deleteMember) {
  const { users } = this.state;
  axios
    .delete(`/api/v1/users/${deleteMember}`)
    .then(result => {
      const filterRows = users.filter(user => user.id !== deleteMember);
      this.setState({ users: filterRows });
    })
    .catch(() => this.setState({ error: 'Error' }));
};

function handleRow(id) {
  this.setState({ rowSelected: id });
};

export {
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
}


