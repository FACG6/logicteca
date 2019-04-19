import React, { Component } from 'react';

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

	validation = (event) => {
		event.preventDefault();
		const { password, confirmPassword } = this.state;
		if (!password || !confirmPassword) {
			this.setState({ empty: true });
			return false;
		}
		if (password !== confirmPassword) {
			this.setState({ passwordError: true });
			return false;
		}
		this.setState({ passwordError: false, empty: false });
		this.props.submitPassword(password)
	};
	render() {
		const { empty, passwordError } = this.state;
		return (
			<form>
				{empty ? (
					<span className="users__error users__error--empty">Can't be blank</span>
				) : passwordError ? (
					<span className="users__error users__error--password">Passwords dont' match</span>
				) : null}
				<label htmlFor="password" />
				Password
				<input
					name="password"
					onChange={this.handlePassword}
					value={this.state.password}
					id="password"
					type="password"
				/>
				<label htmlFor="confirmPassword" />
				Re-enter Password
				<input
					name="confirmPassword"
					onChange={this.handlePassword}
					value={this.state.confirmPassword}
					id="confirmPassword"
					type="password"
				/>
				<label htmlFor="confirm" />
				<button onClick={this.validation}>Confirm</button>
			</form>
		);
	}
}
