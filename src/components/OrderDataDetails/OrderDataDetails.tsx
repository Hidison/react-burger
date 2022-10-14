import React, { useMemo, FC } from "react";
import FeedPageIDStyles from "../../pages/feed-id.module.css";
import OrderStyles from "../Order/Order.module.css";
import OrderDataDetailsStyles from "./OrderDataDetails.module.css";
import MyScrollbar from "../UI/myScrollbar/MyScrollbar";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services/hooks";
import { TItem } from "../../types";
import { setDate } from "../../utils/date";

interface IOrderDataDetails {
  modalVisible: boolean;
}

const OrderDataDetails: FC<IOrderDataDetails> = ({ modalVisible }) => {
  const { orderData } = useSelector((state) => state.orderData);
  const { ingredients } = useSelector((state) => state.ingredients);

  const result = useMemo(
    () =>
      orderData &&
      ingredients.filter((ingredient) =>
        orderData.ingredients.includes(ingredient._id)
      ),
    [ingredients, orderData]
  );

  result &&
    result.forEach(function (item: TItem) {
      return item.type === "bun"
        ? (item.count = 2)
        : orderData &&
            (item.count = orderData.ingredients.filter(
              (ing) => ing === item._id
            ).length);
    });

  if (!orderData || !ingredients) {
    return null;
  } else {
    return (
      <div
        style={{ paddingTop: !modalVisible ? "62px" : "0" }}
        className={`${FeedPageIDStyles.container}`}
      >
        <span
          className={
            modalVisible
              ? `${FeedPageIDStyles.order_number} ${FeedPageIDStyles.order_number_type_modal} text text_type_digits-default`
              : `${FeedPageIDStyles.order_number} text text_type_digits-default`
          }
        >
          #{orderData.number}
        </span>
        <h1 className="text text_type_main-medium mt-10 mb-3">
          {orderData.name}
        </h1>
        <span
          className={`${FeedPageIDStyles.order_status} text text_type_main-default`}
        >
          {orderData.status === "done"
            ? "Выполнен"
            : orderData.status === "created"
            ? "В работе"
            : "Готов"}
        </span>
        <span
          className={`${FeedPageIDStyles.order_ingredients_title} text text_type_main-medium mt-15 mb-6`}
        >
          Состав:
        </span>
        <MyScrollbar height={"312px"}>
          <div className={`${OrderDataDetailsStyles.ingredients_container}`}>
            {result &&
              result.map((item) => (
                <div
                  key={item._id}
                  className={`${FeedPageIDStyles.ingredients_container}`}
                >
                  <div
                    className={`${FeedPageIDStyles.ingredients_info_container}`}
                  >
                    <div
                      className={`${OrderStyles.feed__img_container} ${FeedPageIDStyles.ingredient_container}`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className={OrderStyles.feed__img}
                      />
                    </div>
                    <h2
                      className={`${FeedPageIDStyles.ingredient_title} text text_type_main-default ml-4`}
                    >
                      {item.name}
                    </h2>
                  </div>

                  <div className={`${FeedPageIDStyles.price_container}`}>
                    <p
                      className={`${OrderStyles.feed__price} text text_type_digits-default`}
                    >
                      {item.count} x {item.price}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              ))}
          </div>
        </MyScrollbar>
        <div className={`${FeedPageIDStyles.date_container} mt-10`}>
          <span className="text text_type_main-default text_color_inactive">
            {setDate(orderData.createdAt)}
          </span>
          <div className={`${FeedPageIDStyles.price_container}`}>
            <p
              className={`${OrderStyles.feed__price} text text_type_digits-default`}
            >
              {result &&
                result.reduce((acc, curr) => {
                  return acc + curr.price * (curr.count ? curr.count : 0);
                }, 0)}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    );
  }
};

export default OrderDataDetails;
