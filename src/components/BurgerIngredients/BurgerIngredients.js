import React from "react";
import BurgerIngredientsStyles from "./BurgerIngredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import MyScrollbar from "../UI/myScrollbar/MyScrollbar";
import PropTypes from "prop-types";

const BurgerIngredients = (props) => {
  const [current, setCurrent] = React.useState("Булки");

  const bunItem = props.data.filter((item) => item.type === "bun");
  const mainItem = props.data.filter((item) => item.type === "main");
  const sauceItem = props.data.filter((item) => item.type === "sauce");

  return (
    <section className={BurgerIngredientsStyles.BurgerIngredients}>
      <h1 className="pb-5 pt-10 text text_type_main-large">Соберите бургер</h1>
      <div className="pb-10" style={{ display: "flex" }}>
        <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <MyScrollbar height={"716px"}>
        <h2 className="pb-6 text text_type_main-medium">Булки</h2>
        <ul
          className={`${BurgerIngredientsStyles.burgerItem__list} pt-6 pl-4 pr-4`}
        >
          {bunItem.map((item) => (
            <li
              className={`${BurgerIngredientsStyles.burgerItem} mb-8`}
              key={item._id}
            >
              <img
                src={item.image}
                alt="иконка карточки"
                className="ml-4 mr-4"
              />
              <Counter count={1} size="default" />
              <div
                className={`${BurgerIngredientsStyles.burgerItem__countBlock} mt-1 mb-1`}
              >
                <span
                  className={`${BurgerIngredientsStyles.burgerItem__count} text text_type_digits-default`}
                >
                  {item.price}
                </span>
                <CurrencyIcon type="primary" />
              </div>
              <p
                className={`${BurgerIngredientsStyles.burgerItem__text} text text_type_main-default`}
              >
                {item.name}
              </p>
            </li>
          ))}
        </ul>
        <h2 className="pb-6 pt-10 text text_type_main-medium">Соусы</h2>
        <ul
          className={`${BurgerIngredientsStyles.burgerItem__list} pt-6 pl-4 pr-4`}
        >
          {sauceItem.map((item) => (
            <li
              className={`${BurgerIngredientsStyles.burgerItem} mb-8`}
              key={item._id}
            >
              <img
                src={item.image}
                alt="иконка карточки"
                className="ml-4 mr-4"
              />
              <Counter count={1} size="default" />
              <div
                className={`${BurgerIngredientsStyles.burgerItem__countBlock} mt-1 mb-1`}
              >
                <span
                  className={`${BurgerIngredientsStyles.burgerItem__count} text text_type_digits-default`}
                >
                  {item.price}
                </span>
                <CurrencyIcon type="primary" />
              </div>
              <p
                className={`${BurgerIngredientsStyles.burgerItem__text} text text_type_main-default`}
              >
                {item.name}
              </p>
            </li>
          ))}
        </ul>

        <h2 className="pb-6 pt-10 text text_type_main-medium">Начинки</h2>
        <ul
          className={`${BurgerIngredientsStyles.burgerItem__list} pt-6 pl-4 pr-4`}
        >
          {mainItem.map((item) => (
            <li
              className={`${BurgerIngredientsStyles.burgerItem} mb-8`}
              key={item._id}
            >
              <img
                src={item.image}
                alt="иконка карточки"
                className="ml-4 mr-4"
              />
              <Counter count={1} size="default" />
              <div
                className={`${BurgerIngredientsStyles.burgerItem__countBlock} mt-1 mb-1`}
              >
                <span
                  className={`${BurgerIngredientsStyles.burgerItem__count} text text_type_digits-default`}
                >
                  {item.price}
                </span>
                <CurrencyIcon type="primary" />
              </div>
              <p
                className={`${BurgerIngredientsStyles.burgerItem__text} text text_type_main-default`}
              >
                {item.name}
              </p>
            </li>
          ))}
        </ul>
      </MyScrollbar>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BurgerIngredients;
