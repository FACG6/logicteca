import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Dropdown } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import './style.css';
import axios from 'axios';
import createNotification from '../../Users/notification';

export default withRouter(function Header(props) {
  const { pathname } = props.location;
  const {
    userInfo: { user_name },
    clearUserInfo
  } = props;
  function handleClick() {
    axios
      .get('/api/v1/logout')
      .then(response => {
        if (response.status === 200) {
          clearUserInfo();
        }
      })
      .catch(error => createNotification('server error'));
  }
  const menu = (
    <Menu>
      <Menu.Item onClick={handleClick}>
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );
  return pathname !== '/login' ? (
    <header className="header">
      <div className="header__container">
        <img
          alt="logo"
          className="header__logo"
          src="http://logicteca.com/wp-content/uploads/2015/11/logicteca-logo.png"
        />
        <div className="header__right-section">
          <ul className="header__navbar">
            <NavLink to="/projects">
              <li> Projects </li>
            </NavLink>
            <NavLink to="/users">
              <li> Users </li>
            </NavLink>
          </ul>
          <div className="header__username">
            <Dropdown trigger={['click']} overlay={menu} placement="bottomLeft">
              <div>
                <span>{user_name}</span>
                <FontAwesomeIcon
                  className="header__caret-down"
                  icon="caret-down"
                />
              </div>
            </Dropdown>
            <NotificationContainer />
          </div>
        </div>
      </div>
    </header>
  ) : (
    ''
  );
});
