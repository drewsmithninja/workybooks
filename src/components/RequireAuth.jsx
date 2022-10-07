import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { selectCurrentToken } from '../features/auth/authSlice';

function RequireAuth() {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate
      to='/sign-in'
      state={{
        from: location
      }}
      replace
    />
  );
}

export default RequireAuth;
