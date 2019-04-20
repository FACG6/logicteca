import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';

export default function SettingMenu ({ handleDeleteUser, rowId, users, showPasswordPopup }){
  return rowId === users[users.length-1].id ? (
    <Menu>
      <Menu.Item onClick={showPasswordPopup}>
        <Icon type="lock" /> Add password
      </Menu.Item>
    </Menu>
  ) : (
      <Menu>
        <Menu.Item onClick={handleDeleteUser}>
          <Icon type="user-delete" />
          Delete member
      </Menu.Item>
        <Menu.Item>
          <Icon type="lock" />
          Change password
      </Menu.Item>
      </Menu>
    );
};

SettingMenu.propTypes = {
  handleDeleteUser: PropTypes.func.isRequired,
  rowId: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
  showPasswordPopup: PropTypes.func.isRequired,
}
