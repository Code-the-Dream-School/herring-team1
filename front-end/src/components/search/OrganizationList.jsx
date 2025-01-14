//This component displays a list of organizations. It takes in an array of organizations and renders a card for each organization.
//  The card displays the organization's name, logo, description, request, and services. The user can click on the card to view more details about the organization.
//  The user can also click on the heart icon to add or remove the organization from their favorites list.
import PropTypes from 'prop-types';
import { servicesMap } from '../../data/services.jsx';

const OrganizationList = ({ organizations, toggleFavorite, handleCardClick, favorites }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {organizations.map((org) => (
        <div key={org.id} className="bg-white p-4 rounded-lg shadow-lg relative">
          {/* Add to Favs */}
          <button
            onClick={() => toggleFavorite(org.id)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-600"
          >
            {favorites.includes(org.id) ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            )}
          </button>

          <div className="cursor-pointer" onClick={() => handleCardClick(org.id)}>
            <h3 className="font-semibold text-xl">{org.name}</h3>

            {/* Logo */}
            <div className="flex justify-center">
              {org.logo?.url ? (
                <img src={org.logo.url} alt={`Organization logo`} className="w-16 h-16 object-cover rounded-full" />
              ) : (
                <img
                  src="src/components/assets/images_default/logo_example.jpg" // Укажите путь к вашему дефолтному изображению
                  alt="Default logo"
                  className="w-16 h-16 object-cover rounded-full"
                />
              )}
            </div>

            {/* Description */}
            <p className="truncate max-w-xs pt-4" title={org.description}>
              {org.description}
            </p>

            {/* Requests */}
            <div className="mt-4">
              <h4 className="font-semibold text-sm">Requests:</h4>
              {org.requests && org.requests.length > 0 ? (
                <ul>
                  {org.requests.map((request, index) => (
                    <li key={index} className="text-sm">
                      {request}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No requests available.</p>
              )}
            </div>

            {/* Services */}
            <div className="mt-4">
              <div className="flex items-center">
                <h4 className="font-semibold text-sm mr-2">Services:</h4>
                <div className="flex flex-wrap">
                  {org.org_services && org.org_services.length > 0 ? (
                    org.org_services.map((service, index) => {
                      const serviceIcon = servicesMap.find((s) => s.label === service.name)?.icon;
                      return (
                        <span key={index} className="flex items-center mr-2 mb-2">
                          {serviceIcon}
                        </span>
                      );
                    })
                  ) : (
                    <p className="text-sm text-gray-500">No services available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

OrganizationList.propTypes = {
  organizations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      logo: PropTypes.string,
      description: PropTypes.string,
      request: PropTypes.string,
      services: PropTypes.string,
    })
  ).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default OrganizationList;
