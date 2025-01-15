import { useState } from 'react';
import PendingApplicationsList from '../pages/organization/PendingApplicationsList.jsx';
import ApprovedVolunteersList from '../pages/organization/ApprovedVolunteersList.jsx';
import Request from '../pages/organization/Requests.jsx';
import OrganizationForm from '../pages/organization/OrganizationForm.jsx';
import { useGlobal } from '../../context/useGlobal.jsx';

const organizationDashboard = [
  { text: 'Organization information', link: '/organization' },
  { text: 'Requests', link: '/requests' },
  { text: 'Approved Volunteers', link: '/volunteers' },
  { text: 'Pending Volunteers', link: '/applications' },
];

function OrganizationDashboard() {
  const [currentPage, setCurrentPage] = useState('Organization information');
  const { myOrganization } = useGlobal();

  const renderContent = () => {
    switch (currentPage) {
      case 'Organization information':
        return <OrganizationForm />;
      case 'Requests':
        return <Request />;
      case 'Approved Volunteers':
        return <ApprovedVolunteersList />;
      case 'Pending Volunteers':
        return <PendingApplicationsList />;
      default:
        return <div>Select a page from the navigation.</div>;
    }
  };

  const isDisabled = !myOrganization;

  return (
    <div>
      <nav id="nav" className="flex justify-center items-center p-10 mb-4 sm:mb-0 w-full overflow-hidden">
        {organizationDashboard.map((item, index) => (
          <div key={index} className="flex items-center justify-center mb-4 sm:mb-0" style={{ minHeight: '2.5rem' }}>
            <div
              className="flex items-center justify-center min-w-[4rem] sm:min-w-[6rem] md:min-w-[8rem]"
              style={{ minHeight: '2.5rem', maxWidth: '100%', fontSize: '1rem' }}
            >
              <span
                className={`cursor-pointer ${
                  currentPage === item.text ? 'text-purple font-bold' : 'font-normal'
                } text-sm sm:text-base ${isDisabled && item.text !== 'Organization information' ? 'text-gray-400 cursor-not-allowed' : ''}`}
                style={{ textAlign: 'center' }}
                onClick={() => {
                  if (!isDisabled || item.text === 'Organization information') {
                    setCurrentPage(item.text);
                  }
                }}
                title={
                  isDisabled && item.text !== 'Organization information'
                    ? 'Please fill out the organization form first'
                    : ''
                }
              >
                {item.text}
              </span>
            </div>
            {index < organizationDashboard.length - 1 && (
              <div className="border-l border-gray-500 mx-2 sm:mx-3 lg:mx-10 h-6" style={{ height: '30px' }} />
            )}
          </div>
        ))}
      </nav>
      <div className="px-10 lg:mt-10 md:mt-10 sm:py-0 sm:px-10 sm:mt-0">{renderContent()}</div>
    </div>
  );
}

export default OrganizationDashboard;
