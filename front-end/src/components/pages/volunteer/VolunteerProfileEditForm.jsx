import { useEffect, useState } from 'react';
import { getVolunteerById, updateVolunteerById } from '../../../utils/apiReqests';
import { states } from '../../../data/states';
import { useNavigate } from 'react-router-dom';

function EditVolunteer() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const transformFormData = (formData) => {
    return {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
      about: formData.about,
      addresses_attributes: [
        {
          id: formData.address_id || null,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zip_code,
        },
      ],
    };
  };

  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        const volunteerData = await getVolunteerById();
        const latestAddress = volunteerData.addresses?.[volunteerData.addresses.length - 1] || {};
        setFormData({
          first_name: volunteerData.first_name || '',
          last_name: volunteerData.last_name || '',
          email: volunteerData.email || '',
          phone: volunteerData.phone || '',
          about: volunteerData.about || '',
          address_id: latestAddress.id || null,
          address: latestAddress.address || '',
          city: latestAddress.city || '',
          state: latestAddress.state || '',
          zip_code: latestAddress.zip_code || '',
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transformedData = transformFormData(formData);
    console.info('Submitting transformed data:', transformedData);
    try {
      const response = await updateVolunteerById(transformedData);
      console.info('Server response:', response);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error updating volunteer:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-14">
      <div className="md:mt-6"></div>
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-bold">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-bold">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300 mb-4"
          />
          <label className="block text-sm font-bold">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300 mb-4"
          />
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
            className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300 mb-4"
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
                name="zip_code"
                value={formData.zip_code}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold capitalize">About</label>
          <textarea
            type="text"
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-orangeButton text-white rounded border transition duration-300 ease-in-out hover:shadow-lg hover:brightness-110"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditVolunteer;
