import React from "react";
import BurgerConstructorStyles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import MyScrollbar from "../UI/myScrollbar/MyScrollbar";
import PropTypes from "prop-types";

const BurgerConstructor = (props) => {
  const totalPrice = props.data.reduce(function (tot, arr) {
    return tot + arr.price;
  }, 0);

  const ingredientsWithoutBun = props.data.filter((item) => {
    return item.type !== 'bun';
  });

  return (
    <section className={`${BurgerConstructorStyles.BurgerConstructor} mt-25`}>
      <ul className={`${BurgerConstructorStyles.BurgerConstructor__list}`}>
        <li
          className={`${BurgerConstructorStyles.BurgerConstructor__listItem} mb-4 pl-4 pr-4`}
        >
          <div></div>
          <ConstructorElement
            type={"top"}
            isLocked={true}
            text={`${props.data[0].name} (верх)`}
            price={props.data[0].price}
            thumbnail={props.data[0].image}
          />
        </li>
        <MyScrollbar height={"464px"}>
          {ingredientsWithoutBun.map((item) => (
            <li
              className={`${BurgerConstructorStyles.BurgerConstructor__listItem} pl-4 pr-4`}
              key={item._id}
            >
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          ))}
        </MyScrollbar>
        <li
          className={`${BurgerConstructorStyles.BurgerConstructor__listItem} mt-4 pl-4 pr-4`}
        >
          <div></div>
          <ConstructorElement
            type={"bottom"}
            isLocked={true}
            text={`${props.data[0].name} (низ)`}
            price={props.data[0].price}
            thumbnail={props.data[0].image}
          />
        </li>
      </ul>
      <div
        className={`${BurgerConstructorStyles.BurgerConstructor__result} mt-10`}
      >
        <div className="mr-10">
          <span
            className={`${BurgerConstructorStyles.BurgerConstructor__totalPrice} text text_type_digits-medium`}
          >
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.array.isRequired
};

export default BurgerConstructor;
