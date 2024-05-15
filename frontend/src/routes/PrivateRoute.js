import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element: Element, ...rest }) {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  return (
    <Route
      {...rest}
      element={userId && token ? <Element /> : <Navigate to="/" replace />}
    />
  );
}

export default PrivateRoute;