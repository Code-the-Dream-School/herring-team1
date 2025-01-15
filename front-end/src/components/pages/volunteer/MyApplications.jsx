import { useEffect, useState } from 'react';
import { getMyApplications } from '../../../utils/apiReqests';
import { useGlobal } from '../.././../context/useGlobal.jsx';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

function MyApplications() {
  const [myApplication, setMyApplication] = useState(null);
  const { volunteer } = useGlobal();
  const navigate = useNavigate();

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
                <td className="flex flex-row justify-around items-center">
                  <button type="button" className="text-blue-500 hover:text-blue-700 m-1">
                    <PencilIcon className="w-5 h-5 sm:w-4 sm:h-4" />
                  </button>
                  <button type="button" className="text-red-500 hover:text-red-700">
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
    </div>
  );
}

export default MyApplications;
