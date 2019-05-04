import React from "react";
import isAuth from "./isAuth";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        isAuth(state => {
          if (!state) {
            rest.clearUserInfo();
          }
        });
        return (
          <>
            <Component {...props} />
          </>
        );
      }}
    />
  );
};

export default PrivateRoute;
