import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './index';

const AdminRoute = ({ element: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated() && isAuthenticated().user.role ===1  ? (
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

export default AdminRoute;
