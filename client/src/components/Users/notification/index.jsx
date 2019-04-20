import React from 'react';
import { Icon } from 'antd';

export default function Notification({notification}) {
  return(
    <div>
      <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
      <span>{notification}</span>
    </div>
  )
}