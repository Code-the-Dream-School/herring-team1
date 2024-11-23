import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
