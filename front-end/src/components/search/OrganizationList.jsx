import PropTypes from 'prop-types';

const OrganizationList = ({ organizations, toggleFavorite, handleCardClick, favorites }) => {
  console.log('Rendering OrganizationList with organizations:', organizations);

  if (!organizations || organizations.length === 0) {
    return <div>No organizations found.</div>;
  }

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
            {org.logo && (
              <img
                src={org.logo || 'https://via.placeholder.com/100?text=Logo'}
                alt={`${org.name} logo`}
                className="w-16 h-16 object-cover rounded-full mb-2"
              />
            )}
            {console.log('Logo:', org.logo)}

            {/* Description */}
            <p className="truncate max-w-xs" title={org.description}>
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
              <h4 className="font-semibold text-sm">Services:</h4>
              {org.services && org.services.length > 0 ? (
                <div>
                  {org.services.map((service, index) => (
                    <span key={index} className="bg-purple-300 text-purple-800 px-3 py-1 rounded-full text-sm mr-2">
                      {service}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No services available.</p>
              )}
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
      requests: PropTypes.arrayOf(PropTypes.string),
      services: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default OrganizationList;
