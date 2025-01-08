import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';
import { formatStatus } from '../../../utils/formatData';

function RequestList({ requests, onEditRequest, onRemoveRequest }) {
  return (
    <table className="table-auto w-full border-collapse border border-gray-300 mx-auto">
      <thead>
        <tr className="bg-light_purple">
          <th className="border border-gray-300 p-2 text-center text-xs sm:text-sm w-10">#</th>
          <th className="border border-gray-300 p-2 text-center text-xs sm:text-sm w-1/4">Title</th>
          <th className="border border-gray-300 p-2 text-center text-xs sm:text-sm w-1/2">Description</th>
          <th className="border border-gray-300 p-2 text-center text-xs sm:text-sm w-1/6">Service</th>
          <th className="border border-gray-300 p-2 text-center text-xs sm:text-sm w-20">Status</th>
          <th className="border border-gray-300 p-2 text-center text-xs sm:text-sm w-20" />
        </tr>
      </thead>
      <tbody>
        {requests.map((request, index) => (
          <tr key={index} className="text-xs sm:text-sm">
            <td className="border border-gray-300 p-2 text-center w-10">{index + 1}</td>
            <td className="border border-gray-300 p-2 w-1/4 break-words">{request.title}</td>
            <td className="border border-gray-300 p-2 w-1/2 break-words">{request.description}</td>
            <td className="border border-gray-300 p-2 w-1/6 break-words">{request.name}</td>
            <td className="border border-gray-300 p-2 text-center w-20 break-words">{formatStatus(request.status)}</td>
            <td className="border border-gray-300 p-2 text-center w-20">
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
