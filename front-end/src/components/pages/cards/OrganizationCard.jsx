import logoExample from '../../assets/images_default/logo_example.png';
import { FaHeart, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe } from 'react-icons/fa';

function OrganizationCard() {
  const organizationLogo = null;

  const formData = {
    logo: organizationLogo || logoExample,
    name: 'Habitat for Humanity',
    address: '123 Main St',
    city: 'Springfield',
    state: 'MA',
    zipCode: '01103',
    phone: '413-555-1234',
    email: 'contact@habitat.org',
    website: 'https://habitatforhumanity.org',
  };

  return (
    <div className="p-4">
      <div className="flex flex-col bg-white border shadow-lg rounded-lg w-full p-4">
        {/* First line */}
        <div className="flex items-center justify-between lg:ml-10 mt-5">
          <div className="lg:w-1/6 xs:w-1/3 md:w-1/4">
            <img src={formData.logo} alt={`${formData.name} logo`} className="w-full h-full object-contain" />
          </div>
          <h1 className="font-bold text-lg flex-1 text-center">{formData.name}</h1>
          <FaHeart className="text-2xl text-red-500 lg:mr-10" />
        </div>

        {/* Info about organization */}
        <div className="text-left lg:ml-10 mt-8">
          {/* Address */}
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="mr-2" />
            <p>
              {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
            </p>
          </div>
          {/* Email */}
          <div className="flex items-center mb-2">
            <FaEnvelope className="mr-2" />
            <a href={`mailto:${formData.email}`}>{formData.email}</a>
          </div>
          {/* Website */}
          <div className="flex items-center mb-2">
            <FaGlobe className="mr-2" />
            <a href={formData.website} target="_blank" rel="noopener noreferrer">
              {formData.website}
            </a>
          </div>
          {/* Phone */}
          <div className="flex items-center mb-2">
            <FaPhoneAlt className="mr-2" />
            <p>{formData.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationCard;
