import { useEffect, useState } from 'react';
import { getVolunteerById } from '../../../utils/apiReqests';
import VolunteerProfileEditForm from './VolunteerProfileEditForm.jsx';

function VolunteerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        const data = await getVolunteerById();
        setFormData({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.addresses?.[0]?.address || '',
          city: data.addresses?.[0]?.city || '',
          state: data.addresses?.[0]?.state || '',
          zipCode: data.addresses?.[0]?.zip_code || '',
          about: data.about || '',
        });
      } catch (err) {
        console.error('Error fetching volunteer data:', err);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteerData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    console.info('Delete your profile.');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-14">
      {isEditing ? (
        <VolunteerProfileEditForm formData={formData} handleInputChange={handleInputChange} />
      ) : (
        <div className="md:mt-6">
          {formData.firstName || formData.lastName ? (
            <>
              <label className="block text-sm font-bold">Name</label>
              <p>
                {formData.firstName} {formData.lastName}
              </p>
            </>
          ) : null}

          {formData.email ? (
            <>
              <label className="block text-sm font-bold">Email</label>
              <p>{formData.email}</p>
            </>
          ) : null}

          {formData.phone ? (
            <>
              <label className="block text-sm font-bold">Phone</label>
              <p>{formData.phone}</p>
            </>
          ) : null}

          {formData.address || formData.city || formData.state || formData.zipCode ? (
            <>
              <label className="block text-sm font-bold">Address</label>
              <p>
                {formData.address && `${formData.address}, `}
                {formData.city && `${formData.city}, `}
                {formData.state && `${formData.state}, `}
                {formData.zipCode}
              </p>
            </>
          ) : null}

          {formData.about ? (
            <>
              <label className="block text-sm font-bold">About</label>
              <p>{formData.about}</p>
            </>
          ) : null}
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
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default VolunteerProfile;
