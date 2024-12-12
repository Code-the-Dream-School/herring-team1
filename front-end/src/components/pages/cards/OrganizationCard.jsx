import { useEffect, useState } from 'react';
import { FaHeart, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { fetchOrganizations } from '../../../utils/apiReqests';
import { formatServices, formatAddress } from '../../../utils/formatData';
import logoExample from '../../assets/images_default/logo_example.png';

function OrganizationCard() {
  const [organizations, setOrganizations] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrganizations()
      .then((response) => {
        setOrganizations(response.data);
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
        organizations.map((org) => (
          <div key={org.id} className="flex flex-col bg-white border shadow-lg rounded-lg w-full p-4">
            {/* Organization Card Header */}
            <div className="flex items-center justify-between lg:ml-10 mt-1 mb-8">
              {/* Logo */}
              {org.logo ? (
                <div className="lg:w-1/6 xs:w-1/3 md:w-1/4">
                  <img
                    src={logoExample || org.logo}
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
              <FaHeart className="text-2xl text-red-500 lg:mr-10 self-center" />
            </div>

            {/* Info about organization */}
            <div className="text-left lg:ml-10">
              {/* Address */}
              <div className="flex items-top mb-2">
                {org.addresses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                    {org.addresses.map((address, index) => (
                      <div key={index} className="flex items-start">
                        <FaMapMarkerAlt className="mr-3" />
                        <p>{formatAddress(address)}</p>
                      </div>
                    ))}
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
              <div className="mt-4">
                <h2 className="font-bold text-lg">Services:</h2>
                <p>{formatServices(org.org_services)}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrganizationCard;
