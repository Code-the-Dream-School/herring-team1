import { useReducer } from 'react';
import PropTypes from 'prop-types';
import { GlobalStateContext } from './GlobalStateContext';

const initialState = {
  user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
  isLoggedIn: localStorage.getItem('user') ? true : false,
  myOrganization: null,
  volunteer: null,
  dispatch: () => {},
};

const SET_MY_ORGANIZATION = 'SET_MY_ORGANIZATION';
const SET_USER = 'SET_USER';
const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
const SET_VOLUNTEER = 'SET_VOLUNTEER';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_MY_ORGANIZATION:
      return { ...state, myOrganization: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };
    case SET_VOLUNTEER:
      return { ...state, volunteer: action.payload };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <GlobalStateContext.Provider value={{ ...state, dispatch }}>{children}</GlobalStateContext.Provider>;
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
