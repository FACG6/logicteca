import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Dropdown } from 'antd';
import { NavLink } from 'react-router-dom';
import './style.css';

class Header extends Component {
  state = {
    username: '',
    role: ''
  };

  menu = (
    <Menu>
      <Menu.Item>
        <a href="/logout">Logout</a>
      </Menu.Item>
    </Menu>
  );

  componentDidMount() {
    const {
      userInfo: { user_name, role }
    } = this.props;
    this.setState({ username: user_name, role: role });
  }
  render() {
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
              {this.state.role === 'admin' ? (
                <NavLink to="/users">
                  <li> Users </li>
                </NavLink>
              ) : null}
            </ul>
            <div className="header__username">
              <Dropdown
                trigger={['click']}
                overlay={this.menu}
                placement="bottomLeft"
              >
                <div>
                  <span>{this.state.username}</span>
                  <FontAwesomeIcon
                    className="header__caret-down"
                    icon="caret-down"
                  />
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
