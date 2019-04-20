import React from 'react';
import { Icon } from 'antd';
import './style.css'

export default ({errorMsg, errorClass}) => {
  return (
    <div className={`users__error ${errorClass}`}>
      <Icon className="users__alert" type="warning" />
      <span>{errorMsg}</span>
    </div>
  )
}
