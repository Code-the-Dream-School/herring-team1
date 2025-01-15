import { useEffect, useState } from 'react';
import { getOrgApplications } from '../../../utils/apiReqests';
import { useGlobal } from '../../../context/useGlobal.jsx';
import VolunteerApplicationCard from '../cards/VolunteerApplicationCard.jsx';

function PendingApplicationsList() {
  const [orgApplications, setOrgApplications] = useState([]);
  const { myOrganization } = useGlobal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrgApplications(myOrganization.id, 'pending');
        setOrgApplications(response.applications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchData();
  }, [myOrganization]);

  return (
    <div className="mt-20">
      <h2 className="text-lg font-bold mb-4">Volunteer Applications</h2>
      {orgApplications && orgApplications.length > 0 ? (
        <div className="bg-beige p-6">
          {orgApplications.map((application) => (
            <VolunteerApplicationCard key={application.id} application={application} />
          ))}
        </div>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
}

export default PendingApplicationsList;
