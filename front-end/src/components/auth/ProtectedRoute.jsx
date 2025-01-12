import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useGlobal } from '../../context/useGlobal.jsx';

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, volunteer } = useGlobal();

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user.isOrganization) {
    return children;
  }

  if (user.isOrganization === 'false' && !volunteer) {
    return <Navigate to="/create_volunteer" replace />;
  } else {
    return children;
  }
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
