import React, { Component } from 'react';
import { Icon, Spin } from 'antd';
import axios from 'axios';

import image from './user.png';
import './style.css';

export default class Login extends Component {
  state = {
    user_name: '',
    password: '',
    loginError: '',
    loading: false
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value.trim() });
  };
  
  login = event => {
    const { password, user_name } = this.state;
    const { setUserInfo, location } = this.props;

    event.preventDefault();

    if (!password || !user_name) {
      this.setState({ loginError: 'You should fill all fields' });
    } else {
      this.setState({ loginError: '', loading: true });
      axios
      .post('/api/v1/login', {
        user_name,
        password
      })
        .then(result => {
          if (result.status === 200) {
            if (location.state) {
              this.props.history.push(location.state.from);
            } else {
              this.props.history.push('/');
            }
            setUserInfo(result.data.data);
          }
        })
        .catch(err => {
          err.status === 401
            ? this.setState({ loginError: err.message, loading: false })
            : this.setState({ loginError: ' ERROR', loading: false });
        });
    }
  };

  render() {
    return (
      <>
        <section className="login__form-container">
          <img className="login__image" src={image} alt="user" />
          <form onSubmit={this.login} className="login__form">
              {this.state.loading 
                ? <Spin wrapperClassName="login__spinner" tip="Loading...">''</Spin> :
                <>
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
                </>
              }
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
