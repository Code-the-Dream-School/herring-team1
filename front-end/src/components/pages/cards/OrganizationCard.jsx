import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { fetchOrganizations } from '../../../utils/apiReqests';
import logoExample from '../../assets/images_default/logo_example.jpg';
import formatServices from '../../../utils/FormatServices.jsx';

function OrganizationCard() {
  const [organizations, setOrganizations] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id) ? prevFavorites.filter((favId) => favId !== id) : [...prevFavorites, id]
    );
  };

  useEffect(() => {
    fetchOrganizations()
      .then((response) => {
        setOrganizations(response.organizations);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching organizations:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Organization details */}
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        /* eslint-disable-next-line react/jsx-no-useless-fragment */
        <>
          {Array.isArray(organizations) && organizations.length > 0
            ? organizations.map((org) => (
                <div key={org.id} className="flex flex-col bg-white border shadow-lg rounded-lg w-full p-4">
                  {/* Organization Card Header */}
                  <div className="flex items-center justify-between lg:ml-10 mt-1 mb-8">
                    {/* Logo */}
                    {org.logo ? (
                      <div className="lg:w-1/6 xs:w-1/3 md:w-1/4">
                        <img
                          src={org?.logo.url || logoExample}
                          alt={`${org.name || 'Unknown Organization'} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 self-center">
                        LOGO
                      </div>
                    )}
                    <h1 className="font-bold text-lg flex-1 text-center self-center">{org.name}</h1>
                    {/* Heart Icon for Favorites - status to be implemented */}
                    <div key={org.id} className="p-4 relative">
                      <button
                        onClick={() => toggleFavorite(org.id)}
                        className="top-4 right-4 text-red-500 hover:text-red-600"
                      >
                        {favorites.includes(org.id) ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                          >
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
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.35l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Info about organization */}
                  <div className="text-left lg:ml-10">
                    {/* Address */}
                    <div className="flex items-top mb-2">
                      {org.address ? (
                        <div className="flex items-start">
                          <FaMapMarkerAlt className="mr-3" />
                          <div>
                            {org.address.street}, {org.address.city}, {org.address.state} {org.address.zip_code}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-2" />
                          <p className="text-gray-400">&nbsp;</p>
                        </div>
                      )}
                    </div>
                    {/* Email */}
                    <div className="flex items-center mb-2">
                      <FaEnvelope className="mr-2" />
                      <a href={`mailto:${org.email}`}>{org.email}</a>
                    </div>
                    {/* Website */}
                    <div className="flex items-center mb-2">
                      <FaGlobe className="mr-2" />
                      <a href={org.website || '#'} target="_blank" rel="noopener noreferrer">
                        {org.website || ''}
                      </a>
                    </div>
                    {/* Phone */}
                    <div className="flex items-center mb-2">
                      <FaPhoneAlt className="mr-2" />
                      <p>{org.phone || ''}</p>
                    </div>
                    <div className="mt-3">
                      <h2 className="font-bold text-md">Services:</h2>
                      <p>{formatServices(org.org_services)}</p>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </>
      )}
    </div>
  );
}

export default OrganizationCard;
