import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import InputWithLabel from './InputWithLabel.jsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { getMyOrganization, postRequests } from '../../../../../utils/apiReqests';

const CreateRequestForm = ({ onSave, onCancel, initialData }) => {
  const [orgId, setOrgId] = useState(null);
  const [services, setServices] = useState([]);

  const requestStatus = {
    0: 'Open',
    1: 'Closed',
    2: 'Canceled',
    3: 'Pending',
  };

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await getMyOrganization();
        const orgId = response.data.organization.id;
        const services = response.data.organization.org_services || [];

        setOrgId(orgId);
        setServices(services);
      } catch (error) {
        console.error('Error fetching organization data:', error);
      }
    };

    fetchOrganization();
  }, []);

  const formik = useFormik({
    initialValues: {
      service: initialData?.service || services[0]?.name || '',
      title: initialData?.title || '',
      description: initialData?.description || '',
      status: initialData?.status || 'Open',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      service: Yup.string(),
      title: Yup.string().required('Request is required.'),
      status: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        // pick up data for selected from all org services
        const selectedService = services.find((service) => service.name === values.service);
        const serviceId = selectedService ? selectedService.id : null;
        const statusId = Object.keys(requestStatus).find((key) => requestStatus[key] === values.status);
        // const serviceName = selectedService ? selectedService.name : null;

        // post a new request
        const response = await postRequests(values, orgId, serviceId, statusId);
        const result = await response.request;
        onSave(result);

        formik.resetForm();
      } catch (error) {
        console.warn('Error while submitting form:', error);
        alert('An error occurred while saving the form. Please try again.');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="grid px-5 gap-5 grid-cols-1">
      <div className="mt-2">
        <label htmlFor="status" className="block text-gray-800 text-sm mb-1 mr-2">
          Service:
        </label>
        <select
          id="service"
          name="service"
          value={formik.values.service}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="text-sm bg-white border-gray-300 border rounded-lg p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 focus:outline-none"
        >
          {services.map((service) => (
            <option key={service.id} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
        {formik.touched.service && formik.touched.service && (
          <div className="text-red-500 text-sm">{formik.errors.service}</div>
        )}
        {/*<p>{formatServices(formData.service)}</p>*/}
      </div>
      <div className="mt-3">
        <InputWithLabel
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-select w-full text-sm border-gray-300 border rounded-lg p-2"
          placeholder="Enter your request"
        >
          <span className="block text-sm mb-1">Request title</span>
        </InputWithLabel>
        {formik.touched.title && formik.errors.title && (
          <div className="text-red-500 text-sm">{formik.errors.title}</div>
        )}
      </div>
      <div className="mt-3">
        <label htmlFor="description" className="block text-gray-800 text-sm mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          className="w-full text-sm border-gray-300 border rounded-lg p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 focus:outline-none"
          placeholder="Add description (optional)"
          rows="4"
        />
      </div>
      <div className="mt-3 flex items-center">
        <label htmlFor="status" className="block text-gray-800 text-sm mb-1 mr-2">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          className="text-sm bg-white border-gray-300 border rounded-lg p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 focus:outline-none"
        >
          <option value="Open">Open</option>
          <option value="Closed">Rejected</option>
          <option value="Canceled">Canceled</option>
          <option value="Pending">Closed</option>
        </select>
        {formik.touched.status && formik.errors.status && (
          <div className="text-red-500 text-sm pl-3">{formik.errors.status}</div>
        )}
      </div>
      <div className="flex justify-center gap-3">
        <button
          type="submit"
          className="w-full sm:w-[10rem] px-4 py-2 text-sm bg-orange text-white rounded-md hover:bg-orange-600 hover:shadow-md hover:shadow-gray-400"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-[10rem] px-4 py-2 text-sm bg-white border border-red-500 text-red-500 rounded-md hover:bg-red-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

CreateRequestForm.propTypes = {
  initialData: PropTypes.shape({
    service: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CreateRequestForm;
