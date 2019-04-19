import React from 'react';
import { Menu, Icon } from 'antd';

export default ({ handleDeleteUser, rowId, usersLength, handleAddPassword}) => {
	return rowId === usersLength ?
      (<Menu>
        <Menu.Item onClick={handleAddPassword}>
          <Icon type="lock" />
          Add password
			</Menu.Item>
      </Menu>):
		(<Menu>
			<Menu.Item onClick={handleDeleteUser}>
				<Icon type="user-delete" />
				Delete member
			</Menu.Item>
			<Menu.Item>
				<Icon type="lock" />
				Change password
			</Menu.Item>
		</Menu>);
};
