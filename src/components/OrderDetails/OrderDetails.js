import React from "react";
import { useSelector } from "react-redux";
import OrderDoneImage from "../../images/order-done-image.svg";

const OrderDetails = () => {
  const { orderNumber } = useSelector((state) => state.order);

  return (
    <>
      <span className="text text_type_digits-large mt-30 mb-8">
        {orderNumber}
      </span>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={OrderDoneImage} className="mb-15" alt="заказ принят" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

export default OrderDetails;
