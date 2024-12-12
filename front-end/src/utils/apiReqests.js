import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_REACT_URL;

export const register = async (email, password, confirmPassword, isOrganization) => {
  try {
    const response = await axios.post(`${API_BASE_URL}auth`, {
      auth: {
        email,
        password,
        confirmPassword,
        isOrganization,
      },
    });
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}auth/login`, {
      auth: {
        email: email,
        password: password,
      },
    });
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  const x_csrf_token = localStorage.getItem('x_csrf_token') ? localStorage.getItem('x_csrf_token') : null;

  if (!x_csrf_token) {
    throw new Error('CSRF token not found. Ensure it is set correctly in cookies.');
  }
  try {
    const response = await axios.delete(`${API_BASE_URL}auth/logout`, {
      headers: {
        'X-CSRF-Token': x_csrf_token,
      },
      withCredentials: true,
    });
    if (response.status === 200) {
      document.cookie = `CSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      document.cookie = '_session_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    }
    return response;
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const editOrganization = async (updatedData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const related_entity_id = user.related_entity_id;
  console.log(related_entity_id);
  console.log(user);

  if (!related_entity_id) {
    throw new Error('Organization ID not found.');
  }
  const x_csrf_token = localStorage.getItem('x_csrf_token') ? localStorage.getItem('x_csrf_token') : null;

  if (!x_csrf_token) {
    throw new Error('CSRF token not found. Ensure it is set correctly in cookies.');
  }
  try {
    const response = await axios.patch(`${API_BASE_URL}organizations/${related_entity_id}`, updatedData, {
      headers: {
        'X-CSRF-Token': x_csrf_token,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error editing organization:', error);
    console.log(error);
    throw error.response.data;
  }
};

export const deleteOrganization = async (related_entity_id) => {
  const x_csrf_token = localStorage.getItem('x_csrf_token') ? localStorage.getItem('x_csrf_token') : null;

  if (!x_csrf_token) {
    throw new Error('CSRF token not found. Ensure it is set correctly in cookies.');
  }
  try {
    const response = await axios.delete(`${API_BASE_URL}organizations/${related_entity_id}`, {
      headers: {
        'X-CSRF-Token': x_csrf_token,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting organization:', error);
    throw error.response.data;
  }
};

export const getOrganization = async (related_entity_id) => {
  const x_csrf_token = localStorage.getItem('x_csrf_token') ? localStorage.getItem('x_csrf_token') : null;

  if (!x_csrf_token) {
    throw new Error('CSRF token not found. Ensure it is set correctly in cookies.');
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/organizations/${related_entity_id}`, {
      headers: {
        'X-CSRF-Token': x_csrf_token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching organization data:', error);
    throw error.response?.data || 'Failed to fetch organization data.';
  }
};
