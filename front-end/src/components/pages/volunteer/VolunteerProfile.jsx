import { useState } from 'react';

import { states } from '../../../data/states';

function VolunteerProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: 'Joe',
    lastName: 'Williams',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '123-456-7890',
    email: 'joe.williams@example.com',
    about: 'Volunteer with 5 years of experience.',
    skills: 'Teamwork, Communication, Leadership',
  });

  const [originalData, setOriginalData] = useState(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setOriginalData(formData);
    setIsEditing(true);
  };

  const handleDelete = () => {
    console.log('Delete your profile.');
  };
  return (
    <div className="p-14">
      <form>
        <div className="flex space-x-4 mb-4">
          {isEditing ? (
            <>
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
            </>
          ) : (
            <div>
              <label className="block text-sm font-bold">Name</label>
              <p>
                {formData.firstName} {formData.lastName}
              </p>
            </div>
          )}
        </div>

        <div className="mb-4">
          {isEditing ? (
            <div>
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
          ) : (
            <div>
              <label className="block text-sm font-bold">Address</label>
              <p>
                {formData.address}, {formData.city}, {formData.state}, {formData.zipCode}{' '}
              </p>
            </div>
          )}
        </div>

        {Object.keys(formData)
          .filter(
            (field) =>
              !['firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'phone', 'email'].includes(field)
          )
          .map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-bold capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
              {isEditing ? (
                <textarea
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300"
                />
              ) : (
                <p>{formData[field]}</p>
              )}
            </div>
          ))}
      </form>
      <div className="mt-6 flex space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-orangeButton text-white rounded border border-orangeButton transition duration-300 ease-in-out hover:shadow-lg hover:brightness-110"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-white text-orangeButton rounded border border-orangeButton transition duration-300 ease-in-out hover:shadow-lg"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-orangeButton text-white rounded border border-orangeButton transition duration-300 ease-in-out hover:shadow-lg hover:brightness-110"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-white text-orangeButton rounded border border-orangeButton transition duration-300 ease-in-out hover:shadow-lg"
            >
              Detele
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default VolunteerProfile;
