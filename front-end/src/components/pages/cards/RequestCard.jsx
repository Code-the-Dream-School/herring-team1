import PropTypes from 'prop-types';
import CreateApplication from '../organization/modal/applicationForm/CreateApplication.jsx';
import { formatStatus, getStatusColor } from '../../../utils/formatData';
import { formatService } from '../../../utils/FormatServices.jsx';

function RequestCard({ request }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <strong>Request:</strong>
        <span>{request.title}</span>
        <span className={`px-2 py-1 text-sm rounded-full ${getStatusColor(request.status)}`}>
          {formatStatus(request.status)}
        </span>
      </div>
      <div className="mb-2">
        <strong className="mr-2">Description: </strong>
        <span>{request.description}</span>
      </div>
      <div className="flex items-center">
        <strong className="mr-3">Service:</strong>
        <span>{formatService(request.name)}</span>
      </div>
      {/* "I want to help" Button */}
      <div className="flex justify-end">
        <CreateApplication requestId={request.id} status={request.status} />
      </div>
    </div>
  );
}

RequestCard.propTypes = {
  request: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default RequestCard;
