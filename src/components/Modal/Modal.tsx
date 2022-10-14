import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "../../services/hooks";
import { SyntheticEvent } from "../../types";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalStyles from "./Modal.module.css";
const modalRoot = document.getElementById("modals") as Element;

interface IModal {
  title?: string;
  modalVisible: boolean;
  handleCloseModal: any;
  children?: React.ReactNode;
}

const Modal: FC<IModal> = ({ handleCloseModal, ...props }) => {
  const { orderRequest } = useSelector((state) => state.order);
  const isOpen: boolean = props.modalVisible;

  useEffect(() => {
    function closeByEscape(e: KeyboardEvent) {
      const { key } = e;
      if (key === "Escape" && !orderRequest) {
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
  }, [isOpen, orderRequest]);

  const stopCloseOnModal = (e: SyntheticEvent) => {
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
          className={
            orderRequest
              ? `${ModalStyles.modal__closeButton} ${ModalStyles.closeButton__cursor_loading} mt-15 mr-10`
              : `${ModalStyles.modal__closeButton} mt-15 mr-10`
          }
          disabled={orderRequest && true}
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

export default Modal;
