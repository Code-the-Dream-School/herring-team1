import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_REACT_URL || 'http://127.0.0.1:3000/';

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

// export const fetchOrganizations = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}organizations`, {});
//     return response;
//   } catch (error) {
//     throw error.response.data;
//   }
// };

//create volunteer
export const createVolunteer = async (volunteerData) => {
  const csrfToken = localStorage.getItem('x_csrf_token');
  if (!csrfToken) {
    throw new Error('CSRF token not found. Ensure you are logged in.');
  }

  try {
    const response = await axios.post(
      `/volunteers`,
      { volunteer: volunteerData },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        withCredentials: true,
      }
    );

    console.log('Volunteer created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating volunteer:', error.response?.data || error.message);
    throw error.response?.data || 'Failed to create volunteer.';
  }
};

//get my_volunteer
export const getMyVolunteer = async () => {
  const csrfToken = localStorage.getItem('x_csrf_token');
  if (!csrfToken) {
    throw new Error('CSRF token not found. Ensure you are logged in.');
  }

  try {
    const response = await axios.get(`${API_BASE_URL}volunteers/my_volunteer`, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current volunteer data:', error.response?.data || error.message);
    throw error.response?.data || 'Failed to fetch current volunteer data.';
  }
};

// Update volunteer by ID
export const updateVolunteerById = async (id, updatedData) => {
  const csrfToken = localStorage.getItem('x_csrf_token');
  if (!csrfToken) {
    throw new Error('CSRF token not found. Ensure you are logged in.');
  }

  try {
    const response = await axios.patch(
      `/volunteers/${id}`,
      { volunteer: updatedData },
      {
        headers: {
          'Content-Type': 'application/json',
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

//upload volunteer image
export const uploadProfileImage = async (id, imageFile) => {
  const csrfToken = localStorage.getItem('x_csrf_token');
  if (!csrfToken) {
    throw new Error('CSRF token not found. Ensure you are logged in.');
  }

  const formData = new FormData();
  formData.append('profile_img', imageFile);

  try {
    const response = await axios.post(`/volunteers/${id}/upload_image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRF-Token': csrfToken,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading profile image:', error.response?.data || error.message);
    throw error.response?.data || 'Failed to upload profile image.';
  }
};

export const fetchRequests = async () => {
  try {
    return await axios.get(`${API_BASE_URL}requests`, {});
  } catch (error) {
    throw error.response.data;
  }
};

export const postRequests = async (values, orgId, serviceId, statusId) => {
  try {
    const body = {
      title: values.title,
      description: values.description,
      org_service_id: serviceId,
      request_status_id: statusId,
    };
    const csrfToken = localStorage.getItem('x_csrf_token');
    if (!csrfToken) {
      throw new Error('CSRF token not found. Ensure you are logged in.');
    }

    const response = await axios.post(`${API_BASE_URL}organizations/${orgId}/requests/`, body, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
      credentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error while submitting form:', error);
  }
};

// Create a new organization
export const createOrganization = async (organizationData) => {
  const csrfToken = localStorage.getItem('x_csrf_token');
  const user = JSON.parse(localStorage.getItem('user'));

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

export const fetchOrganizations = async (params = {}) => {
  try {
    const endpoint = Object.keys(params).length > 0 ? 'search' : 'organizations';
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, { params });
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching organizations:', error.response?.data || error.message);
    throw error;
  }
};

export const updateOrganization = async (id, updatedData) => {
  const x_csrf_token = localStorage.getItem('x_csrf_token') ? localStorage.getItem('x_csrf_token') : null;

  if (!x_csrf_token) {
    throw new Error('CSRF token not found. Ensure it is set correctly in cookies.');
  }

  if (!id) {
    throw new Error('Organization ID is undefined or missing.');
  }

  try {
    const response = await axios.patch(
      `${API_BASE_URL}organizations/${id}`,
      { organization: updatedData },
      {
        headers: {
          'X-CSRF-Token': x_csrf_token,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error editing organization:', error.response?.data || error.message);
    throw error.response?.data || 'Failed to edit organization.';
  }
};

export const getMyOrganization = async () => {
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
    throw new Error("You don't have organization");
  }
};
//get filtered organizations
export const searchOrganizations = async (params) => {
  try {
    console.log('API request to search organizations with params:', params);
    const response = await axios.get(`${API_BASE_URL}search`, { params });
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('No search results found:', error.response.data);
      return { organizations: [], total_count: 0, total_pages: 0 };
    } else {
      console.error('Error searching organizations:', error.response?.data || error.message);
      throw error.response?.data || 'Failed to search organizations.';
    }
  }
};
//get all organizations
export const getAllOrganizations = async (page = 1, perPage = 6) => {
  try {
    const response = await axios.get(`${API_BASE_URL}organizations`, {
      params: { page, per_page: perPage },
    });
    console.log('All organizations response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching all organizations:', error);
    throw error;
  }
};

//get one organization by id
export const getOneOrganizationById = async (id) => {
  try {
    const url = `${API_BASE_URL}organizations/${id}`;
    const response = await axios.get(url, {});

    return response.data;
  } catch (error) {
    console.error('Error getting organization:', error);
    throw error.response.data;
  }
};

export const fetchMyOrgRequests = async (orgId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}organizations/${orgId}/requests`, {});

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [];
    } else {
      throw error.response ? error.response.data : error;
    }
  }
};

export const patchRequest = async (requestId, values, orgId, serviceId) => {
  try {
    const body = {
      title: values.title,
      description: values.description,
      org_service_id: serviceId,
      status: values.status,
    };

    const x_csrf_token = localStorage.getItem('x_csrf_token') ? localStorage.getItem('x_csrf_token') : null;

    if (!x_csrf_token) {
      throw new Error('CSRF token not found. Ensure it is set correctly in cookies.');
    }

    const response = await axios.patch(`${API_BASE_URL}organizations/${orgId}/requests/${requestId}`, body, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': x_csrf_token,
      },
      credentials: 'include',
    });

    return response.data;
  } catch (error) {
    console.error('Error while updating request:', error);
    throw error;
  }
};

export const deleteRequest = async (requestId, orgId) => {
  const x_csrf_token = localStorage.getItem('x_csrf_token') ? localStorage.getItem('x_csrf_token') : null;

  if (!x_csrf_token) {
    throw new Error('CSRF token not found. Ensure it is set correctly in cookies.');
  }
  try {
    const response = await axios.delete(`${API_BASE_URL}organizations/${orgId}/requests/${requestId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': x_csrf_token,
      },
      credentials: 'include',
    });

    return response.data;
  } catch (error) {
    console.error('Error while deleting request:', error);
    throw error;
  }
};
