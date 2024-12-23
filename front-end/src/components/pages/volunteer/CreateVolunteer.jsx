import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVolunteer } from '../../../utils/apiReqests';
import { states } from '../../../data/states';

function CreateVolunteer() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    about: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip_code: '',
    },
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (['street', 'city', 'state', 'zip_code'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) newErrors.first_name = 'First Name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.about.trim()) newErrors.about = 'About is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.error('Form validation failed:', errors);
      return;
    }

    try {
      await createVolunteer(formData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error creating volunteer:', err);
      setError('Failed to create volunteer. Please try again.');
    }
  };

  return (
    <div className="px-8 sm:px-24 md:px-48 lg:px-64 py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold mb-4">Please add your information</h1>
        <p className="text-gray-600">Ensure all details are correct and up-to-date to help us serve you better.</p>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-bold">First Name *</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className={`border rounded px-2 py-1 w-full shadow-md ${
                errors.first_name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-bold">Last Name *</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className={`border rounded px-2 py-1 w-full shadow-md ${
                errors.last_name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold">Phone *</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`border rounded px-2 py-1 w-full shadow-md ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold">Street</label>
          <input
            type="text"
            name="street"
            value={formData.address.street}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full shadow-md border-gray-300"
          />

          <label className="block text-sm font-bold mt-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.address.city}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full shadow-md border-gray-300"
          />

          <div className="flex space-x-4 mt-2">
            <div className="w-1/2">
              <label className="block text-sm font-bold">State</label>
              <select
                name="state"
                value={formData.address.state}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-full shadow-md border-gray-300"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-bold">Zip Code</label>
              <input
                type="text"
                name="zip_code"
                value={formData.address.zip_code}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-full shadow-md border-gray-300"
              />
            </div>
          </div>
        </div>
        <label className="block text-sm font-bold">About</label>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleInputChange}
          className={`border rounded px-2 py-1 w-full shadow-md ${errors.about ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.about && <p className="text-red-500 text-sm">{errors.about}</p>}

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-orangeButton text-white rounded border transition hover:shadow-lg"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateVolunteer;
