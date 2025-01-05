import { useEffect, useState } from 'react'; //, useRef
import { useParams } from 'react-router-dom';
import RequestCard from '../cards/RequestCard.jsx';
import logoExample from '../../assets/images_default/logo_example.png';
import { FaEnvelope, FaGlobe, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { getMyOrgRequests, getOneOrganizationById } from '../../../utils/apiReqests';
import formatServices from '../../../utils/FormatServices.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function InfoPage() {
  const { id } = useParams();
  const [org, setOrg] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [services, setServices] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestsError, setRequestsError] = useState(null);

  const [isFirstAccordionOpen, setIsFirstAccordionOpen] = useState(true);
  const [isSecondAccordionOpen, setIsSecondAccordionOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOneOrganizationById(id);
        console.log('response', response);

        if (!response) {
          console.error('Error fetching organization:', error);
          toast.error(error.message || 'Organization not found.');
          setError(error.message || 'Organization not found.');
          setLoading(false);
          return;
        }
        setOrg(response.organization);

        const orgServices = response.organization.org_services || [];
        setServices(orgServices);

        if (orgServices.length > 0) {
          try {
            setRequestsLoading(true);
            const reqResponse = await getMyOrgRequests(id);
            console.log('reqResponse', reqResponse);
            if (reqResponse.data) {
              const requests = Array.isArray(reqResponse.data) ? reqResponse.data : Object.values(reqResponse.data);
              console.log('reqResponse data', reqResponse.data);
              setRequests(requests || []);
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

  if (!org || Object.keys(org).length === 0) {
    return <div>No organization data available.</div>;
  }

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
      {/*First Accordion - Organization details*/}
      {isLoading ? (
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
              <div key={org.id} className="md:mt-6 mb-4">
                {/* First line */}
                <div className="flex items-center justify-between lg:ml-7 mt-5 mb-5">
                  <div className="lg:w-20 xs:w-16 md:w-18">
                    <img
                      src={org?.logo || logoExample}
                      alt={`${org?.name || 'Organization'} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h1 className="font-bold text-lg flex-1 text-center">{org?.name}</h1>
                  {/*<FaHeart className="text-2xl text-red-500 lg:mr-10" />*/}
                </div>
                <div className="mb-3 lg:ml-7">
                  <div className="flex items-center mb-2">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>
                      {org?.address?.street}, {org?.address?.city}, {org?.address?.state} {org?.address?.zipCode}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaPhoneAlt className="mr-2" />
                    <span>{org?.phone}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaEnvelope className="mr-2" />
                    <a href={`mailto:${org?.email}`}>{org?.email}</a>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaGlobe className="mr-2" />
                    <a href={org?.website} target="_blank" rel="noopener noreferrer">
                      {org?.website}
                    </a>
                  </div>
                  <div className="mb-2">
                    <strong>Description:</strong>
                    <div>{org?.description}</div>
                  </div>
                  <div className="mb-2 text-left">
                    <strong>Services:</strong>
                    <div>{formatServices(org?.org_services)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Second Accordion - Requests*/}
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
              /* eslint-disable-next-line react/jsx-no-useless-fragment */
              <>
                {requestsLoading ? (
                  <p className="text-center">Loading...</p>
                ) : requestsError ? (
                  <p className="text-center text-red-500 font-semibold"> Error: {requestsError}</p>
                ) : (
                  <div className="md:mt-3 flex md:flex-row md:items-start pt-3">
                    <div className="flex-1">
                      {/*{console.log('requests', requests)}*/}
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
