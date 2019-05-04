import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import axios from 'axios';

class LogedoutRoute extends Component {
  // axios configuration
  axiosSource = axios.CancelToken.source();
  axiosInstance = axios.create({
    baseURL: '/api/v1/',
    cancelToken: this.axiosSource.token
  });

  state = {
    isAuth: true,
  }

  componentWillUnmount() {
    this.axiosSource.cancel('cancel isAuthenticated request');
  }

  componentDidMount() {
    this.axiosInstance
    .get('/isAuthenticated')
      .then(() => {
        this.isAuthorized();
      })
      .catch(() => {
        this.setState({ isAuth: false });
      });
  }

  componentDidUpdate(prevProps) {
    // this will stop when componentDidMount works
    if (this.props.location.key !== prevProps.location.key) {
      this.axiosInstance
      .get('/isAuthenticated')
        .then(() => {
          this.isAuthorized();
        })
        .catch(() => {
          if (this.state.isAuth) {
            this.setState({ isAuth: false });
          }
        });
    }
  }

  isAuthorized = () => {
    this.props.history.goBack();
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { isAuth } = this.state;
    return (
      !isAuth &&
      <Route
        {...rest}
        render={props => <Component {...props} />}
        />
    );
  }
};

export default withRouter(LogedoutRoute);
