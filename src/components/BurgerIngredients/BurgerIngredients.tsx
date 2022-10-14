import React, { FC, useRef, useState, useEffect } from "react";
import { useSelector } from "../../services/hooks";
import BurgerIngredientsStyles from "./BurgerIngredients.module.css";
import { Tab as TabUI } from "@ya.praktikum/react-developer-burger-ui-components";
import MyScrollbar from "../UI/myScrollbar/MyScrollbar";
import Ingredient from "../Ingredient/Ingredient";
import Loader from "../UI/Loader/Loader";
import { TItem, SyntheticEvent } from "../../types";

interface IBurgerIngredients {
  handleOpenModal: Function;
}

const Tab: FC<{
  value: string;
  active: boolean;
  onClick: any;
}> = TabUI;

const BurgerIngredients: FC<IBurgerIngredients> = ({ handleOpenModal }) => {
  const [current, setCurrent] = useState("Булки");

  const {
    ingredientsRequest,
    ingredientsFailed,
    bunIngredients,
    mainIngredients,
    sauceIngredients,
  } = useSelector((state) => state.ingredients);

  const scrollRef = useRef(null);
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const fillingRef = useRef<HTMLHeadingElement>(null);

  const bunContainerRef = useRef<HTMLUListElement>(null);
  const sauceContainerRef = useRef<HTMLUListElement>(null);
  const fillingContainerRef = useRef<HTMLUListElement>(null);

  const handleBunClick = (e: SyntheticEvent) => {
    bunRef.current !== null &&
      bunRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSauceClick = (e: SyntheticEvent) => {
    sauceRef.current !== null &&
      sauceRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleFillingClick = (e: SyntheticEvent) => {
    fillingRef.current !== null &&
      fillingRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const array = [bunContainerRef, sauceContainerRef, fillingContainerRef];

    let options = {
      root: scrollRef.current,
      rootMargin: "0px",
      threshold: [0, 0.5, 1],
    };

    let callback = function (entries: any) {
      const entry = entries.find(
        (entry: { isIntersecting: boolean; intersectionRatio: number }) =>
          entry.isIntersecting && entry.intersectionRatio > 0.5
      );
      if (entry === undefined) {
        return;
      } else {
        setCurrent(entry.target.attributes.text.value);
      }
    };

    const observer = new IntersectionObserver(callback, options);
    if (scrollRef.current) {
      array.forEach((s: any) => observer.observe(s.current));
    }

    return () => observer.disconnect();
  });

  if (ingredientsFailed) {
    return (
      <p className={`${BurgerIngredientsStyles.BurgerIngredients__load} mt-25`}>
        Произошла ошибка при получении данных
      </p>
    );
  } else if (ingredientsRequest) {
    return <Loader />;
  } else {
    return (
      <section className={BurgerIngredientsStyles.BurgerIngredients}>
        <h1 className="pb-5 pt-10 text text_type_main-large">
          Соберите бургер
        </h1>
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
        <MyScrollbar height={"716px"} ref={scrollRef}>
          <h2 className="pb-6 text text_type_main-medium" ref={bunRef}>
            Булки
          </h2>
          <ul
            className={`${BurgerIngredientsStyles.burgerItem__list} pt-6 pb-10 pl-4 pr-4`}
            ref={bunContainerRef}
            text={"Булки"}
          >
            {bunIngredients.map((item: TItem) => (
              <li
                className={`${BurgerIngredientsStyles.burgerItem} mb-8`}
                key={item._id}
                card={item}
              >
                <Ingredient handleOpenModal={handleOpenModal} item={item} />
              </li>
            ))}
          </ul>
          <h2 className="pb-6 text text_type_main-medium" ref={sauceRef}>
            Соусы
          </h2>
          <ul
            className={`${BurgerIngredientsStyles.burgerItem__list} pt-6 pb-10 pl-4 pr-4`}
            text={"Соусы"}
            ref={sauceContainerRef}
          >
            {sauceIngredients.map((item: TItem) => (
              <li
                className={`${BurgerIngredientsStyles.burgerItem} mb-8`}
                key={item._id}
              >
                <Ingredient handleOpenModal={handleOpenModal} item={item} />
              </li>
            ))}
          </ul>

          <h2 className="pb-6 text text_type_main-medium" ref={fillingRef}>
            Начинки
          </h2>
          <ul
            className={`${BurgerIngredientsStyles.burgerItem__list} pt-6 pl-4 pr-4`}
            ref={fillingContainerRef}
            text={"Начинки"}
          >
            {mainIngredients.map((item: TItem) => (
              <li
                className={`${BurgerIngredientsStyles.burgerItem} mb-8`}
                key={item._id}
              >
                <Ingredient handleOpenModal={handleOpenModal} item={item} />
              </li>
            ))}
          </ul>
        </MyScrollbar>
      </section>
    );
  }
};

export default BurgerIngredients;
