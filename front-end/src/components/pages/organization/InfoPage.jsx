import { useState } from 'react';
import CreateApplication from './modal/applicationForm/CreateApplication.jsx';
import logoExample from '../../assets/images_default/logo_example.png';
import { FaEnvelope, FaGlobe, FaHeart, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

function InfoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstAccordionOpen, setIsFirstAccordionOpen] = useState(true);
  const [isSecondAccordionOpen, setIsSecondAccordionOpen] = useState(false);

  const organizationLogo = null;

  const [formData] = useState({
    logo: organizationLogo || logoExample,
    name: 'Helping Hands',
    address: '123 Main St',
    city: 'Springfield',
    state: 'MA',
    zipCode: '01103',
    phone: '413-555-1234',
    email: 'contact@habitat.org',
    website: 'https://www.habitatspringfield.org/',
    description:
      'Habitat for Humanity is a global nonprofit housing organization working in local communities across all 50 states in the U.S. With the help of volunteers and donors, we build homes for families in need, providing them with affordable housing and the opportunity to break the cycle of poverty.',
    mission:
      'Habitat for Humanity believes every man, woman, and child should have a decent, safe, and affordable place to live. We build and repair houses all over the world using volunteer labor and donations.',
    services: ['Donation Center', 'Clothing Assistance'],
    requestService: 'Clothes donation',
    requestDescription:
      'Help deliver clothing donations to families in need. Volunteers needed for sorting, packing, and delivery to local communities.',
  });

  return (
    <div>
      {/*First Accordion*/}
      <div className="min-h-screen max-w-[80%] mx-auto mt-10">
        <div className="mb-1">
          <div
            onClick={() => setIsFirstAccordionOpen(!isFirstAccordionOpen)}
            className="bg-gray-200 p-3 cursor-pointer font-semibold flex justify-between items-center"
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
                  <img src={formData.logo} alt={`${formData.name} logo`} className="w-full h-full object-contain" />
                </div>
                <h1 className="font-bold text-lg flex-1 text-center">{formData.name}</h1>
                <FaHeart className="text-2xl text-red-500 lg:mr-10" />
              </div>
              <div className="mb-3 lg:ml-10">
                <div className="flex items-center mb-2">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>
                    {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <FaPhoneAlt className="mr-2" />
                  <span>{formData.phone}</span>
                </div>
                <div className="flex items-center mb-2">
                  <FaEnvelope className="mr-2" />
                  <a href={`mailto:${formData.email}`}>{formData.email}</a>
                </div>
                <div className="flex items-center mb-2">
                  <FaGlobe className="mr-2" />
                  <a href={formData.website} target="_blank" rel="noopener noreferrer">
                    {formData.website}
                  </a>
                </div>
                <div className="mb-2">
                  <strong>Description:</strong>
                  <p>{formData.description}</p>
                </div>
                <div className="mb-2">
                  <strong>Services:</strong>
                  <p>{formData.services.join(', ')}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Second Accordion */}
        <div className="my-10 ">
          <div
            onClick={() => setIsSecondAccordionOpen(!isSecondAccordionOpen)}
            className="bg-gray-200 p-3 cursor-pointer font-semibold flex justify-between items-center"
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
                  <span>{formData.requestService}</span>
                </div>
                <div className="mb-2">
                  <strong>Description: </strong>
                  <span>{formData.requestDescription}</span>
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
