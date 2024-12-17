import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVolunteerById } from '../../../utils/apiReqests';

function VolunteerProfile() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        const volunteerData = await getVolunteerById();
        const latestAddress = volunteerData.addresses?.[volunteerData.addresses.length - 1] || {};
        setFormData({
          firstName: volunteerData.first_name || '',
          lastName: volunteerData.last_name || '',
          email: volunteerData.email || '',
          phone: volunteerData.phone || '',
          address: latestAddress.address || '',
          city: latestAddress.city || '',
          state: latestAddress.state || '',
          zipCode: latestAddress.zip_code || '',
          about: volunteerData.about || '',
        });
      } catch (err) {
        console.error('Error fetching volunteer data:', err);
        setError('Failed to load volunteer data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteerData();
  }, []);

  const handleEdit = () => {
    navigate('/edit_volunteer');
  };

  // const handleDelete = () => {
  //   console.info('Delete profile functionality to be implemented.');
  // };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-14">
      <div className="md:mt-6">
        {(formData.firstName || formData.lastName) && (
          <>
            <label className="block text-sm font-bold">Name</label>
            <p>
              {formData.firstName} {formData.lastName}
            </p>
          </>
        )}

        {formData.email && (
          <>
            <label className="block text-sm font-bold">Email</label>
            <p>{formData.email}</p>
          </>
        )}

        {formData.phone && (
          <>
            <label className="block text-sm font-bold">Phone</label>
            <p>{formData.phone}</p>
          </>
        )}

        {(formData.address || formData.city || formData.state || formData.zipCode) && (
          <>
            <label className="block text-sm font-bold">Address</label>
            <p>
              {formData.address && `${formData.address}, `}
              {formData.city && `${formData.city}, `}
              {formData.state && `${formData.state}, `}
              {formData.zipCode}
            </p>
          </>
        )}

        {formData.about && (
          <>
            <label className="block text-sm font-bold">About</label>
            <p>{formData.about}</p>
          </>
        )}
      </div>
      <div className="mt-6 flex space-x-4 xs:justify-center md:justify-start">
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-orangeButton text-white rounded border border-orangeButton transition duration-300 ease-in-out hover:shadow-lg hover:brightness-110"
        >
          Edit
        </button>
        {/* <button
          onClick={handleDelete}
          className="px-4 py-2 bg-white text-orangeButton rounded border border-orangeButton transition duration-300 ease-in-out hover:shadow-lg"
        >
          Delete
        </button> */}
      </div>
    </div>
  );
}

export default VolunteerProfile;
