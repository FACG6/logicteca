const axios = require('axios');

export default function isAuth(cb) {
  // axios.get('/api/v1/isAuthenticated')
  //   .then(result => (result.data ? cb(true) : cb(false)))
  //   .catch(e => cb(false));
  cb(true)
}
