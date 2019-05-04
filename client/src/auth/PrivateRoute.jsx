import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import axios from 'axios';

class PrivateRoute extends Component {
  initialMount = false;

  // axios configuration
  axiosSource = axios.CancelToken.source();
  axiosInstance = axios.create({
    baseURL: '/api/v1/',
    cancelToken: this.axiosSource.token
  });

  state = {
    isAuth: false,
  }

  componentWillUnmount() {
    this.axiosSource.cancel('cancel isAuthenticated request');
  }

  componentDidMount() {
    this.axiosInstance
    .get('/isAuthenticated')
      .then(() => {
        this.initialMount = true;
        this.setState({ isAuth: true });
      })
      .catch(() => {
        this.isUnAuthorized();
      });
  }

  componentDidUpdate() {
    // this will stop when updating after the initial mount
    if (!this.initialMount) {
      this.axiosInstance
      .get('/isAuthenticated')
        .then(() => {
          if (!this.state.isAuth) {
            this.setState({ isAuth: true });
          }
        })
        .catch(() => {
          this.isUnAuthorized();
        });
    } else {
      this.initialMount = false;
    }
  }
  
  isUnAuthorized = () => {
    this.props.history.push('/login', { from: this.props.location.pathname});
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { isAuth } = this.state;

    return (
      isAuth &&
      <Route
        {...rest}
        render={Component}
        />
    );
  }
};

export default withRouter(PrivateRoute);
