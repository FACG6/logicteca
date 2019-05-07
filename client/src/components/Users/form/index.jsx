import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Error from '../error/Error';
import axios from 'axios';
import './style.css';

export default class Password extends Component {
  state = {
    password: '',
    confirmPassword: '',
    passwordError: ''
  };

  handlePassword = ({ target: { name, value } }) => {
    this.setState({ passwordError: false, empty: false, [name]: value });
  };

  updatePassword = () => {
    const id = this.props.row;
    axios
      .put(`/api/v1/users/${id}/new-password`, {
        password: this.state.password
      })
      .then(result => {
        result.data.data === 'success'
          ? this.props.cancel()
          : this.setState({ passwordError: 'ERROR' });
      })
      .catch(error => {
        if (error.response.status === 422) {
          this.setState({ passwordError: error.response.message })
        } else {
          this.setState({ passwordError: 'ERROR' })
        }
      });
  };

  validation = event => {
    event.preventDefault();
    const { password, confirmPassword } = this.state;
    if (!password || !confirmPassword) {
      this.setState({ passwordError: 'Fill All Fields' });
      return false;
    }
    if (password.length < 6) {
      this.setState({
        passwordError: 'Password should have at least 6 characters'
      });
      return false;
    }
    if (password !== confirmPassword) {
      this.setState({ passwordError: "Passwords don't match" });
      return false;
    }
    if (this.props.type === 'Add') {
      this.props.submitPassword(password);
    } else {
      this.updatePassword();
    }
  };

  cancel = event => {
    event.preventDefault();
    this.props.cancel();
  };

  render() {
    const { empty, passwordError } = this.state;
    return (
      <div className="users__password-wrapper">
        <form className="users__password-form">
          <h3 className="users__heading">{this.props.type} Password</h3>
          <label className="users__label" htmlFor="password">
            Password
          </label>
          <input
            className="users__input"
            name="password"
            onChange={this.handlePassword}
            value={this.state.password}
            id="password"
            type="password"
          />
          <label className="users__label" htmlFor="confirmPassword">
            Re-enter Password
          </label>
          <input
            className="users__input"
            name="confirmPassword"
            onChange={this.handlePassword}
            value={this.state.confirmPassword}
            id="confirmPassword"
            type="password"
          />
          <label htmlFor="confirm" />
          {this.state.passwordError ?
            <Error errorMsg={"Can' be blank"} /> : null}
          <div className="users_btns">
            <button
              className="users__password-submit"
              onClick={this.validation}
            >
              Confirm
            </button>
            <button className="users__password-cancel" onClick={this.cancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Password.propTypes = {
  submitPassword: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};
