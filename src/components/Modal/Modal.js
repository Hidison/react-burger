import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalStyles from "./Modal.module.css";
import PropTypes from "prop-types";

const Modal = ({ handleCloseModal, ...props }) => {
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === "Escape") {
        handleCloseModal();
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [handleCloseModal]);

  const stopCloseOnModal = (e) => {
    e.stopPropagation();
  };

  return (
    <ModalOverlay
      handleCloseModal={handleCloseModal}
      modalVisible={props.modalVisible}
    >
      <div className={`${ModalStyles.modal}`} onClick={stopCloseOnModal}>
        {props.ingredientModalVisible && (
          <h2
            className={`${ModalStyles.modalTitle} text text_type_main-large mt-10 ml-10 mr-10`}
          >
            Детали ингредиента
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
    </ModalOverlay>
  );
};

Modal.propTypes = {
  handleCloseModal: PropTypes.func,
  modalVisible: PropTypes.bool,
  ingredientModalVisible: PropTypes.bool,
  children: PropTypes.array.isRequired,
};


export default Modal;
