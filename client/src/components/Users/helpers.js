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
    if (role && roles.indexOf(role) === -1) {
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
    title: 'Are you sure?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ff4d4d',
    cancelButtonColor: '#3085d6',
    customClass: {
      confirmButton: 'btn btn-delete',
    }
  });
}

export {
  filter,
  sort,
  deleteSwal,
};

