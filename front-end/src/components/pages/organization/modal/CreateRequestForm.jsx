import { useState, useEffect } from 'react';
import InputWithLabel from './InputWithLabel.jsx';
import PropTypes from 'prop-types';

const CreateRequestForm = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    service: '',
    request: '',
    description: '',
    status: 'Select status',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate required fields
    if (!formData.service.trim()) {
      alert('Service is required');
    } else if (!formData.request.trim()) {
      alert('Request is required');
    } else if (formData.status === 'Select status') {
      alert('Please select a status');
    } else {
      try {
        await onSave(formData);

        // Reset form after submission
        setFormData({
          service: '',
          request: '',
          description: '',
          status: 'Select status',
        });
      } catch (error) {
        console.error('Error while submitting form:', error);
        alert('An error occurred while saving the form. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid px-5 gap-5 grid-cols-1">
      <div className="mb-3 grid gap-4">
        <InputWithLabel
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full text-sm border-gray-300 border rounded-lg"
        >
          <span className="block text-sm font-bold">Service</span>
        </InputWithLabel>
      </div>
      <div className="mb-3">
        <InputWithLabel
          id="request"
          name="request"
          value={formData.request}
          onChange={handleChange}
          className="form-select w-full text-sm border-gray-300 border rounded-lg p-2"
          placeholder="Enter your request"
        >
          <span className="block text-sm font-bold">Request</span>
        </InputWithLabel>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="block text-gray-800 text-sm font-bold mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full text-sm border-gray-300 border rounded-lg p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 focus:outline-none"
          rows="4"
        />
      </div>
      <div className="mb-3 flex items-center">
        <label htmlFor="status" className="block text-gray-800 text-sm font-bold mb-1 mr-2">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="text-sm bg-white border-gray-300 border rounded-lg p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 focus:outline-none"
        >
          <option value="Select status">Select status</option>
          <option value="Open">Open</option>
          <option value="Closed">Rejected</option>
          <option value="Canceled">Canceled</option>
          <option value="Pending">Closed</option>
        </select>
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
    request: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CreateRequestForm;
