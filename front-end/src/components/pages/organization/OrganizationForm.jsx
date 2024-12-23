import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createOrganization, getOrganizationById } from '../../../utils/apiReqests';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrganizationForm() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    address: { street: '', city: '', state: '', zip_code: '' },
    phone: '',
    website: '',
    mission: '',
    description: '',
  });
  const [isOrganizationCreated, setIsOrganizationCreated] = useState(false);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const fullData = await getOrganizationById();
        const data = fullData.organization;
        const values = {
          name: data.name || '',
          address: {
            street: data.address?.street || '',
            city: data.address?.city || '',
            state: data.address?.state || '',
            zip_code: data.address?.zip_code || '',
          },
          phone: data.phone || '',
          website: data.website || '',
          mission: data.mission || '',
          description: data.description || '',
        };
        console.log('fetchOrganization');
        console.log(data);
        console.log(values);
        setFormValues(values);
        setIsOrganizationCreated(true);
      } catch (error) {
        console.error('Failed to fetch organization:', error);
        setIsOrganizationCreated(false);
      }
    };
    fetchOrganization();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Organization name is required'),
    address: Yup.object({
      street: Yup.string().required('Street is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      zip_code: Yup.string()
        .required('Zip Code is required')
        .matches(/^[0-9]{5}$/, 'Zip Code must be exactly 5 digits'),
    }),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    website: Yup.string()
      .required('Website is required')
      .matches(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/, 'Enter a valid URL'),
    mission: Yup.string().required('Mission statement is required').max(500),
    description: Yup.string().required('Organization description is required').max(500),
  });

  const handleSubmit = async (values) => {
    try {
      if (isOrganizationCreated) {
        toast.info('Organization already exists!');
        return;
      }
      await createOrganization(values);
      toast.success('Organization created successfully!');
      setIsOrganizationCreated(true);

      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      toast.error(error.message || 'An error occurred while creating the organization.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-background rounded-lg">
      <p className="text-gray-900 text-sm mb-8 md:text-md xl:text-lg">
        Let volunteers know more about your organization’s mission and primary cause areas to help them connect with
        you.
      </p>

      <Formik initialValues={formValues} enableReinitialize validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, handleChange }) => (
          <Form className="grid gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-800 text-small">
                    Organization name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className="w-full text-sm border-gray-300 border rounded-lg p-2 shadow-md"
                    placeholder="Enter organization name"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />
                </div>

                <div>
                  <label htmlFor="address.street" className="block text-gray-800 text-small">
                    Street address
                  </label>
                  <Field
                    type="text"
                    name="address.street"
                    value={values.address.street}
                    onChange={handleChange}
                    className="w-full text-sm border-gray-300 border rounded-lg p-2 shadow-md"
                    placeholder="Enter street address"
                  />
                  <ErrorMessage name="address.street" component="div" className="text-red-500 text-xs" />
                </div>

                <div>
                  <label htmlFor="address.city" className="block text-gray-800 text-small">
                    City
                  </label>
                  <Field
                    type="text"
                    name="address.city"
                    className="w-full text-sm border-gray-300 border rounded-lg shadow-md p-2"
                    placeholder="Enter city"
                  />
                  <ErrorMessage name="address.city" component="div" className="text-red-500 text-xs" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="address.state" className="block text-gray-800 text-small mb-1">
                      State
                    </label>
                    <Field
                      as="select"
                      name="address.state"
                      className="w-full text-sm bg-white border-gray-300 border rounded-lg shadow-md p-2"
                    >
                      <option value="">Select State</option>
                      <option value="NY">NY</option>
                      <option value="CT">CT</option>
                    </Field>
                    <ErrorMessage name="address.state" component="div" className="text-red-500 text-xs" />
                  </div>

                  <div>
                    <label htmlFor="address.zip_code" className="w-full text-gray-800 text-small">
                      Zip Code
                    </label>
                    <Field
                      type="text"
                      name="address.zip_code"
                      className="w-full border-gray-300 text-sm border rounded-lg shadow-md p-2"
                      placeholder="Enter zip code"
                    />
                    <ErrorMessage name="address.zip_code" component="div" className="text-red-500 text-xs" />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-800 text-small">
                    Phone
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
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
                    name="website"
                    className="w-full text-sm border-gray-300 border rounded-lg shadow-md p-2"
                    placeholder="Enter website URL"
                  />
                  <ErrorMessage name="website" component="div" className="text-red-500 text-xs" />
                </div>
              </div>

              <div className="space-y-4">
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
                    className="cursor-pointer inline-block bg-light_grey text-gray-800 text-sm px-4 py-2 rounded-md shadow-md hover:shadow-md hover:shadow-gray-400 transition duration-200 ease-in-out"
                  >
                    Change Logo
                    <Field type="file" id="logo" name="logo" accept="image/*" className="hidden" />
                  </label>
                </div>
              </div>
            </div>

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
                  placeholder="Describe the work your organization does"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-xs" />
              </div>
            </div>

            <div className="flex justify-center mt-8 mb-4">
              {!isOrganizationCreated && (
                <button
                  type="submit"
                  className="w-2/5 px-4 py-2 sm:text-xl rounded-md bg-orange text-white hover:bg-orange-600 hover:shadow-md hover:shadow-gray-400"
                >
                  Create Organization
                </button>
              )}
              {/* <button
                type="button"
                className="w-2/5 px-4 py-2 sm:text-xl bg-white border border-red-500 text-red-500 rounded-md hover:bg-red-50"
              >
                Edit
              </button> */}
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}

export default OrganizationForm;
