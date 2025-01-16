import { useEffect, useState } from 'react';
import { getMyApplications, deleteVolunteerApplication } from '../../../utils/apiReqests';
import { useGlobal } from '../.././../context/useGlobal.jsx';
import { useNavigate } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/solid';
import { ToastContainer, toast } from 'react-toastify';

function MyApplications() {
  const [myApplication, setMyApplication] = useState(null);
  const { volunteer } = useGlobal();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyApplications(volunteer.id);
        console.log('Fetched applications:', response.applications);
        setMyApplication(response.applications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchData();
  }, [volunteer.id]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { day: 'numeric', month: '2-digit', year: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleCardClick = (id) => {
    navigate(`/organizations/${id}`);
  };

  // const handleEditClick = (applicationId) => {
  //   console.log(`Edit ${applicationId}`);
  //   // updateVolunteerApplication(values, volunteerId, requestId, appId);
  // };

  const handleDeleteClick = (applicationId) => {
    setAppToDelete(applicationId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteVolunteerApplication(volunteer.id, appToDelete);
      setMyApplication((prevApplications) => prevApplications.filter((app) => app.id !== appToDelete));
      setIsModalOpen(false);
      toast.success('Application deleted successfully');
    } catch (error) {
      console.error('Error deleting application:', error);
      toast.success('Failed to delete the application');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-20">
      <h2 className="text-lg font-bold mb-4">My Applications</h2>
      {myApplication && myApplication.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">When Applied</th>
              <th className="border border-gray-300 px-4 py-2">Organization</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {myApplication.map((app, index) => (
              <tr key={app.id} className="hover:bg-gray-100 text-sm">
                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{app.request.title}</td>
                <td className="border border-gray-300 px-4 py-2">{app.request.description}</td>
                <td className="border border-gray-300 px-4 py-2">{app.application_status}</td>
                <td className="border border-gray-300 px-4 py-2">{formatDate(app.created_at)}</td>
                <td
                  className="border border-gray-300 px-4 py-2 text-blue-500 underline cursor-pointer"
                  onClick={() => handleCardClick(app.request.organization_id)}
                >
                  Go to org profile
                </td>
                <td className="border border-gray-300 px-4 py-2 items-center">
                  {/* <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700 m-1"
                    onClick={() => handleEditClick(app.id)}
                  >
                    <PencilIcon className="w-5 h-5 sm:w-4 sm:h-4" />
                  </button> */}
                  {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                      <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p>Are you sure you want to delete this application?</p>
                        <div className="mt-4 flex justify-end space-x-4">
                          <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={handleCloseModal}>
                            Cancel
                          </button>
                          <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleConfirmDelete}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteClick(app.id)}
                  >
                    <TrashIcon className="w-5 h-5 sm:w-4 sm:h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No applications found.</p>
      )}
      <ToastContainer />
    </div>
  );
}

export default MyApplications;
