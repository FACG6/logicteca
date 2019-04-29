import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Dropdown } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import {
  NotificationContainer,
} from 'react-notifications';
import './style.css';
class Header extends Component {
  state = {
    username: 'Mohanned',
    role: 'admin',
  }

  menu = (
    <Menu>
      <Menu.Item>
        <Link to='/logout'>Logout</Link>
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <header className='header'>
        <div className='header__container'>
          <img alt='logo' className='header__logo' src='http://logicteca.com/wp-content/uploads/2015/11/logicteca-logo.png' />
          <div className='header__right-section'>
            <ul className='header__navbar'>
              <NavLink to='/projects'><li> Projects </li></NavLink>
              {this.state.role === 'admin' ? <NavLink to='/users'><li> Users </li></NavLink> : null}
            </ul>
            <div className='header__username'>
              <Dropdown trigger={['click']} overlay={this.menu} placement="bottomLeft">
                <div>
                  <span>{this.state.username}</span>
                  <FontAwesomeIcon className='header__caret-down' icon='caret-down' />
                </div>
              </Dropdown>
              <NotificationContainer />
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;
