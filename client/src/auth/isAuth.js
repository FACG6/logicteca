const axios = require('axios');

export default function isAuth() {
  axios
    .get('/api/v1/isAuthenticated')
    .then(result => {
      return result.data ? true : false;
    })
    .catch(e => {
      console.log(e, 'false');
      return false;
    });
}
