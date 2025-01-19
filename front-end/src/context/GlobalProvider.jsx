import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GlobalStateContext } from './GlobalStateContext';
import { getMyOrganization, getMyVolunteer } from '../utils/apiReqests';

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
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
      return { ...state, volunteer: action.payload || state.volunteer };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (state.user) {
          if (state.user.isOrganization && !state.myOrganization) {
            if (!state.myOrganization) {
              const response = await getMyOrganization();
              dispatch({ type: SET_MY_ORGANIZATION, payload: response.organization });
            }
          } else if (!state.user.isOrganization && !state.volunteer) {
            if (!state.volunteer) {
              const response = await getMyVolunteer();
              dispatch({ type: SET_VOLUNTEER, payload: response.volunteer });
              console.log('Volunteer in context updated:', state.volunteer);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [state.user, state.volunteer, state.myOrganization]);

  return <GlobalStateContext.Provider value={{ ...state, dispatch }}>{children}</GlobalStateContext.Provider>;
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
