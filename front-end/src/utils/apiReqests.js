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

export const fetchOrganizations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}organizations`, {});
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const getVolunteerById = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const related_entity_id = user.related_entity_id;
  if (!user || !user.related_entity_id) {
    throw new Error('Related entity ID not found.');
  }

  try {
    const response = await axios.get(`http://127.0.0.1:3000/volunteers/${related_entity_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteer data:', error);
    throw error.response?.data || 'Failed to fetch volunteer data.';
  }
};

export const updateVolunteerById = async (updatedData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const csrfToken = localStorage.getItem('x_csrf_token');
  const related_entity_id = user.related_entity_id;
  if (!user || !user.related_entity_id) {
    throw new Error('Related entity ID not found.');
  }

  try {
    const response = await axios.patch(
      `http://127.0.0.1:3000/volunteers/${related_entity_id}`,
      { volunteer: updatedData },
      {
        headers: {
          'X-CSRF-Token': csrfToken,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating volunteer:', error.response?.data || error.message);
    throw error.response?.data || 'Failed to update volunteer data.';
  }
};

export const uploadProfileImage = async (imageFile) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const related_entity_id = user.related_entity_id;

  const formData = new FormData();
  formData.append('profile_img', imageFile);

  try {
    const response = await axios.post(`http://127.0.0.1:3000/volunteers/${related_entity_id}/upload_image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error.response?.data || error.message;
  }
};

export const searchOrganizations = async (zip_code, keyword, service) => {
  try {
    const params = {};

    // add params if they are not empty
    if (zip_code) params.zip_code = zip_code;
    if (keyword) params.keyword = keyword;
    if (service) params.service = service;

    const response = await axios.get(`${API_BASE_URL}search`, { params });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOrganizationId = async (authId) => {
  try {
    const response = await fetchOrganizations(authId);
    const organization = response.data.find((org) => org.auth_id === authId);
    if (organization) {
      return organization.id;
    }
    return null;
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return null;
  }
};

export const fetchRequests = async () => {
  try {
    return await axios.get(`${API_BASE_URL}requests`, {});
  } catch (error) {
    throw error.response.data;
  }
};
