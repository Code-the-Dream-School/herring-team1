import logoExample from '../../assets/images_default/logo_example.png';

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
      <div className="flex flex-col bg-white border shadow-lg rounded-lg w-full p-4 mr-4">
        <div className="flex items-center justify-between">
          <div className="w-1/4 ">
            <img src={formData.logo} alt={`${formData.name} logo`} />
          </div>
          <h3 className="font-bold text-lg flex-1 text-center">{formData.name}</h3>
          <p>Icon</p>
        </div>

        <div className="mt-4 text-left">
          <p>
            {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
          </p>
          <p>
            <a href={`mailto:${formData.email}`}>{formData.email}</a>
          </p>
          <p>
            <a href={formData.website} target="_blank" rel="noopener noreferrer">
              {formData.website}
            </a>
          </p>
          <p>Phone: {formData.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default OrganizationCard;
