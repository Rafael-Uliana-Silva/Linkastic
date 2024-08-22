import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

const PrivateRoute: React.FC = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('UserContext must be used within a UserProvider');
  }
  const { loggedUserId } = context;

  if (!loggedUserId) {
    return <Navigate to="/" />;
  }

  return <Outlet />; 
}

export default PrivateRoute;
