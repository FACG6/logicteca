import React, { Component } from 'react';
import image from './user.png';
import { Icon } from 'antd';
import './style.css'

export default class Login extends Component {
  state = {
    username: '',
    password: '',
  }
  render() {
    return (
      <div className='login__form__container'>
        <img className='login__image' src={image} alt='user' />
        <form className='login__form'>
          <div className='login__input-container'>
            <Icon className='login__form__icon' type="user" />
            <input placeholder='Username' className='login__form__input' id='username' name='username' type='text' value={this.state.username}></input>
          </div>
          <div className='login__input-container'>
            <Icon className='login__form__icon' type="lock" />
            <input placeholder='Password' className='login__form__input' id='password' name='password' type='password' value={this.state.password}></input>
          </div>
          <input  className='login__form__submit' id='login' type='submit' value='Login'></input>
        </form >
      </div >
    )
  }
}