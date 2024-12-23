import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_REACT_URL;

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL is not defined. Please set it in your environment variables.');
}

console.log('API_BASE_URL:', API_BASE_URL);

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
        email,
        password,
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
    const response = await axios.get(`${API_BASE_URL}organizations`);
    console.log('Response data:', response.data); // Log the response data
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error('Organizations data is not an array');
    }
  } catch (error) {
    console.error('Error fetching organizations:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const searchOrganizations = async (searchParams) => {
  try {
    const response = await axios.get(`${API_BASE_URL}search`, {
      params: searchParams,
    });
    console.log('Search response data:', response.data); // Log the response data
    console.log('Response structure:', JSON.stringify(response.data, null, 2)); // Log the response structure
    if (response.data && Array.isArray(response.data.organizations)) {
      return response.data.organizations;
    } else {
      throw new Error('Filtered organizations data is not an array');
    }
  } catch (error) {
    console.error('Error fetching filtered organizations:', error);
    throw error;
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

// Create a new organization
export const createOrganization = async (organizationData) => {
  const csrfToken = localStorage.getItem('x_csrf_token');
  const user = JSON.parse(localStorage.getItem('user'));

  console.log('csrfToken:', csrfToken);
  console.log(user);

  if (!csrfToken) {
    throw new Error('CSRF token not found. Ensure it is set correctly.');
  }

  if (!user?.id) {
    throw new Error('User ID is missing. Ensure the user is logged in.');
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}organizations`,
      {
        organization: {
          ...organizationData,
          auth_id: user?.id,
        },
      },
      {
        headers: { 'X-CSRF-Token': csrfToken },
        withCredentials: true,
      }
    );
    console.log('Organization created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating organization:', error.response?.data || error.message);
    throw error.response?.data || 'Failed to create organization.';
  }
};

// Get organization by ID
export const getOrganizationById = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  if (!userId) {
    throw new Error('Organization ID not found.');
  }

  const x_csrf_token = localStorage.getItem('x_csrf_token') ? localStorage.getItem('x_csrf_token') : null;

  if (!x_csrf_token) {
    throw new Error('CSRF token not found. Ensure it is set correctly in cookies.');
  }
  try {
    const url = `${API_BASE_URL}organizations/my_organization`;
    const response = await axios.get(url, {
      headers: {
        'X-CSRF-Token': x_csrf_token,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error getting organization:', error);
    console.log(error);
    throw error.response.data;
  }
};
