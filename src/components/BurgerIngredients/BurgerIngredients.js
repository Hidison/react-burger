import React, { useRef, useMemo, useContext, useState } from "react";
import BurgerIngredientsStyles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import MyScrollbar from "../UI/myScrollbar/MyScrollbar";
import PropTypes from "prop-types";
import Ingredient from "../Ingredient/Ingredient";
import { IngredientContext } from "../../contexts/ingredientsContext";

const BurgerIngredients = ({ setSelectedIngredient, handleOpenModal }) => {
  const { data } = useContext(IngredientContext);
  const [current, setCurrent] = useState("Булки");

  const bunItem = useMemo(
    () => data.filter((item) => item.type === "bun"),
    [data]
  );

  const mainItem = useMemo(
    () => data.filter((item) => item.type === "main"),
    [data]
  );

  const sauceItem = useMemo(
    () => data.filter((item) => item.type === "sauce"),
    [data]
  );

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const fillingRef = useRef(null);

  const handleBunClick = (e) => {
    setCurrent(e);
    bunRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSauceClick = (e) => {
    setCurrent(e);
    sauceRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleFillingClick = (e) => {
    setCurrent(e);
    fillingRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={BurgerIngredientsStyles.BurgerIngredients}>
      <h1 className="pb-5 pt-10 text text_type_main-large">Соберите бургер</h1>
      <div
        className={`${BurgerIngredientsStyles.BurgerIngredients__tab} pb-10`}
      >
        <Tab
          value="Булки"
          active={current === "Булки"}
          onClick={handleBunClick}
        >
          Булки
        </Tab>
        <Tab
          value="Соусы"
          active={current === "Соусы"}
          onClick={handleSauceClick}
        >
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={handleFillingClick}
        >
          Начинки
        </Tab>
      </div>
      <MyScrollbar height={"716px"}>
        <h2 className="pb-6 text text_type_main-medium" ref={bunRef}>
          Булки
        </h2>
        <ul
          className={`${BurgerIngredientsStyles.burgerItem__list} pt-6 pb-10 pl-4 pr-4`}
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
        <h2 className="pb-6 text text_type_main-medium" ref={sauceRef}>
          Соусы
        </h2>
        <ul
          className={`${BurgerIngredientsStyles.burgerItem__list} pt-6 pb-10 pl-4 pr-4`}
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

        <h2 className="pb-6 text text_type_main-medium" ref={fillingRef}>
          Начинки
        </h2>
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
  setSelectedIngredient: PropTypes.func,
  handleOpenModal: PropTypes.func,
};

export default BurgerIngredients;
