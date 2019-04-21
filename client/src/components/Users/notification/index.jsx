import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types'
import './style.css';

export default function Notification({ notification, notificationClass }) {
  return (
    <div className={`users__notification-div ${notificationClass}`}>
      <Icon className='users__notification-icon users__notification-icon-saved' type="check-circle" />
      <span className='users__notification-msg'>{notification}</span>
    </div>
  )
}

Notification.propTypes = {
  notificationClass: PropTypes.string,
}
