import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { applicationSchema } from '../../../../../schemas';
import InputWithLabel from '../requestForm/InputWithLabel.jsx';

function VolunteerApplicationForm({ onSave, toggleModal, initialData }) {
  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await onSave(values);
      toggleModal();
      alert('Form submitted successfully!');
      navigate('/dashboard');
      // navigate to <Volunteering />;
    } catch (error) {
      console.warn('Error while submitting form:', error);
      alert('An error occurred while saving the form. Please try again.');
      setErrors({ general: 'An error occurred while saving the form.' });
    } finally {
      setSubmitting(false);
    }
  };

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      requestStatus: 'Pending',
      about: initialData?.about || '',
    },
    validationSchema: applicationSchema,
    onSubmit,
  });

  // Update form values if initialData changes
  useEffect(() => {
    if (initialData) {
      handleSubmit.setValues(initialData);
    }
  }, [initialData, handleSubmit]);

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="grid px-5 gap-5 grid-cols-1">
        {/* First Name Field */}
        <div className="grid mb-3">
          <InputWithLabel
            id="firstName"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            className="w-full text-sm border-gray-300 border rounded-lg p-2"
            placeholder="Enter first name"
            autoFocus
          >
            <span className="block text-sm mb-1">First Name</span>
          </InputWithLabel>
          {touched.firstName && errors.firstName && <div className="text-red-500 text-sm">{errors.firstName}</div>}
        </div>

        {/* Last Name Field */}
        <div className="mb-3">
          <InputWithLabel
            id="lastName"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full text-sm border-gray-300 border rounded-lg p-2"
            placeholder="Enter last name"
          >
            <span className="block text-sm mb-1">Last Name</span>
          </InputWithLabel>
          {touched.lastName && errors.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
        </div>

        {/* About Text Area */}
        <div className="mb-3">
          <label htmlFor="about" className="block text-gray-800 text-sm mb-1">
            About
          </label>
          <textarea
            id="about"
            name="about"
            rows="4"
            value={values.about}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full text-sm border-gray-300 border rounded-lg p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 focus:outline-none"
            placeholder="Tell us about yourself"
          />
          {touched.about && errors.about && <div className="text-red-500 text-sm">{errors.about}</div>}
        </div>
        {/* Submit and Cancel Buttons */}
        <div className="flex justify-center gap-3">
          <button
            type="submit"
            className="w-full sm:w-[10rem] px-4 py-2 text-sm bg-orange text-white rounded-md hover:bg-orange-600 hover:shadow-md hover:shadow-gray-400"
            disabled={isSubmitting}
          >
            Save
          </button>
          <button
            type="button"
            onClick={toggleModal}
            className="w-full sm:w-[10rem] px-4 py-2 text-sm bg-white border border-red-500 text-red-500 rounded-md hover:bg-red-50"
          >
            Cancel
          </button>
        </div>
      </form>
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
