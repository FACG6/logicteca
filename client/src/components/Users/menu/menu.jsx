import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';

export default function SettingMenu ({ handleDeleteUser, changePassword }){
  return (
      <Menu>
        <Menu.Item onClick={handleDeleteUser}>
          <Icon type="user-delete" />
          Delete member
      </Menu.Item>
        <Menu.Item onClick={changePassword}>
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
}
