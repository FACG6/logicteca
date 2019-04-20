import Swal from 'sweetalert2';

//Filtering Function
function filter(users) {
  const usernames = [];
  const nameOptions = [];
  const roles = [];
  const roleOptions = [];
  users.forEach(user => {
    const username = user['user_name'];
    const role = user.role;
    if (username && usernames.indexOf(username) === -1) {
      usernames.push(username);
      nameOptions.push({
        text: username,
        value: username
      });
    }
    if(role && roles.indexOf(role) === -1){
      roles.push(role);
      roleOptions.push({
        text: role,
        value: role
      })
    }
  });
  return { nameOptions, roleOptions } 
}

//Sort Function
function sort(a, b, columnName) {
  if (a[columnName] < b[columnName]) {
    return -1;
  }
  if (a[columnName] > b[columnName]) {
    return 1;
  }
  return 0;
}

//Delete Swal
function deleteSwal() {
  return Swal.fire({
    type: 'warning',
    text: 'Are you sure?',
    showConfirmButton: true,
    showCancelButton: true,
  })
}



export {
  filter,
  sort,
  deleteSwal,
};