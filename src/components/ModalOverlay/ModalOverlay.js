import ModalOverlayStyles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ handleCloseModal, modalVisible, children }) => {
  const modalClasses = [ModalOverlayStyles.modalOverlay];

  if (modalVisible) {
    modalClasses.push(ModalOverlayStyles.active);
  }

  const closeModal = () => {
    handleCloseModal();
  };

  return (
    <div className={modalClasses.join(" ")} onClick={closeModal}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  handleCloseModal: PropTypes.func,
  modalVisible: PropTypes.bool,
  children: PropTypes.object.isRequired,
};


export default ModalOverlay;
