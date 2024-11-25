import { useState } from 'react';

import VolunteerProfileEditForm from './VolunteerProfileEditForm.jsx';

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
    console.info('Delete your profile.');
  };
  return (
    <div className="p-14">
      {isEditing ? (
        <VolunteerProfileEditForm formData={formData} handleInputChange={handleInputChange} />
      ) : (
        <div className="md:mt-6">
          <label className="block text-sm font-bold">Name</label>
          <p>
            {formData.firstName} {formData.lastName}
          </p>
          <label className="block text-sm font-bold">Address</label>
          <p>
            {formData.address}, {formData.city}, {formData.state}, {formData.zipCode}{' '}
          </p>
          <label className="block text-sm font-bold">About</label>
          <p>{formData.about}</p>
          <label className="block text-sm font-bold">Skills</label>
          <p>{formData.skills}</p>
        </div>
      )}
      <div className="mt-6 flex space-x-4 xs:justify-center md:justify-start">
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
