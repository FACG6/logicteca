import React from 'react';
import { Icon } from 'antd';
import './style.css';

export default function Notification({notification, notificationClass}) {
  return(
    <div className='users__notification-div'>
      {notification === 'Saved' ? <Icon className='users__notification-icon users__notification-icon-saved' type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> : 
      <Icon className='users__notification-icon users__notification-icon--saving' type="loading" /> }
      <span className={notificationClass}>{notification}</span>
    </div>
  )
}