import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import homecareIcon from '../../../assets/homecare.png';
import advocacyIcon from '../../../assets/advocacy.png';
import craftIcon from '../../../assets/craft.png';
import educationIcon from '../../../assets/education.png';

function OrganizationForm() {
  const navigate = useNavigate();

  function ServicesCheckbox() {
    const services = [
      { name: 'Homecare', icon: homecareIcon },
      { name: 'Education', icon: educationIcon },
      { name: 'Advocacy', icon: advocacyIcon },
      { name: 'Craft', icon: craftIcon },
    ];

    const [selectedServices, setSelectedServices] = useState([]);
    const toggleService = (service) => {
      setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]));
    };

    return (
      <div>
        <label htmlFor="services" className="block text-gray-800 text-small mb-1">
          Services
        </label>
        <div className="flex flex-wrap justify-left gap-4">
          {services.map(({ name, icon }) => (
            <div
              key={name}
              onClick={() => toggleService(name)}
              className="flex items-center justify-center cursor-pointer"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full  transform hover:scale-110 transition-all duration-300 ease-in-out ${
                  selectedServices.includes(name) ? 'bg-orangeButton' : 'bg-background'
                }`}
              >
                <img src={icon} alt={name} className="w-8 h-8 object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-background rounded-lg">
      <p className="text-gray-900 text-sm mb-8 md:text-md xl:text-lg">
        Let volunteers know more about your organization &#39;s mission and primary cause areas to help them connect
        with you.
      </p>

      <form className="grid gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-800 text-small">
                Organization name
              </label>
              <input
                type="text"
                id="name"
                className="w-full text-sm border-gray-300 border rounded-lg p-2 shadow-md"
                placeholder="enter organization name"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-800 text-small">
                Street address
              </label>
              <input
                type="text"
                id="address"
                className="w-full text-sm border-gray-300 border rounded-lg p-2 shadow-md"
                placeholder="enter address"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-gray-800 text-small">
                City
              </label>
              <input
                type="text"
                id="city"
                className="w-full text-sm border-gray-300 border rounded-lg shadow-md p-2"
                placeholder="enter city"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="state" className="block text-gray-800 text-small mb-1">
                  State
                </label>
                <select
                  id="state"
                  className="w-full text-sm bg-white border-gray-300 border rounded-lg shadow-md p-2"
                />
              </div>
              <div>
                <label htmlFor="zipcode" className="w-full text-gray-800 text-small">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipcode"
                  className="w-full border-gray-300 text-sm border rounded-lg shadow-md p-2"
                  placeholder="enter zip code"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-800 text-small">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                className="w-full text-sm border-gray-300 border rounded-lg shadow-md p-2"
                placeholder="enter phone number"
              />
            </div>
            <div>
              <label htmlFor="website" className="block text-gray-800 text-small mt-6">
                Organization website
              </label>
              <input
                type="text"
                id="website"
                className="w-full text-sm border-gray-300 border rounded-lg shadow-md p-2"
                placeholder="enter website URL"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="mt-4 flex justify-center items-center">
                <img
                  src="src/assets/profile_default.jpg"
                  alt="Organization Logo"
                  className="w-40 h-40 mb-2 object-cover border rounded-lg shadow-md"
                />
              </div>
              <div className="mt-2 flex justify-center">
                <label
                  htmlFor="logo"
                  className="cursor-pointer inline-block bg-light_grey text-gray-800 text-sm px-4 py-2 rounded-md shadow-md hover:shadow-md hover:shadow-gray-400"
                >
                  Upload
                </label>
                <input type="file" id="logo" className="hidden" />
              </div>
            </div>
          </div>
        </div>
        <ServicesCheckbox />
        <div className="space-y-4">
          <div>
            <label htmlFor="mission" className="block text-gray-800 text-small">
              Mission statement
            </label>
            <textarea
              id="mission"
              rows="4"
              className="w-full text-sm border-gray-300 border rounded-lg shadow-md p-2"
              placeholder="Tell potential volunteers the aims and values of your organization"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-800 text-small">
              Organization description
            </label>
            <textarea
              id="description"
              rows="4"
              className="w-full text-sm border-gray-300 border rounded-lg shadow-md p-2"
              placeholder="Tell potential volunteers about your history, goals, programs, and achievements"
            />
          </div>
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            type="submit"
            className="w-2/5 px-4 py-2 sm:text-xl bg-orange text-white rounded-md hover:bg-orange-600 hover:shadow-md hover:shadow-gray-400"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="w-2/5 px-4 py-2 sm:text-xl bg-white border border-red-500 text-red-500 rounded-md hover:bg-red-50"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-2/5 px-4 py-2 sm:text-xl bg-white border border-red-500 text-red-500 rounded-md hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrganizationForm;
