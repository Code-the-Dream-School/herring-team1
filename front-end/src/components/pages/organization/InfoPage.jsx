import { useEffect, useState } from 'react'; //, useRef
import { useParams } from 'react-router-dom';
import RequestCard from '../cards/RequestCard.jsx';
import logoExample from '../../assets/images_default/logo_example.jpg';
import { FaEnvelope, FaGlobe, FaHeart, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { fetchMyOrgRequests, getOneOrganizationById } from '../../../utils/apiReqests';
import formatServices from '../../../utils/FormatServices.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function InfoPage() {
  const { id } = useParams();
  const [organization, setOrganization] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [services, setServices] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestsError, setRequestsError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const [isFirstAccordionOpen, setIsFirstAccordionOpen] = useState(true);
  const [isSecondAccordionOpen, setIsSecondAccordionOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOneOrganizationById(id);

        if (!response) {
          console.error('Error fetching organization:', error);
          toast.error(error.message || 'Organization not found.');
          setError(error.message || 'Organization not found.');
          setLoading(false);
          return;
        }
        setOrganization(response.organization);

        const orgServices = response.organization.org_services || [];
        setServices(orgServices);

        if (orgServices.length > 0) {
          try {
            setRequestsLoading(true);
            const reqResponse = await fetchMyOrgRequests(id);

            if (reqResponse) {
              const requests = Array.isArray(reqResponse) ? reqResponse : Object.values(reqResponse);
              setRequests(requests);
              setIsSecondAccordionOpen(false);
            } else {
              setRequests([]);
              toast.warning('No requests found for this organization.');
              setIsSecondAccordionOpen(true);
            }
          } catch (error) {
            if (error.response && error.response.status === 404) {
              setRequests([]); // Set [] even if there's an error
              setRequestsError(error.message);
              setIsSecondAccordionOpen(true);
              toast.warning('No requests found for this organization.');
            } else {
              setRequestsError(error.message);
              toast.error('Failed to fetch requests.');
            }
          } finally {
            setRequestsLoading(false);
          }
        } else {
          setRequests([]); // No services, so no requests
          toast.warning('This organization does not have any services. Requests cannot be found.');
          setRequestsLoading(false);
          setIsSecondAccordionOpen(true);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching organization:', error);
        toast.error(error.message || 'Organization not found.');
        setError(error.message || 'Organization not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, error]);

  if (!organization || Object.keys(organization).length === 0) {
    return <div>No organization data available.</div>;
  }

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id) ? prevFavorites.filter((favId) => favId !== id) : [...prevFavorites, id]
    );
  };

  return (
    <div>
      {/* ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* First Accordion - Organization details */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold">Error: {error.message}</p>
      ) : (
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
              <div key={organization.id} className="md:mt-6 mb-4">
                {/* First line */}
                <div className="flex items-center justify-between lg:ml-7 mt-5 mb-5">
                  <div className="lg:w-20 xs:w-16 md:w-18">
                    <img
                      src={organization?.logo.url || logoExample}
                      alt={`${organization?.name || 'Organization'} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h1 className="font-bold text-lg flex-1 text-center">{organization?.name}</h1>
                  <FaHeart
                    className={`text-2xl lg:mr-10 ${favorites.includes(organization.id) ? 'text-red-600' : 'text-red-200'}`}
                    onClick={() => toggleFavorite(organization.id)}
                  />
                </div>
                <div className="mb-3 lg:ml-7">
                  <div className="flex items-center mb-2">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>
                      {organization?.address?.street}, {organization?.address?.city}, {organization?.address?.state},{' '}
                      {organization?.address?.zip_code}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaPhoneAlt className="mr-2" />
                    <span>{organization?.phone}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaEnvelope className="mr-2" />
                    <a href={`mailto:${organization?.email}`}>{organization?.email}</a>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaGlobe className="mr-2" />
                    <a href={organization?.website} target="_blank" rel="noopener noreferrer">
                      {organization?.website}
                    </a>
                  </div>
                  <div className="mb-2">
                    <strong>Description:</strong>
                    <div>{organization?.description}</div>
                  </div>
                  <div className="mb-2 text-left">
                    <strong>Services:</strong>
                    <div>{formatServices(organization?.org_services)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Second Accordion - Requests */}
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
                    viewBox="0 24 24"
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
              /* eslint-disable-next-line react/jsx-no-useless-fragment */
              <>
                {requestsLoading ? (
                  <p className="text-center">Loading...</p>
                ) : requestsError ? (
                  <p className="text-center text-red-500 font-semibold"> Error: {requestsError}</p>
                ) : (
                  <div className="md:mt-3 flex md:flex-row md:items-start pt-3">
                    <div className="flex-1">
                      {Array.isArray(requests) && requests.length > 0 ? (
                        requests.map((request) => (
                          <div key={request.id} className="flex items-start mb-4">
                            {/* Request Card */}
                            <div className="flex-1">
                              <RequestCard request={request} />
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="my-3">No requests added yet.</p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoPage;
