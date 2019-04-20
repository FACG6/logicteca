import React, { Component } from 'react';
import image from './user.png';
import { Icon } from 'antd';
import './style.css'

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    loginError: false,
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  login = (event) => {
    event.preventDefault();
    const { password, username } = this.state;
    if (!password.trim() || !username.trim()) {
      this.setState({ loginError: true });
    }
    //fetch//
  }

  render() {
    return (
      <div className='login__form__container'>
        <img className='login__image' src={image} alt='user' />
        <form onSubmit={this.login} className='login__form'>
          <div className='login__input-container'>
            <Icon className='login__form__icon' type="user" />
            <input onChange={this.handleChange} placeholder='Username' className='login__form__input' id='username' name='username' type='text' value={this.state.username}></input>
          </div>
          <div className='login__input-container'>
            <Icon className='login__form__icon' type="lock" />
            <input onChange={this.handleChange} placeholder='Password' className='login__form__input' id='password' name='password' type='password' value={this.state.password}></input>
          </div>
          {this.state.loginError ? (
            <span className='login__error'>Fill All Fields</span>
          )
            : null}
          <input className='login__form__submit' id='login' type='submit' value='Login'></input>
        </form >
      </div >
    )
  }
}
