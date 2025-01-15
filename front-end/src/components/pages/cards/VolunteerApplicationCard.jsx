import PropTypes from 'prop-types';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

const VolunteerApplicationCard = ({ application }) => {
  const { message, volunteer, request } = application;
  return (
    <div className="grid grid-cols-[0.5fr_1fr_3fr_1fr_0.5fr] gap-2 bg-white shadow-md rounded-lg p-2 mb-4">
      <div className="flex items-center justify-center">
        <img
          src={volunteer.profile_img?.url}
          alt={`${volunteer.first_name} ${volunteer.last_name}`}
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center">
        <h3 className="text-lg font-semibold">
          {volunteer.first_name} {volunteer.last_name}
        </h3>
        <p className="text-sm text-gray-500">📞 {volunteer.phone}</p>
        <p className="text-sm text-gray-500">✉️ {volunteer.email || 'No email provided'}</p>
      </div>

      <div className="flex flex-col justify-center">
        <h4 className="text-sm font-semibold text-gray-700">About</h4>
        <p className="text-sm text-gray-600">{volunteer.about || 'No information provided'}</p>
        <p className="text-sm text-gray-600">{`How I can help: ${message}`}</p>
      </div>

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

      <div className="flex justify-between space-y-2">
        <button type="button" className="text-blue-500 hover:text-blue-700 m-1">
          <CheckIcon className="w-6" />
        </button>
        <button type="button" className="text-red-500 hover:text-red-700">
          <XMarkIcon className="w-6" />
        </button>
      </div>
    </div>
  );
};

VolunteerApplicationCard.propTypes = {
  application: PropTypes.object.isRequired,
};

export default VolunteerApplicationCard;
