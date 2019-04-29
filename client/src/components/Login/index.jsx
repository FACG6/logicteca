import React from 'react';
import About from './about/index';
import LoginFrom from './loginForm/index';
import './style.css';

export default function Login({ setUserInfo }) {
  return (
    <main className="login__main">
      <div className="login__container">
        <LoginFrom setUserInfo={setUserInfo} />
        <About />
      </div>
    </main>
  );
}
