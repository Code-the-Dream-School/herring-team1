import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CreateRequestForm from './CreateRequestForm.jsx';
import styles from './CreateRequest.module.css';

function CreateRequest({ onSave, editingIndex, requests, onEditRequest }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (editingIndex !== null) {
      setIsModalOpen(true);
    }
  }, [editingIndex, requests]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleClickOpenModal = () => handleOpenModal();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onEditRequest(null);
  };

  const handleSave = async (newRequest) => {
    onSave(newRequest);
    handleCloseModal(); // Close the modal after saving
  };

  return (
    <>
      {/* Button to open the modal */}
      <button
        type="button"
        onClick={handleClickOpenModal}
        className={`${styles.btnSuccess}
          w-auto sm:w-1/4 sm:text-l py-2
          text-500 rounded-md hover:bg-green-800
          text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl`}
      >
        Create Request
      </button>
      {/* Conditional rendering of CreateRequest modal */}
      {isModalOpen && (
        <div
          className={`modal fade show ${styles.overlayModal}`}
          tabIndex="-1"
          style={{ display: 'block' }}
          aria-labelledby="ModalLabel"
          aria-hidden="true"
        >
          <div className="overlayModal">
            <div className="modal-dialog">
              <div className={`modal-content ${styles.modalContent}`}>
                <div className={`modal-header ${styles.modalHeader} flex justify-between items-center`}>
                  <h5 className="modal-title p-3 font-bold" id="ModalLabel">
                    {editingIndex !== null ? 'Edit Request' : 'Create Request'}
                  </h5>
                  <button type="button" className="btn-close px-3" onClick={handleCloseModal} aria-label="Close">
                    &times;
                  </button>
                </div>
                <div className={`modal-body ${styles.modalBody}`}>
                  <CreateRequestForm
                    onSave={handleSave}
                    onCancel={handleCloseModal}
                    initialData={editingIndex !== null ? requests[editingIndex] : null}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

CreateRequest.propTypes = {
  onSave: PropTypes.func.isRequired,
  editingIndex: PropTypes.number,
  requests: PropTypes.array.isRequired,
  onEditRequest: PropTypes.func.isRequired,
};

export default CreateRequest;
