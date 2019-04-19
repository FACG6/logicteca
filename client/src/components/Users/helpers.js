import Swal from 'sweetalert2';

//Filtering Function
function filter(users) {
  const usernames = [];
  const nameOptions = [];
  const fullNames = [];
  const fullNameOptions = [];
  users.forEach(user => {
    const username = user['user_name'];
    const fullName = user['full_name'];
    if (usernames.indexOf(username) === -1) {
      usernames.push(username);
      nameOptions.push({
        text: username,
        value: username
      });
    }
    if (fullNames.indexOf(fullName) === -1) {
      fullNames.push(fullName);
      fullNameOptions.push({
        text: fullName,
        value: fullName
      });
    }
  });
  return {
    fullNameOptions,
    nameOptions
  }
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