import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({ element: Component, ...rest }) => {
  return (
    <Route {...rest}>
      {isAuthenticated() ? (
        <Component {...rest} />
      ) : (
        <Navigate to="/" state={{ from: rest.location.pathname }} replace />
      )}
    </Route>
  );
};

/*
const PrivateRoutes = ({ element: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated() ? (
          <Component {...rest} />
        ) : (
          <Navigate
            to="/signin"
            state={{ from: rest.location.pathname }}
            replace
          />
        ) 
      }
    />
  );
};

*/

export default PrivateRoute;
