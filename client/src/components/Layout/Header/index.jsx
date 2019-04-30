import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Dropdown } from 'antd';
import { NavLink } from 'react-router-dom';
import {
  NotificationContainer,
} from 'react-notifications';
import logoutHelper from './logoutHelper';
import './style.css';
import axios from 'axios';
import createNotification from '../../Users/notification';

export default class Header extends Component {
  logout = () => {
    this.setState({ logout: true });
  }
  handleClick = () => {
    axios.get('/api/v1/logout')
    .then(response => {
      if(response.status === 200){
        logoutHelper(this.props.clearUserInfo, this.logout)
      }
    })
    .catch(error => createNotification('server error')) 
  }

  menu = (
    <Menu>
      <Menu.Item>
        <span onClick={this.handleClick}>Logout</span>
      </Menu.Item>
    </Menu>
  );
  render() {
    const { userInfo: { user_name, role } } = this.props;
    return (
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
              {role === 'admin' ? (
                <NavLink to="/users">
                  <li> Users </li>
                </NavLink>
              ) : null}
            </ul>
            <div className="header__username">
              <Dropdown trigger={['click']} overlay={this.menu} placement="bottomLeft">
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
    );
  }
}
