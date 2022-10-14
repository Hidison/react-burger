import { FC, MouseEventHandler } from "react";
import ModalOverlayStyles from "./ModalOverlay.module.css";

interface IModalOverlay {
  modalVisible: boolean;
  handleCloseModal: Function;
  children?: React.ReactNode;
}

const ModalOverlay: FC<IModalOverlay> = ({
  handleCloseModal,
  modalVisible,
  children,
}) => {
  const modalClasses: string[] = [ModalOverlayStyles.modalOverlay];

  if (modalVisible) {
    modalClasses.push(ModalOverlayStyles.active);
  }

  const closeModal: MouseEventHandler = () => {
    handleCloseModal();
  };

  return (
    <div className={modalClasses.join(" ")} onClick={closeModal}>
      {children}
    </div>
  );
};

export default ModalOverlay;
