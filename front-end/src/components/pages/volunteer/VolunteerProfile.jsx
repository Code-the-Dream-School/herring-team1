import { useState } from 'react';
import { useAuth } from '../../../context/useAuth.jsx';
import VolunteerProfileEditForm from './VolunteerProfileEditForm.jsx';

function VolunteerProfile() {
  const { volunteerData, setVolunteerData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: volunteerData?.first_name || '',
    lastName: volunteerData?.last_name || '',
    phone: volunteerData?.phone || '',
    email: volunteerData?.email || '',
    about: volunteerData?.about || '',
    addresses: volunteerData?.addresses?.[0] || {
      address: '',
      city: '',
      state: '',
      zip_code: '',
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      addresses: name in prev.addresses ? { ...prev.addresses, [name]: value } : prev.addresses,
      [name]: name in prev.addresses ? prev[name] : value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      firstName: volunteerData?.first_name || '',
      lastName: volunteerData?.last_name || '',
      phone: volunteerData?.phone || '',
      email: volunteerData?.email || '',
      about: volunteerData?.about || '',
      addresses: volunteerData?.addresses?.[0] || {
        address: '',
        city: '',
        state: '',
        zip_code: '',
      },
    });
    setIsEditing(false);
  };

  const handleSave = () => {
    setVolunteerData((prev) => ({
      ...prev,
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      about: formData.about,
      addresses: [formData.addresses],
    }));
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="p-14">
      {isEditing ? (
        <VolunteerProfileEditForm formData={formData} handleInputChange={handleInputChange} />
      ) : (
        <div className="md:mt-6">
          <label className="block text-sm font-bold">Name</label>
          <p>
            {volunteerData.first_name} {volunteerData.last_name}
          </p>
          <label className="block text-sm font-bold">Phone</label>
          <p>{volunteerData.phone}</p>
          <label className="block text-sm font-bold">Email</label>
          <p>{volunteerData.email}</p>
          <label className="block text-sm font-bold">Address</label>
          <p>
            {volunteerData.addresses?.[0]?.address || ''}, {volunteerData.addresses?.[0]?.city || ''},{' '}
            {volunteerData.addresses?.[0]?.state || ''}, {volunteerData.addresses?.[0]?.zip_code || ''}
          </p>
          <label className="block text-sm font-bold">About</label>
          <p>{volunteerData.about}</p>
        </div>
      )}
      <div className="mt-6 flex space-x-4 xs:justify-center md:justify-start">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
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
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-orangeButton text-white rounded border border-orangeButton transition duration-300 ease-in-out hover:shadow-lg hover:brightness-110"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default VolunteerProfile;
