import PropTypes from 'prop-types';

import { states } from '../../../data/states';

function VolunteerProfileEditForm({ formData, handleInputChange }) {
  return (
    <form>
      <div className="flex space-x-4 mb-4">
        <div className="w-1/2">
          <label className="block text-sm font-bold">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-bold">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300 mb-4"
        />
        <label className="block text-sm font-bold">City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300  mb-4"
        />
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-bold">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300"
            >
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
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300"
            />
          </div>
        </div>
      </div>

      {Object.keys(formData)
        .filter(
          (field) => !['firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'phone', 'email'].includes(field)
        )
        .map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-sm font-bold capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            <textarea
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300"
            />
          </div>
        ))}
    </form>
  );
}

VolunteerProfileEditForm.propTypes = {
  formData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
    phone: PropTypes.string,
    email: PropTypes.string,
    about: PropTypes.string,
    skills: PropTypes.string,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
};

export default VolunteerProfileEditForm;
