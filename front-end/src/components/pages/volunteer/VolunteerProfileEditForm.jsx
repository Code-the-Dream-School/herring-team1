import PropTypes from 'prop-types';
import { states } from '../../../data/states';

function VolunteerProfileEditForm({ formData, handleInputChange }) {
  const address = formData.addresses;

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
          value={address.address || ''}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300 mb-4"
        />
        <label className="block text-sm font-bold">City</label>
        <input
          type="text"
          name="city"
          value={address.city || ''}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300 mb-4"
        />
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-bold">State</label>
            <select
              name="state"
              value={address.state || ''}
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
              name="zip_code"
              value={address.zip_code || ''}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold capitalize">About</label>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300"
        />
      </div>
    </form>
  );
}

VolunteerProfileEditForm.propTypes = {
  formData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    addresses: PropTypes.shape({
      address: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zip_code: PropTypes.string,
    }),
    about: PropTypes.string.isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default VolunteerProfileEditForm;
