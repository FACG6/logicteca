import React from 'react';
import {
  NotificationManager
} from 'react-notifications';

import axios from 'axios';
import createNotification from '../Users/notification/index'

export default function Logout({ clearUserInfo }) {

  axios.get('/api/v1/logout')
    .then(result => {
      if(result.data.code === 200){
        clearUserInfo()
      }
    })
    .catch(error => {
      if(error.error.code === 401){
        createNotification('not authenticated');
      } else {
        createNotification('server error');
      }
    })

}