import React from 'react';
import isAuth from './isAuth';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={props => {
        return isAuth() ? (
          <Component {...props} />
        ) : (
            <>
              {rest.clearUserInfo()}
              <Redirect 
                to={{ pathname: '/login', state: { from: props.location } }}
              />
            </>
          );
      }}
    />
  );
};

export default PrivateRoute;
