import React from 'react';
import isAuth from './isAuth';
import { Route, Redirect } from 'react-router-dom';
import { checkPropTypes } from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
