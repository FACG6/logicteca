const axios = require('axios');

export default function isAuth() {
  axios
    .get('/api/v1/isAuthenticated')
    .then(result => (result.data ? true : false))
    .catch(e => false);
}
