import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const userId = localStorage.getItem('loggedUserId');

  if (!userId) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
