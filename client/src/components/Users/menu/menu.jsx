import React from 'react';
import { Menu, Icon } from 'antd';

export default ({ handleDeleteUser, rowId, usersLength, showPasswordPopup }) => {
	return rowId === usersLength ? (
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
