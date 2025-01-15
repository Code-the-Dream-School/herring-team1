import PropTypes from 'prop-types';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { updateVolunteerApplication } from '../../../utils/apiReqests';
import { ToastContainer, toast } from 'react-toastify';

const VolunteerApplicationCard = ({ application }) => {
  const { message, volunteer, request } = application;

  const updateApplicationStatus = async (status) => {
    try {
      await updateVolunteerApplication(application.id, status, null, null);
      if (status === 1) {
        toast.success('You accepted application successfully!');
      } else {
        toast.success('You declined application successfully!');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="grid grid-cols-[1fr_3fr_1fr_1fr] gap-4 bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex flex-col items-center justify-center">
        <img
          src={volunteer.profile_img?.url}
          alt={`${volunteer.first_name} ${volunteer.last_name}`}
          className="w-20 h-20 rounded-full object-cover mb-2"
        />
        <div className="text-center">
          <h3 className="text-lg font-semibold">
            {volunteer.first_name} {volunteer.last_name}
          </h3>
          <p className="text-sm text-gray-500">📞 {volunteer.phone}</p>
          <p className="text-sm text-gray-500">✉️ {volunteer.address.city || ''}</p>
        </div>
      </div>

      {/* Column 2: About section */}
      <div className="flex flex-col justify-center">
        <h4 className="text-sm font-semibold text-gray-700">About</h4>
        <p className="text-sm text-gray-600">{volunteer.about || 'No information provided'}</p>
        <p className="text-sm text-gray-600 font-bold mt-2">{`How I can help: ${message}`}</p>
      </div>

      {/* Column 3: Request details */}
      <div className="flex flex-col justify-center">
        <h4 className="text-sm font-semibold text-gray-700">Request</h4>
        <p className="text-sm text-gray-600">
          <strong>Title:</strong> {request.title}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Description:</strong> {request.description || 'No description'}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Status:</strong> {request.status}
        </p>
      </div>

      <div className="flex justify-evenly items-center space-y-2">
        <button
          type="button"
          className="text-blue-500 hover:text-blue-700 m-1"
          onClick={() => updateApplicationStatus(1)}
        >
          <CheckIcon className="w-6" />
        </button>
        <button
          type="button"
          className="text-red-500 hover:text-red-700 m-1"
          onClick={() => updateApplicationStatus(2)}
        >
          <XMarkIcon className="w-6" />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

VolunteerApplicationCard.propTypes = {
  application: PropTypes.object.isRequired,
};

export default VolunteerApplicationCard;
