import React from "react";
import BurgerIngredientsStyles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import MyScrollbar from "../UI/myScrollbar/MyScrollbar";
import PropTypes from "prop-types";
import Ingredient from "../Ingredient/Ingredient";

const BurgerIngredients = ({
  data,
  setSelectedIngredient,
  handleOpenModal,
}) => {
  const [current, setCurrent] = React.useState("Булки");
  
  const bunItem = data.filter((item) => item.type === "bun");
  const mainItem = data.filter((item) => item.type === "main");
  const sauceItem = data.filter((item) => item.type === "sauce");

  return (
    <section
      style={{ overflow: "hidden" }}
      className={BurgerIngredientsStyles.BurgerIngredients}
    >
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
              card={item}
            >
              <Ingredient
                handleOpenModal={handleOpenModal}
                setSelectedIngredient={setSelectedIngredient}
                item={item}
              />
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
              <Ingredient
                handleOpenModal={handleOpenModal}
                setSelectedIngredient={setSelectedIngredient}
                item={item}
              />
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
              <Ingredient
                handleOpenModal={handleOpenModal}
                setSelectedIngredient={setSelectedIngredient}
                item={item}
              />
            </li>
          ))}
        </ul>
      </MyScrollbar>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired,
  setSelectedIngredient: PropTypes.func,
  handleOpenModal: PropTypes.func,
};

export default BurgerIngredients;
