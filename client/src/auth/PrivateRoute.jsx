import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import axios from 'axios';

class PrivateRoute extends Component {
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
        this.setState({ isAuth: true });
      })
      .catch(() => {
        this.isUnAuthorized();
      });
  }

  componentDidUpdate(prevProps) {
    // this will stop when componentDidMount works
    if (this.props.location.key !== prevProps.location.key) {
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
    }
  }
  
  isUnAuthorized = () => {
    this.props.history.push('/login');
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { isAuth } = this.state;

    return (
      isAuth &&
      <Route
        {...rest}
        render={props => <Component {...props} />}
        />
    );
  }
};

export default withRouter(PrivateRoute);
