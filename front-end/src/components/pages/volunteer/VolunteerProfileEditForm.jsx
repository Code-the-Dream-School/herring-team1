import { useEffect, useState } from 'react';
import { getVolunteerById } from '../../../utils/apiReqests';
import { states } from '../../../data/states';

function EditVolunteer() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        const volunteerData = await getVolunteerById();
        setFormData({
          firstName: volunteerData.first_name || '',
          lastName: volunteerData.last_name || '',
          email: volunteerData.email || '',
          phone: volunteerData.phone || '',
          address: volunteerData.addresses?.[0]?.address || '',
          city: volunteerData.addresses?.[0]?.city || '',
          state: volunteerData.addresses?.[0]?.state || '',
          zipCode: volunteerData.addresses?.[0]?.zip_code || '',
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.info('Form submitted:', formData);
    // Add logic to send updated data to the backend
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
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-2 py-1 w-full shadow-md shadow-gray-300"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-orangeButton text-white rounded borde transition duration-300 ease-in-out hover:shadow-lg hover:brightness-110"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default EditVolunteer;
