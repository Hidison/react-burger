import { FC, MouseEventHandler } from "react";
import { useSelector } from "../../services/hooks";
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
  const { orderRequest } = useSelector((state) => state.order);
  const modalClasses: string[] = [ModalOverlayStyles.modalOverlay];

  if (modalVisible) {
    modalClasses.push(ModalOverlayStyles.active);
  }

  if (orderRequest) {
    modalClasses.push(ModalOverlayStyles.cursor_loading);
  }

  const closeModal: MouseEventHandler = () => {
    if (!orderRequest) {
      handleCloseModal();
    } else {
      return;
    }
  };

  return (
    <div className={modalClasses.join(" ")} onClick={closeModal}>
      {children}
    </div>
  );
};

export default ModalOverlay;
