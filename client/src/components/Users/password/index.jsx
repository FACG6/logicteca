import React, { Component } from 'react';
import './style.css';

export default class Password extends Component {
  state = {
    password: '',
    confirmPassword: '',
    empty: false,
    passwordError: false,
  };
  handlePassword = event => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  };

  validation = event => {
    event.preventDefault();
    const { password, confirmPassword } = this.state;
    if (!password || !confirmPassword) {
      this.setState({ empty: true });
      return false;
    }
    if (password !== confirmPassword) {
      this.setState({ passwordError: true, empty: false });
      return false;
    }
    this.setState({ passwordError: false, empty: false });
    this.props.submitPassword(password);
  };

  cancel = (event) => {
    event.preventDefault();
    this.props.cancel();
  }
  render() {
    const { empty, passwordError } = this.state;
    return (
      <div className="users__password-wrapper">
        <form className="users__password-form">
          <h3 className='users__password-form__heading'>Add Password</h3>
          <label className="users__password-form__label" htmlFor="password">
            Password
					</label>
          <input
            className="users__password-form__input"
            name="password"
            onChange={this.handlePassword}
            value={this.state.password}
            id="password"
            type="password"
          />
          <label className="users__password-form__label" htmlFor="confirmPassword">
            Re-enter Password
					</label>
          <input
            className="users__password-form__input"
            name="confirmPassword"
            onChange={this.handlePassword}
            value={this.state.confirmPassword}
            id="confirmPassword"
            type="password"
          />
          <label htmlFor="confirm" />
          {empty ? (
            <span className="users__error users__error--password">Can't be blank</span>
          ) : passwordError ? (
            <span className="users__error users__error--password">Passwords don't match</span>
          ) : null}
          <div className='users__password-form_btns'>
            <button className="users__password-submit" onClick={this.validation}>
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
