import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalStyles from "./Modal.module.css";
import PropTypes from "prop-types";
const modalRoot = document.getElementById("modals");

const Modal = ({ handleCloseModal, ...props }) => {
  const isOpen = props.modalVisible;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        handleCloseModal();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const stopCloseOnModal = (e) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <ModalOverlay
      handleCloseModal={handleCloseModal}
      modalVisible={props.modalVisible}
    >
      <div className={`${ModalStyles.modal}`} onClick={stopCloseOnModal}>
        {props.title && (
          <h2
            className={`${ModalStyles.modalTitle} text text_type_main-large mt-10 ml-10 mr-10`}
          >
            {props.title}
          </h2>
        )}
        <button
          className={`${ModalStyles.modal__closeButton} mt-15 mr-10`}
          onClick={handleCloseModal}
        >
          <CloseIcon type="primary" />
        </button>

        {props.children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  handleCloseModal: PropTypes.func,
  modalVisible: PropTypes.bool,
  ingredientModalVisible: PropTypes.bool,
  children: PropTypes.array.isRequired,
};

export default Modal;
