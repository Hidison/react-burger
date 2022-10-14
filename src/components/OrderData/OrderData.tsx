import React, { FC } from "react";
import OrderDataStyles from "./OrderData.module.css";
import { useDispatch } from "../../services/hooks";
import { Link, useLocation } from "react-router-dom";
import Order from "../Order/Order";
import { SET_ORDER_DATA } from "../../services/actions/OrderData";

interface IOrderData {
  item: any;
  setOrderModalVisible: Function;
} 

const OrderData: FC<IOrderData> = ({ item, setOrderModalVisible }) => {
  const dispatch = useDispatch();

  const location = useLocation();

  const handleIngredientClick = () => {
    setOrderModalVisible(true);
    dispatch({
      type: SET_ORDER_DATA,
      payload: item,
    });
  };

  return (
    <Link
      to={{
        pathname: location.pathname.includes("feed")
          ? `/feed/${item.number}`
          : `/profile/orders/${item.number}`,
        state: { background: location },
      }}
      className={
        location.pathname.includes("feed")
          ? `${OrderDataStyles.feed__container} ${OrderDataStyles.feed__container_small} p-6`
          : `${OrderDataStyles.feed__container} p-6`
      }
      key={item._id}
      onClick={handleIngredientClick}
    >
      <Order
        number={item.number}
        date={item.createdAt}
        title={item.name}
        ingredientss={item.ingredients}
        status={item.status}
      />
    </Link>
  );
};

export default OrderData;
