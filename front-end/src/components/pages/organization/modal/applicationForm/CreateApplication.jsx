import { useState } from 'react';
import VolunteerApplicationForm from './VolunteerApplicationForm.jsx';
import styles from '../requestForm/CreateRequest.module.css';
import PropTypes from 'prop-types';

function CreateApplication() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onSave = async (formData) => {
    try {
      console.log('Form Data to Save:', formData);
      // API POST to volunteer application route
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div>
      {/* Green Trigger Button */}
      <button
        type="button"
        onClick={toggleModal}
        className={`${styles.btnSuccess}
          w-auto sm:text-l py-2 px-5
          text-500 rounded-md hover:bg-green-800
          text-xs sm:text-sm md:text-base lg:text-m xl:text-l`}
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
    </div>
  );
}

CreateApplication.propTypes = {
  onSave: PropTypes.func,
  toggleModal: PropTypes.func,
};

export default CreateApplication;
