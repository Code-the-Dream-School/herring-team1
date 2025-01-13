/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { organizationSchema } from '../../../schemas';
import { createOrganization, getMyOrganization, updateOrganization } from '../../../utils/apiReqests';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { states } from '../../../data/states';
import CustomMultiSelect from './CustomMultiSelect.jsx';
import { servicesMap } from '../../../data/services.jsx';
import { useGlobal } from '../../../context/useGlobal.jsx';

function OrganizationForm() {
  const { dispatch, myOrganization } = useGlobal();
  const [formValues, setFormValues] = useState(
    myOrganization
      ? {
          name: myOrganization.name,
          address: {
            street: myOrganization.address?.street,
            city: myOrganization.address?.city,
            state: myOrganization.address?.state,
            zip_code: myOrganization.address?.zip_code,
          },
          phone: myOrganization.phone,
          website: myOrganization.website,
          mission: myOrganization.mission,
          description: myOrganization.description,
          service_ids: myOrganization.org_services?.map((service) => service.service_id),
        }
      : {
          name: '',
          address: { street: '', city: '', state: '', zip_code: '' },
          phone: '',
          website: '',
          mission: '',
          description: '',
          service_ids: [],
        }
  );

  const [isEditing, setIsEditing] = useState(myOrganization ? false : true);
  const [logo, setLogo] = useState(myOrganization?.logo || null);

  const handleSubmit = async (values) => {
    try {
      let response;
      if (myOrganization) {
        response = await updateOrganization(myOrganization.id, values);
        dispatch({ type: 'SET_MY_ORGANIZATION', payload: response.organization });
        if (response) {
          toast.success('Organization updated successfully!');
          setIsEditing(false);
        } else {
          throw new Error('Failed to update organization');
        }
      } else {
        response = await createOrganization(values);
        dispatch({ type: 'SET_MY_ORGANIZATION', payload: response.organization });
        if (response) {
          toast.success('Organization created successfully!');
          setIsEditing(false);
        } else {
          throw new Error('Failed to create organization');
        }
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred while saving the organization.');
      setIsEditing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-background rounded-lg">
      <p className="text-gray-900 text-sm mb-8 md:text-md xl:text-lg">
        Let volunteers know more about your organization’s mission and primary cause areas to help them connect with
        you.
      </p>

      <Formik
        initialValues={formValues}
        enableReinitialize
        validationSchema={organizationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
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
                    disabled={!isEditing}
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
                    disabled={!isEditing}
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
                    value={values.address.city}
                    onChange={handleChange}
                    className="w-full text-sm border-gray-300 border rounded-lg shadow-md p-2"
                    placeholder="Enter city"
                    disabled={!isEditing}
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
                      value={values.address.state}
                      onChange={handleChange}
                      className="w-full text-sm bg-white border-gray-300 border rounded-lg shadow-md p-2"
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
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
                      value={values.address.zip_code}
                      onChange={handleChange}
                      className="w-full border-gray-300 text-sm border rounded-lg shadow-md p-2"
                      placeholder="Enter zip code"
                      disabled={!isEditing}
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
                    disabled={!isEditing}
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
                    value={values.website}
                    onChange={handleChange}
                    className="w-full text-sm border-gray-300 border rounded-lg shadow-md p-2"
                    placeholder="Enter website URL"
                    disabled={!isEditing}
                  />
                  <ErrorMessage name="website" component="div" className="text-red-500 text-xs" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="mt-4 flex justify-center items-center">
                  <img
                    src={logo.url || 'src/components/assets/images_default/logo_example.png'}
                    alt="Organization Logo"
                    className="w-40 h-40 mb-2 object-contain border rounded-lg shadow-md"
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
                <label htmlFor="service_ids" className="block text-gray-800 text-small">
                  Services
                </label>
                <Field
                  name="service_ids"
                  component={CustomMultiSelect}
                  options={servicesMap}
                  placeholder="Select services..."
                  isMulti={true}
                  value={values.service_ids}
                  onChange={handleChange}
                  className="w-full text-sm bg-white border-gray-300 border rounded-lg shadow-md p-2"
                  disabled={!isEditing}
                />
                <ErrorMessage name="service_ids" component="div" className="text-red-500 text-xs" />
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
                  value={values.mission}
                  onChange={handleChange}
                  rows="4"
                  className="w-full text-sm border-gray-300 border rounded-lg shadow-md p-2"
                  placeholder="Tell potential volunteers the aims and values of your organization"
                  disabled={!isEditing}
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
                  value={values.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full text-sm border-gray-300 border rounded-lg shadow-md p-2"
                  placeholder="Describe the work your organization does"
                  disabled={!isEditing}
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-xs" />
              </div>
            </div>

            <div className="flex justify-center mt-8 mb-4">
              {myOrganization ? (
                !isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="w-2/5 px-4 py-2 sm:text-xl lg:text-lg rounded-md bg-orange text-white hover:bg-orange-600 hover:shadow-md hover:shadow-gray-400"
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleSubmit()}
                      className="w-2/5 px-4 py-2 sm:text-xl lg:text-lg rounded-md border-2 border-red-500 text-red-500 bg-white hover:bg-red-100 hover:border-red-600 hover:text-red-600"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="w-2/5 px-4 py-2 sm:text-xl lg:text-lg rounded-md bg-orange text-white hover:bg-orange-600 hover:shadow-md hover:shadow-gray-400 mx-2"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </>
                )
              ) : (
                <button
                  type="submit"
                  className="w-2/5 px-4 py-2 sm:text-xl lg:text-lg rounded-md bg-orange text-white hover:bg-orange-600 hover:shadow-md hover:shadow-gray-400"
                >
                  Create
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}

export default OrganizationForm;
