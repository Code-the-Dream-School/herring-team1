import { useState, useEffect, useRef } from 'react';
import CreateRequest from './modal/requestForm/CreateRequest.jsx';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import RequestList from './RequestList.jsx';
import { fetchMyOrgRequests, deleteRequest } from '../../../utils/apiReqests';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGlobal } from '../../../context/GlobalProvider.jsx';

function Request() {
  const [requests, setRequests] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);
  const { myOrganization } = useGlobal();

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchData = async () => {
      try {
        const services = myOrganization.org_services || [];
        setServices(services);

        // Fetch requests using the organization_id
        if (services && services.length > 0) {
          const reqResponse = await fetchMyOrgRequests(myOrganization.id);
          console.log('!!reqResponse', reqResponse);
          if (reqResponse && Array.isArray(reqResponse) && reqResponse.length > 0) {
            setRequests(reqResponse);
          } else {
            setRequests([]);
            toast.warning('No requests found for this organization.');
          }
        } else {
          setRequests([]);
          // console.warn('No services available for this organization.');
          toast.warning('This organization does not have any services. Requests cannot be found.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleRemoveRequest = async (index) => {
    const { id } = requests[index];

    try {
      const response = await deleteRequest(id, myOrganization.id);
      if (response && response.message === 'Request successfully deleted') {
        setRequests((prevRequests) => prevRequests.filter((_, i) => i !== index));
        toast.success('Request deleted successfully!');
      } else {
        toast.error('Failed to delete the request.');
      }
    } catch (error) {
      console.error('Error during deletion:', error.message);
      toast.error('An error occurred while deleting the request.');
    }
  };

  return (
    <div>
      {/* ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 className="font-bold text-center text-gray-800 sm:text-lg md:text-xl lg:text-2xl mb-1 hidden">My Requests</h1>
      <div className=" flex flex-col items-center ">
        <div className="flex flex-col sm:flex-row w-full sm:justify-between gap-4">
          {/* Search Section - to be implemented*/}
          <div className="relative w-full sm:w-2/3 justify-center items-center">
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
            services={services}
            orgId={myOrganization.id}
          />
        </div>
      </div>

      {/* Display the list of requests */}
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="requests-list mt-3">
          {Array.isArray(requests) && requests.length > 0 ? (
            <RequestList requests={requests} onEditRequest={handleEditRequest} onRemoveRequest={handleRemoveRequest} />
          ) : (
            <p className="my-3">No requests added yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Request;
