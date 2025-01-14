import { useState } from 'react';
import VolunteerApplicationForm from './VolunteerApplicationForm.jsx';
import styles from '../requestForm/CreateRequest.module.css';
import PropTypes from 'prop-types';
import { createVolunteerApplication } from '../../../../../utils/apiReqests';
import { useGlobal } from '../../../../../context/useGlobal.jsx';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function CreateApplication({ requestId, status }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { volunteer } = useGlobal();
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onSave = async (values) => {
    try {
      const response = await createVolunteerApplication(values, volunteer.id, requestId);
      console.log(response);
      if (response) {
        navigate('/dashboard');
        toast.success('Form submitted successfully!');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.volunteer_id?.[0] || 'An unexpected error occurred';
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      {/* Green Trigger Button */}
      <button
        type="button"
        disabled={status === 'closed'}
        onClick={toggleModal}
        className="px-4 py-2 sm:text-xl lg:text-lg rounded-md bg-green hover:bg-orange-600 hover:shadow-md hover:shadow-gray-400 disabled:opacity-75 disabled:hover:shadow"
      >
        I want to help
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className={`modal-overlay ${styles.overlayModal}`}>
          <div className="modal-dialog">
            <div className={`modal-content ${styles.modalContent}`}>
              <div className={`modal-header ${styles.modalHeader} flex justify-between items-center`}>
                <h5 className="modal-title p-3 font-bold" id="ModalLabel">
                  My Application
                </h5>
                <button type="button" className="close-button px-3" onClick={toggleModal} aria-label="Close">
                  &times;
                </button>
              </div>
              {/* The Form */}
              <div className={`modal-body ${styles.modalBody}`}>
                <VolunteerApplicationForm onSave={onSave} toggleModal={toggleModal} />
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

CreateApplication.propTypes = {
  onSave: PropTypes.func,
  toggleModal: PropTypes.func,
  requestId: PropTypes.string,
  status: PropTypes.string,
};

export default CreateApplication;
