import axios from 'axios';
import createNotification from '../../Users/notification/index'

export default function logout(clearUserInfo, logout ) {
  axios.get('/api/v1/logout')
    .then(result => {
      if (result.status === 200) {
        logout();
        clearUserInfo();
      }
    })
    .catch(error => {
      if (error.error.code === 401) {
        createNotification('not authenticated');
      } else {
        createNotification('server error');
      }
    })
}