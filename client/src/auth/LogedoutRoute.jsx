import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import axios from 'axios';

class LogedoutRoute extends Component {
  initialMount = false;

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
        this.initialMount = true;
        this.setState({ isAuth: false });
      });
  }

  componentDidUpdate(prevProps) {
    // this will stop when updating after the initial mount
    if (!this.initialMount) {
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
    } else {
      this.initialMount = false;
    }
  }

  isAuthorized = () => {
    const { state } = this.props.location;
    if (state) {
      this.props.history.push(state.from.pathname);
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { isAuth } = this.state;
    return (
      !isAuth &&
      <Route
        {...rest}
        render={Component}
        />
    );
  }
};

export default withRouter(LogedoutRoute);
