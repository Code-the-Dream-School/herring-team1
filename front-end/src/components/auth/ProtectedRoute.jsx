import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const checkUserData = async () => {
      if (!user) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      if (user.isOrganization) {
        setIsAuthorized(true);
      } else {
        try {
          const response = await fetch(`http://127.0.0.1:3000/volunteers/${user.related_entity_id}`);
          const data = await response.json();

          if (data.first_name && data.last_name) {
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
          }
        } catch (error) {
          console.error('Error fetching volunteer data:', error);
          setIsAuthorized(false);
        }
      }

      setIsLoading(false);
    };

    checkUserData();
  }, [user]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthorized) {
    return <Navigate to="/edit_volunteer" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
