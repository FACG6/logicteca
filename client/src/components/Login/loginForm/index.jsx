import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import image from './user.png';
import { Icon } from 'antd';
import './style.css';

export default class Login extends Component {
  state = {
    user_name: '',
    password: '',
    loginError: '',
    redirect: ''
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value.trim() });
  };
  login = event => {
    event.preventDefault();
    let pathname = '';
    console.log(this.props.location, 5555);

    this.props.location.state.from
      ? ({ pathname } = this.props.location.state.from)
      : (pathname = '/');
    const { password, user_name } = this.state;
    const { setUserInfo } = this.props;
    if (!password || !user_name) {
      this.setState({ loginError: 'Fill All Fields' });
    } else {
      this.setState({ loginError: '' });
      axios
        .post('/api/v1/login', {
          user_name: user_name,
          password: password
        })
        .then(result => {
          if (result.data) {
            setUserInfo(result.data);
            this.setState({ redirect: pathname });
          }
        })
        .catch(e =>
          e.error.code === 401
            ? this.setState({ loginError: e.error.msg })
            : this.setState({ loginError: ' ERROR' })
        );
    }
  };

  render() {
    return (
      <>
        {this.state.redirect ? <Redirect to={this.state.redirect} /> : null}
        <section className="login__form-container">
          <img className="login__image" src={image} alt="user" />
          <form onSubmit={this.login} className="login__form">
            <div className="login__input-container">
              <Icon className="login__icon" type="user" />
              <input
                onChange={this.handleChange}
                placeholder="Username"
                className="login__input"
                id="username"
                name="user_name"
                type="text"
                value={this.state.username}
              />
            </div>
            <div className="login__input-container">
              <Icon className="login__icon" type="lock" />
              <input
                onChange={this.handleChange}
                placeholder="Password"
                className="login__input"
                id="password"
                name="password"
                type="password"
                value={this.state.password}
              />
            </div>
            {this.state.loginError ? (
              <span className="login__error">{this.state.loginError}</span>
            ) : null}
            <input
              className="login__submit-btn"
              id="login"
              type="submit"
              value="Login"
            />
          </form>
        </section>
      </>
    );
  }
}
