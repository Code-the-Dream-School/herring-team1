import { useState } from 'react';

import InfoPage from '../pages/organization/InfoPage.jsx';
import Application from '../pages/organization/Application.jsx';
import ApprovedVolunteer from '../pages/organization/ApprovedVolunteer.jsx';
import Request from '../pages/organization/Requests.jsx';

const organizationDashboard = [
  { text: 'Organization information', link: '/organization' },
  { text: 'Requests', link: '/requests' },
  { text: 'Approved Volunteers', link: '/volunteers' },
  { text: 'Pending Volunteers', link: '/applications' },
];

function OrganizationDashboard() {
  const [currentPage, setCurrentPage] = useState('Organization information');

  const renderContent = () => {
    switch (currentPage) {
      case 'Organization information':
        return <InfoPage />;
      case 'Requests':
        return <Request />;
      case 'Approved Volunteers':
        return <ApprovedVolunteer />;
      case 'Pending Volunteers':
        return <Application />;
      default:
        return <div>Select a page from the navigation.</div>;
    }
  };

  return (
    <div>
      <nav id="nav" className="flex justify-center items-center space-x-0 p-10">
        {organizationDashboard.map((item, index) => (
          <div key={index} className="flex items-center justify-center">
            <div className="flex items-center justify-center" style={{ minHeight: '40px', minWidth: '250px' }}>
              <span
                className={`cursor-pointer ${currentPage === item.text ? 'text-purple font-bold' : 'font-normal'}`}
                style={{ textAlign: 'center' }}
                onClick={() => setCurrentPage(item.text)}
              >
                {item.text}
              </span>
            </div>
            {index < organizationDashboard.length - 1 && (
              <div className="border-l border-gray-500 mx-4" style={{ height: '30px' }} />
            )}
          </div>
        ))}
      </nav>
      <div className="p-10">{renderContent()}</div>
    </div>
  );
}

export default OrganizationDashboard;
