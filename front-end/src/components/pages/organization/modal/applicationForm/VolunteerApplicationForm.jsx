import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import { applicationSchema } from '../../../../../schemas';
import { useGlobal } from '../../../../../context/useGlobal.jsx';

function VolunteerApplicationForm({ onSave, toggleModal }) {
  const { volunteer } = useGlobal();

  const initialValues = {
    about: '',
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await onSave(values);
      toggleModal();
    } catch (error) {
      console.warn('Error while submitting form:', error);
      setErrors({ general: 'An error occurred while saving the form.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <Formik
        className="grid px-5 gap-5 grid-cols-1"
        initialValues={initialValues}
        validationSchema={applicationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="grid mb-3">
            <div className="flex justify-between pb-4">
              <p className="w-full text-sm ">
                <strong>First Name: </strong> {volunteer.first_name}
              </p>
              <p className="w-full text-sm">
                <strong>Last Name: </strong> {volunteer.last_name}
              </p>
            </div>

            <div>
              <label htmlFor="about">How can you help us?</label>
              <Field
                className="w-full h-60 text-sm border-gray-300 border rounded-lg p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 focus:outline-none"
                id="about"
                name="about"
                as="textarea"
                placeholder="Tell us about yourself"
              />

              <ErrorMessage name="about" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex justify-center mt-8 mb-4">
              <button
                type="submit"
                className="w-2/5 px-4 py-2 sm:text-xl lg:text-lg rounded-md border-2 border-red-500 text-red-500 bg-white hover:bg-red-100 hover:border-red-600 hover:text-red-600"
              >
                {isSubmitting ? 'Submitting...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={toggleModal}
                className="w-2/5 px-4 py-2 sm:text-xl lg:text-lg rounded-md bg-orange text-white hover:bg-orange-600 hover:shadow-md hover:shadow-gray-400 mx-2"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

VolunteerApplicationForm.propTypes = {
  initialData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    requestStatus: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default VolunteerApplicationForm;
