import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrganizationById } from '../../../utils/apiReqests';
import CreateApplication from './modal/applicationForm/CreateApplication.jsx';
import logoExample from '../../assets/images_default/logo_example.png';
import { FaEnvelope, FaGlobe, FaHeart, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

function InfoPage() {
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstAccordionOpen, setIsFirstAccordionOpen] = useState(true);
  const [isSecondAccordionOpen, setIsSecondAccordionOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const data = await getOrganizationById(id);
        setOrganization(data.organization);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [id]);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id) ? prevFavorites.filter((favId) => favId !== id) : [...prevFavorites, id]
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!organization) {
    return <div>No organization found.</div>;
  }

  return (
    <div>
      {/*First Accordion*/}
      <div className="min-h-screen max-w-[80%] mx-auto mt-10">
        <div className="mb-1">
          <div
            onClick={() => setIsFirstAccordionOpen(!isFirstAccordionOpen)}
            className="bg-light_purple p-3 cursor-pointer font-semibold flex justify-between items-center"
          >
            <h2 className="m-2 text-center">Company information:</h2>
            <span
              data-accordion-shape={isFirstAccordionOpen ? 'open' : 'closed'}
              className="w-6 h-6 flex items-center justify-center"
            >
              {isFirstAccordionOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <polyline points="6 15 12 9 18 15" />
                </svg>
              )}
            </span>
          </div>
          {isFirstAccordionOpen && (
            <div className="md:mt-6 mb-4 ">
              {/* First line */}
              <div className="flex items-center justify-between lg:ml-10 mt-5 mb-5">
                <div className="lg:w-20 xs:w-16 md:w-18">
                  <img
                    src={organization.logo || logoExample}
                    alt={`${organization.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="font-bold text-lg flex-1 text-center">{organization.name}</h1>
                <FaHeart
                  className={`text-2xl lg:mr-10 ${favorites.includes(organization.id) ? 'text-red-600' : 'text-red-200'}`}
                  onClick={() => toggleFavorite(organization.id)}
                />
              </div>
              <div className="mb-3 lg:ml-10">
                <div className="flex items-center mb-2">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>
                    {organization.address.street}, {organization.address.city}, {organization.address.state}{' '}
                    {organization.address.zip_code}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <FaPhoneAlt className="mr-2" />
                  <span>{organization.phone}</span>
                </div>
                <div className="flex items-center mb-2">
                  <FaEnvelope className="mr-2" />
                  <a href={`mailto:${organization.email}`}>{organization.email}</a>
                </div>
                <div className="flex items-center mb-2">
                  <FaGlobe className="mr-2" />
                  <a href={organization.website} target="_blank" rel="noopener noreferrer">
                    {organization.website}
                  </a>
                </div>
                <div className="mb-2">
                  <strong>Description:</strong>
                  <p>{organization.description}</p>
                </div>
                <div className="mb-2">
                  <strong>Mission:</strong>
                  <p>{organization.mission}</p>
                </div>
                <div className="mb-2">
                  <strong>Services:</strong>
                  <p>{organization.org_services.map((service) => service.name).join(', ')}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Second Accordion */}
        <div className="my-10 ">
          <div
            onClick={() => setIsSecondAccordionOpen(!isSecondAccordionOpen)}
            className="bg-light_purple p-3 cursor-pointer font-semibold flex justify-between items-center"
          >
            <h2 className="my-2 text-center">Requests:</h2>
            <span
              data-accordion-shape={isSecondAccordionOpen ? 'open' : 'closed'}
              className="w-6 h-6 flex items-center justify-center"
            >
              {isSecondAccordionOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <polyline points="6 15 12 9 18 15" />
                </svg>
              )}
            </span>
          </div>
          {isSecondAccordionOpen && (
            <div className="md:mt-3 lg:ml-10 flex flex-col md:flex-row md:items-start pt-3">
              <div className="flex-1 ">
                <div className="mb-2">
                  <strong>Request: </strong>
                  <span>
                    {organization.requests && organization.requests.length > 0
                      ? organization.requests.map((request) => request.title).join(', ')
                      : 'No requests available.'}
                  </span>
                </div>
                <div className="mb-2">
                  <strong>Description: </strong>
                  <span>
                    {organization.requests && organization.requests.length > 0
                      ? organization.requests.map((request) => request.description).join(', ')
                      : 'No requests available.'}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-4">
                {/* Button to open the application modal */}
                <CreateApplication isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoPage;
