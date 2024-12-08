import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import homecareIcon from '../../../assets/homecare.png';
import advocacyIcon from '../../../assets/advocacy.png';
import craftIcon from '../../../assets/craft.png';
import educationIcon from '../../../assets/education.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

  const validationSchema = Yup.object({
    name: Yup.string().required('Organization name is required'),
    address: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipcode: Yup.string()
      .required('Zip Code is required')
      .matches(/^[0-9]{5}$/, 'Zip Code must be exactly 5 digits'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    website: Yup.string()
      .required('Website is required')
      .matches(
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        'Enter a valid URL (e.g., google.com or http://google.com)'
      ),
    mission: Yup.string().required('Mission statement is required').max(500, 'Maximum 500 characters allowed'),
    description: Yup.string()
      .required('Organization description is required')
      .max(500, 'Maximum 500 characters allowed'),
  });

  return (
    <div className="max-w-4xl mx-auto p-8 bg-background rounded-lg">
      <p className="text-gray-900 text-sm mb-8 md:text-md xl:text-lg">
        Let volunteers know more about your organization &#39;s mission and primary cause areas to help them connect
        with you.
      </p>

      <Formik
        initialValues={{
          name: '',
          address: '',
          city: '',
          state: '',
          zipcode: '',
          phone: '',
          website: '',
          mission: '',
          description: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form Submitted', values);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="grid gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-800 text-small">
                    Organization name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full text-sm border-gray-300 border rounded-lg p-2 shadow-md"
                    placeholder="Enter organization name"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />
                </div>

                <div>
                  <label htmlFor="address" className="block text-gray-800 text-small">
                    Street address
                  </label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    className="w-full text-sm border-gray-300 border rounded-lg p-2 shadow-md"
                    placeholder="Enter street address"
                  />
                  <ErrorMessage name="address" component="div" className="text-red-500 text-xs" />
                </div>

                <div>
                  <label htmlFor="city" className="block text-gray-800 text-small">
                    City
                  </label>
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    className="w-full text-sm border-gray-300 border rounded-lg shadow-md p-2"
                    placeholder="Enter city"
                  />
                  <ErrorMessage name="city" component="div" className="text-red-500 text-xs" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="state" className="block text-gray-800 text-small mb-1">
                      State
                    </label>
                    <Field
                      as="select"
                      id="state"
                      name="state"
                      className="w-full text-sm bg-white border-gray-300 border rounded-lg shadow-md p-2"
                    >
                      <option value="">Select State</option>
                      <option value="ME">Maine</option>
                    </Field>
                    <ErrorMessage name="state" component="div" className="text-red-500 text-xs" />
                  </div>

                  <div>
                    <label htmlFor="zipcode" className="w-full text-gray-800 text-small">
                      Zip Code
                    </label>
                    <Field
                      type="text"
                      id="zipcode"
                      name="zipcode"
                      className="w-full border-gray-300 text-sm border rounded-lg shadow-md p-2"
                      placeholder="Enter zip code"
                    />
                    <ErrorMessage name="zipcode" component="div" className="text-red-500 text-xs" />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-800 text-small">
                    Phone
                  </label>
                  <Field
                    type="text"
                    id="phone"
                    name="phone"
                    className="w-full text-sm border-gray-300 border rounded-lg shadow-md p-2"
                    placeholder="Enter phone number"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-xs" />
                </div>

                <div>
                  <label htmlFor="website" className="block text-gray-800 text-small mt-6">
                    Organization website
                  </label>
                  <Field
                    type="text"
                    id="website"
                    name="website"
                    className="w-full text-sm border-gray-300 border rounded-lg shadow-md p-2"
                    placeholder="Enter website URL"
                  />
                  <ErrorMessage name="website" component="div" className="text-red-500 text-xs" />
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

            <ServicesCheckbox
              selectedServices={values.services || []}
              toggleService={(service) => {
                const newSelected = values.services.includes(service)
                  ? values.services.filter((s) => s !== service)
                  : [...values.services, service];
                setFieldValue('services', newSelected);
              }}
            />

            <div className="space-y-4">
              <div>
                <label htmlFor="mission" className="block text-gray-800 text-small">
                  Mission statement
                </label>
                <Field
                  as="textarea"
                  id="mission"
                  name="mission"
                  rows="4"
                  className="w-full text-sm border-gray-300 border rounded-lg shadow-md p-2"
                  placeholder="Tell potential volunteers the aims and values of your organization"
                />
                <ErrorMessage name="mission" component="div" className="text-red-500 text-xs" />
              </div>

              <div>
                <label htmlFor="description" className="block text-gray-800 text-small">
                  Organization description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows="4"
                  className="w-full text-sm border-gray-300 border rounded-lg shadow-md p-2"
                  placeholder="Tell potential volunteers about your history, goals, programs, and achievements"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-xs" />
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
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default OrganizationForm;
