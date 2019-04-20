import React from 'react';
import About from './about/index';
import LoginFrom from './loginForm/index';
import './style.css'

export default function Login() {
  return (
    <div className='login__container'>
      <LoginFrom />
      <About />
    </div>
  )
}


