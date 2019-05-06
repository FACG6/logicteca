import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Error from '../error/Error';
import axios from 'axios';
import './style.css';

export default class Password extends Component {
  state = {
    password: '',
    confirmPassword: '',
    // empty: false,
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
        //a message//
        result.data.data === 'success'
          ? this.props.cancel()
          : this.setState({ passwordError: 'Error' });
      })
      .catch(error => this.setState({ passwordError: 'Error' }));
  };

  validation = event => {
    event.preventDefault();
    const { password, confirmPassword } = this.state;
    if (!password || !confirmPassword) {
      this.setState({ passwordError: 'Empty' });
      return false;
    }
    if (password.length < 6 || confirmPassword < 6) {
      this.setState({
        passwordError: 'password length should be greater than 6'
      });
      return false;
    }
    if (password !== confirmPassword) {
      this.setState({ passwordError: "passwords don't match" });
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
          {empty ? (
            <Error errorMsg={"Can' be blank"} />
          ) : passwordError ? (
            <Error errorMsg={this.state.passwordError} />
          ) : null}
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
