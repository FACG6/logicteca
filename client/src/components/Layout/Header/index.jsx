import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

class Header extends Component {
  state = {
    userList: false
  }

  handleUserList = (e) => {
    this.setState({userList: !this.state.userList})
  }

   render() { 
    return (
      <div className='header'>
          <img className='header__logo' src='http://logicteca.com/wp-content/uploads/2015/11/logicteca-logo.png'/>
          <div className='header__right'>
              <ul className='navbar'>
                  <li> Projects </li>
                  <li> Members </li> 
              </ul>
              <div className='header__userList'>
              <button className='header__btn' onClick={this.handleUserList}> Username 
                  <FontAwesomeIcon className='search__icon' icon='caret-down' />
              </button>
                <a className={`header__logout ${this.state.userList ? 'header__btn--hidden' : ''}`}> Logout </a>  
              </div>
          </div>
      </div>
    )
  }
}

export default Header;
