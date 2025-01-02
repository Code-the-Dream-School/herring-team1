import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyVolunteer } from '../../../utils/apiReqests';

function VolunteerProfile() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    about: '',
    profileImg: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        const volunteerData = await getMyVolunteer();

        setFormData({
          firstName: volunteerData.first_name || '',
          lastName: volunteerData.last_name || '',
          email: volunteerData.email || '',
          phone: volunteerData.phone || '',
          street: volunteerData.address?.street || '',
          city: volunteerData.address?.city || '',
          state: volunteerData.address?.state || '',
          zipCode: volunteerData.address?.zip_code || '',
          about: volunteerData.about || '',
          profileImg: volunteerData.profile_img?.url || '',
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-14">
      <div className="md:mt-6">
        {/* Name */}
        {(formData.firstName || formData.lastName) && (
          <>
            <label className="block text-sm font-bold">Name</label>
            <p>
              {formData.firstName} {formData.lastName}
            </p>
          </>
        )}

        {/* Email */}
        {formData.email && (
          <>
            <label className="block text-sm font-bold">Email</label>
            <p>{formData.email}</p>
          </>
        )}

        {/* Phone */}
        {formData.phone && (
          <>
            <label className="block text-sm font-bold">Phone</label>
            <p>{formData.phone}</p>
          </>
        )}

        {/* Address */}
        {(formData.street || formData.city || formData.state || formData.zipCode) && (
          <>
            <label className="block text-sm font-bold">Address</label>
            <p>
              {formData.street && `${formData.street}, `}
              {formData.city && `${formData.city}, `}
              {formData.state && `${formData.state}, `}
              {formData.zipCode}
            </p>
          </>
        )}

        {/* About */}
        {formData.about && (
          <>
            <label className="block text-sm font-bold">About</label>
            <p>{formData.about}</p>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4 xs:justify-center md:justify-start">
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-orangeButton text-white rounded border border-orangeButton transition duration-300 ease-in-out hover:shadow-lg hover:brightness-110"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default VolunteerProfile;
