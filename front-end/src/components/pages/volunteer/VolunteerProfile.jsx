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
        {volunteer?.first_name && volunteer?.last_name && (
          <>
            <p className="block text-sm font-bold">Name</p>
            <p className="py-2">
              {volunteer.first_name} {volunteer.last_name}
            </p>
          </>
        )}

        {volunteer?.email && (
          <>
            <p className="block text-sm font-bold">Email</p>
            <p className="py-2">{volunteer.email}</p>
          </>
        )}

        {volunteer?.phone && (
          <>
            <p className="block text-sm font-bold">Phone</p>
            <p className="py-2">{volunteer.phone}</p>
          </>
        )}

        {volunteer?.address && (
          <>
            <p className="block text-sm font-bold">Address</p>
            <p className="py-2">
              {volunteer.address.street && `${volunteer.address.street}, `}
              {volunteer.address.city && `${volunteer.address.city}, `}
              {volunteer.address.state && `${volunteer.address.state} `}
              {volunteer.address.zip_code && `${volunteer.address.zip_code}`}
            </p>
          </>
        )}

        {volunteer?.about && (
          <>
            <label className="block text-sm font-bold">About</label>
            <p className="py-2">{volunteer.about}</p>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4 xs:justify-center md:justify-start">
        <button
          onClick={handleEdit}
          className="w-1/5 px-4 py-2 sm:text-xl lg:text-lg rounded-md bg-orange text-white hover:bg-orange-600 hover:shadow-md hover:shadow-gray-400 mx-2"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default VolunteerProfile;
