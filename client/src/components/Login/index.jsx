import React, {Component} from 'react';
import About from './about/index';
import LoginFrom from './loginForm/index';
import './style.css'

export default class Login extends Component{
  state = {
    username: '',
    password: '',
  }
  render(){
    return (
      <div className='login__container'>
        <LoginFrom />
        <About />
      </div>
    )
  }
}


