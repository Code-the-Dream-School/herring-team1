import { useEffect, useState } from 'react';
import { getOrgApplications } from '../../../utils/apiReqests';
import { useGlobal } from '../../../context/useGlobal.jsx';
import { useNavigate } from 'react-router-dom';

function Application() {
  const [orgApplications, setOrgApplications] = useState([]);
  const { myOrganization } = useGlobal();
  console.log(myOrganization);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrgApplications(myOrganization.id);
        console.log('Fetched applications:', response);
        setOrgApplications(response);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchData();
  }, [myOrganization]);

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
      {orgApplications && orgApplications.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">When Applied</th>
              <th className="border border-gray-300 px-4 py-2">Organization</th>
            </tr>
          </thead>
          <tbody>
            {orgApplications.map((app, index) => (
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

export default Application;
