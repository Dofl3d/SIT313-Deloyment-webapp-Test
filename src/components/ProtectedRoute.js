import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader, Dimmer } from 'semantic-ui-react';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Dimmer active>
        <Loader size="large">Loading...</Loader>
      </Dimmer>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;