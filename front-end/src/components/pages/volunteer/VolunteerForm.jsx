import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { volunteerSchema } from '../../../schemas/index';
import { createVolunteer, updateVolunteerById } from '../../../utils/apiReqests';
import { states } from '../../../data/states';
import { useGlobal } from '../../../context/useGlobal.jsx';
import PropTypes from 'prop-types';

function VolunteerForm({ type }) {
  const navigate = useNavigate();
  const { dispatch, volunteer } = useGlobal();

  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    about: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip_code: '',
    },
  });

  useEffect(() => {
    if (type === 'edit' && volunteer) {
      setInitialValues({
        first_name: volunteer.first_name || '',
        last_name: volunteer.last_name || '',
        email: volunteer.email || '',
        phone: volunteer.phone || '',
        about: volunteer.about || '',
        address: {
          street: volunteer.address?.street || '',
          city: volunteer.address?.city || '',
          state: volunteer.address?.state || '',
          zip_code: volunteer.address?.zip_code || '',
        },
      });
    }
  }, [volunteer, type]);

  if (type === 'edit' && !volunteer) {
    return <p>Loading volunteer data...</p>;
  }

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      if (type === 'create') {
        const res = await createVolunteer(values);
        dispatch({ type: 'SET_VOLUNTEER', payload: res.volunteer });
        navigate('/dashboard');
      } else if (type === 'edit') {
        const res = await updateVolunteerById(volunteer.id, values);
        dispatch({ type: 'SET_VOLUNTEER', payload: res.volunteer });
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(`Error ${type === 'create' ? 'creating' : 'updating'} volunteer:`, err);
      setFieldError('general', `Failed to ${type === 'create' ? 'create' : 'update'} volunteer. Please try again.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-8 sm:px-24 md:px-48 lg:px-64 py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold mb-4">Please add your information</h1>
        <p className="text-gray-600">Ensure all details are correct and up-to-date to help us serve you better.</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={volunteerSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            {errors.general && <p className="text-red-500 text-center mb-4">{errors.general}</p>}
            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label className="block text-gray-800 text-small">First Name *</label>
                <Field name="first_name" type="text" className="border rounded px-2 py-1 w-full shadow-md" />
                <ErrorMessage name="first_name" component="p" className="text-red-500 text-sm" />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-800 text-small">Last Name *</label>
                <Field name="last_name" type="text" className="border rounded px-2 py-1 w-full shadow-md" />
                <ErrorMessage name="last_name" component="p" className="text-red-500 text-sm" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 text-small">Phone *</label>
              <Field
                name="phone"
                type="text"
                placeholder="e.g., +1234567890"
                className="border rounded px-2 py-1 w-full shadow-md"
              />
              <ErrorMessage name="phone" component="p" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 text-small">Street *</label>
              <Field name="address.street" type="text" className="border rounded px-2 py-1 w-full shadow-md" />
              <label className="block text-gray-800 text-small mt-2">City *</label>
              <Field name="address.city" type="text" className="border rounded px-2 py-1 w-full shadow-md" />
              <div className="flex space-x-4 mt-2">
                <div className="w-1/2">
                  <label className="block text-gray-800 text-small">State *</label>
                  <Field name="address.state" as="select" className="border rounded px-2 py-1 w-full shadow-md">
                    <option value="">Select State *</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-800 text-small">Zip Code *</label>
                  <Field name="address.zip_code" type="text" className="border rounded px-2 py-1 w-full shadow-md" />
                </div>
              </div>
            </div>

            <label className="block text-gray-800 text-small">About *</label>
            <Field name="about" as="textarea" className="border rounded px-2 py-1 w-full shadow-md" />
            <ErrorMessage name="about" component="p" className="text-red-500 text-sm" />

            <div className="flex justify-center mt-6 space-x-4">
              {type === 'create' ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-orangeButton text-white rounded border transition hover:shadow-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Create'}
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/5 px-4 py-2 sm:text-xl lg:text-lg rounded-md border-2 border-red-500 text-red-500 bg-white hover:bg-red-100 hover:border-red-600 hover:text-red-600"
                  >
                    {isSubmitting ? 'Submitting...' : 'Update'}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-2/5 px-4 py-2 sm:text-xl lg:text-lg rounded-md bg-orange text-white hover:bg-orange-600 hover:shadow-md hover:shadow-gray-400 mx-2"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

VolunteerForm.propTypes = {
  type: PropTypes.oneOf(['create', 'edit']).isRequired,
  isSubmitting: PropTypes.bool,
};

VolunteerForm.defaultProps = {
  isSubmitting: false,
};

export default VolunteerForm;
