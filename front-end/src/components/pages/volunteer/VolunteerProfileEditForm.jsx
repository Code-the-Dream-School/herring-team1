import { useEffect, useState } from 'react';
import { getMyVolunteer, updateVolunteerById } from '../../../utils/apiReqests';
import { states } from '../../../data/states';
import { useNavigate } from 'react-router-dom';

function EditVolunteer() {
  const [formData, setFormData] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    about: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip_code: '',
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //Fetch volunteer data on mount
  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        const volunteerData = await getMyVolunteer();
        setFormData({
          id: volunteerData.id || '',
          first_name: volunteerData.first_name || '',
          last_name: volunteerData.last_name || '',
          email: volunteerData.email || '',
          phone: volunteerData.phone || '',
          about: volunteerData.about || '',
          address: {
            street: volunteerData.address?.street || '',
            city: volunteerData.address?.city || '',
            state: volunteerData.address?.state || '',
            zip_code: volunteerData.address?.zip_code || '',
          },
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

  //Handle input changes
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

  //Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateVolunteerById(formData.id, formData);
      console.log('Volunteer updated successfully');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error updating volunteer:', err);
      setError('Failed to update volunteer. Please try again.');
    }
  };

  //Show loading or error messages
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="px-8 sm:px-24 md:px-48 lg:px-64 py-12">
      <h1 className="text-2xl font-semibold mb-4 text-center">Edit Your Information</h1>
      <form onSubmit={handleSubmit}>
        {/* Name Fields */}
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-bold">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-bold">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-bold">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        {/* Address */}
        <h2 className="text-lg font-semibold mt-6 mb-2">Address</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold">Street</label>
          <input
            type="text"
            name="street"
            value={formData.address.street}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />

          <label className="block text-sm font-bold mt-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.address.city}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
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
                className="border rounded px-2 py-1 w-full"
              />
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mb-4">
          <label className="block text-sm font-bold">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-orangeButton text-white rounded border border-orangeButton transition duration-300 ease-in-out hover:shadow-lg hover:brightness-110"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditVolunteer;
