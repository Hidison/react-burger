import React, { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import OrderStyles from "./Order.module.css";
import FeedPageStyles from "../../pages/feed.module.css";
import { TItem } from "../../types";
import { setDate } from "../../utils/date";

interface IOrder {
  number: number;
  date: string;
  title: string;
  ingredientss: string[];
  status: string;
}

const Order: FC<IOrder> = ({ number, date, title, ingredientss, status }) => {
  const { ingredients } = useSelector((state) => state.ingredients);

  const result: TItem[] = ingredients.filter((ingredient) => ingredientss.includes(ingredient._id));

  result &&
    result.forEach(function (item) {
      return item.type === "bun"
        ? (item.count = 2)
        : (item.count =
            ingredientss && ingredientss.filter((ing: string) => ing === item._id).length);
    });

  const newIngredients: TItem[] = result.slice(0, 5);
  const counterRestIngredients: number = result.length - newIngredients.length;
  const location = useLocation();

  return (
    <>
      <div className={`${OrderStyles.feed__info}`}>
        <span className="text text_type_digits-default">{number}</span>
        <span className="text text_type_main-default text_color_inactive">{setDate(date)}</span>
      </div>
      <h2 className={`${OrderStyles.feed__info_title} text text_type_main-medium mt-6`}>{title}</h2>
      {location.pathname === "/profile/orders" && (
        <p
          className={
            status === "done"
              ? `${OrderStyles.feed__info} ${FeedPageStyles.colour_created} text text_type_main-default mt-2`
              : `${OrderStyles.feed__info} text text_type_main-default mt-2`
          }
        >
          {status === "done" ? "Выполнен" : status === "created" ? "Создан" : "Готовится"}
        </p>
      )}
      <div className={`${OrderStyles.feed__ing_container} mt-6`}>
        <div className={`${OrderStyles.feed__img_main_container}`}>
          {newIngredients.map((item, index) => (
            <div
              key={item._id}
              style={{ zIndex: `${100 - index}` }}
              className={`${OrderStyles.feed__img_container}`}
            >
              <img
                src={item.image}
                alt={title}
                className={
                  index === 5
                    ? `${OrderStyles.feed__img} ${OrderStyles.feed__img_none}`
                    : `${OrderStyles.feed__img}`
                }
              />
            </div>
          ))}
          {result.length > 5 && (
            <div className={`${OrderStyles.feed__img_container}`}>
              <img
                src={result[5].image}
                alt=""
                className={
                  result.length > 6
                    ? `${OrderStyles.feed__img} ${OrderStyles.feed__img_none}`
                    : `${OrderStyles.feed__img}`
                }
              />
              {result.length > 6 && (
                <span className={`${OrderStyles.feed__img_count} text text_type_main-default`}>
                  +{counterRestIngredients}
                </span>
              )}
            </div>
          )}
        </div>
        <div className={`${OrderStyles.feed__price_container} ml-6`}>
          <span className={`${OrderStyles.feed__price} text text_type_digits-default`}>
            {result.reduce((acc: number, curr: TItem) => {
              return acc + curr.price * (curr.count ? curr.count : 0);
            }, 0)}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  );
};

export default Order;
