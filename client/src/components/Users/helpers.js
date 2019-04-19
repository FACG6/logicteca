import Swal from 'sweetalert2';

//Filtering Function
function filter(users) {
  const usernames = [];
  const nameOptions = [];
  users.forEach(user => {
    const username = user['user_name'];
    if (usernames.indexOf(username) === -1 && username) {
      usernames.push(username);
      nameOptions.push({
        text: username,
        value: username
      });
    }
  });
  return nameOptions
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

//Role Filter Column
const roleFilter = [{
    text: 'developer',
    value: 'developer',
  },
  {
    text: 'scrum master',
    value: 'scrum master',
  },
];


export {
  filter,
  sort,
  deleteSwal,
  roleFilter
};