import Modal from "../Modal/Modal";
import OrderDoneImage from "../../images/order-done-image.svg";
import PropTypes from "prop-types";

const OrderDetails = (props) => {
  return (
    <Modal
      modalVisible={props.modalVisible}
      handleCloseModal={props.handleCloseModal}
    >
      <span className="text text_type_digits-large mt-30 mb-8">034536</span>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={OrderDoneImage} className="mb-15" alt="заказ принят" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </Modal>
  );
};

OrderDetails.propTypes = {
  handleCloseModal: PropTypes.func,
  modalVisible: PropTypes.bool,
};

export default OrderDetails;
