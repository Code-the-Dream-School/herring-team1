import { useNavigate } from 'react-router-dom';

import { useGlobal } from '../../../context/useGlobal.jsx';

function VolunteerProfile() {
  const navigate = useNavigate();
  const { volunteer } = useGlobal();

  const handleEdit = () => {
    navigate('/edit_volunteer');
  };

  return (
    <div className="p-14">
      <div className="md:mt-6">
        <p className="block text-sm font-bold">Name</p>
        <p>
          {volunteer.first_name} {volunteer.last_name}
        </p>

        <label className="block text-sm font-bold">Email</label>
        <p>{volunteer.email}</p>

        <p className="block text-sm font-bold">Phone</p>
        <p>{volunteer.phone}</p>

        <p className="block text-sm font-bold">Address</p>
        <p>
          {volunteer.address.street && `${volunteer.address.street}, `}
          {volunteer.address.city && `${volunteer.address.city}, `}
          {volunteer.address.state && `${volunteer.address.state} `}
          {volunteer.address.zipCode && `${volunteer.address.zipCode}`}
        </p>

        <label className="block text-sm font-bold">About</label>
        <p>{volunteer.about}</p>
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
