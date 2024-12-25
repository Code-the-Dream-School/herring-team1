import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';

function RequestList({ requests, onEditRequest, onRemoveRequest }) {
  const formatStatus = (status) => {
    const requestStatus = {
      open: 'Open',
      in_progress: 'In progress',
      closed: 'Closed',
      canceled: 'Canceled',
    };

    return requestStatus[status] || status;
  };

  return (
    <table className="table-auto w-full border-collapse border border-gray-300 mx-auto">
      <thead>
        <tr className="bg-light_purple">
          <th className="border border-gray-300 p-2 text-center text-xs sm:text-sm md:px-2 md:py-2">#</th>
          <th className="border border-gray-300 p-2 text-center text-xs sm:text-sm md:px-2 md:py-2">Service</th>
          <th className="border border-gray-300 p-2 text-center text-xs sm:text-sm md:px-2 md:py-2">Request</th>
          <th className="border border-gray-300 p-2 text-center text-xs sm:text-sm md:px-2 md:py-2">Description</th>
          <th className="border border-gray-300 p-2 text-center text-xs sm:text-sm md:px-2 md:py-2">Status</th>
          <th className="border border-gray-300 p-2 text-center text-xs sm:text-sm md:px-2 md:py-2" />
        </tr>
      </thead>
      <tbody>
        {requests.map((request, index) => (
          <tr key={index} className="text-xs sm:text-sm">
            <td className="border border-gray-300 p-2 text-center md:px-2 md:py-2">{index + 1}</td>
            <td className="border border-gray-300 p-2 text-xs sm:text-sm md:px-2 md:py-2">{request.name}</td>
            <td className="border border-gray-300 p-2 text-xs sm:text-sm md:px-2 md:py-2">{request.title}</td>
            <td className="border border-gray-300 p-2 text-xs sm:text-sm md:px-2 md:py-2">{request.description}</td>
            <td className="border border-gray-300 p-2 text-center text-xs sm:text-sm md:px-2 md:py-2">
              {formatStatus(request.status)}
            </td>
            <td className="border border-gray-300 p-2 text-center text-xs sm:text-sm md:px-2 md:py-2">
              <div className="flex flex-row justify-center">
                <button
                  type="button"
                  onClick={() => onEditRequest(index)}
                  className="text-blue-500 hover:text-blue-700 m-1"
                >
                  <PencilIcon className="w-5 h-5 sm:w-4 sm:h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveRequest(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-5 h-5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

RequestList.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEditRequest: PropTypes.func.isRequired,
  onRemoveRequest: PropTypes.func.isRequired,
};

export default RequestList;
