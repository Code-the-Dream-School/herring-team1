import { useState } from 'react';
import CreateRequest from './modal/requestForm/CreateRequest.jsx';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import RequestList from './RequestList.jsx';

function Request() {
  const [requests, setRequests] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSaveRequest = (newRequest) => {
    if (editingIndex !== null) {
      // update the existing request if editing
      setRequests((prevRequests) =>
        prevRequests.map((request, index) => (index === editingIndex ? newRequest : request))
      );
    } else {
      // add a new request
      setRequests((prevRequests) => [...prevRequests, newRequest]);
    }
    setEditingIndex(null);
  };

  const handleEditRequest = (index) => {
    setEditingIndex(index);
  };

  const handleRemoveRequest = (index) => {
    setRequests((prevRequests) => prevRequests.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1 className="font-bold text-center text-gray-800 sm:text-lg md:text-xl lg:text-2xl mb-4">My Requests</h1>
      <div className=" flex flex-col items-center ">
        <div className="flex flex-col sm:flex-row w-full sm:justify-between gap-4">
          {/* Search Section - to be implemented*/}
          <div className="relative w-full sm:w-2/3 bg-light_purple justify-center items-center">
            <div className="relative p-2">
              <input
                type="text"
                placeholder="Search status"
                className="p-1 pl-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          {/* Button to open the modal */}
          <CreateRequest
            onSave={handleSaveRequest}
            editingIndex={editingIndex}
            requests={requests}
            onEditRequest={handleEditRequest}
          />
        </div>
      </div>

      {/* Display the list of requests */}
      <div className="requests-list mt-3">
        {requests.length > 0 ? (
          <RequestList requests={requests} onEditRequest={handleEditRequest} onRemoveRequest={handleRemoveRequest} />
        ) : (
          <p className="my-3">No requests added yet.</p>
        )}
      </div>
    </div>
  );
}

export default Request;
