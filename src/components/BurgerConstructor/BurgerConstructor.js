import React, { useEffect, useState, useReducer } from "react";
import BurgerConstructorStyles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import MyScrollbar from "../UI/myScrollbar/MyScrollbar";
import PropTypes from "prop-types";
import { IngredientContext } from "../../contexts/ingredientsContext";

const initialTotalPrice = { price: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "set":
      return { price: action.payload };
    case "reset":
      return initialTotalPrice;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const BurgerConstructor = (props) => {
  const { data } = React.useContext(IngredientContext);
  const [randomSixIngredients, setRandomSixIngredients] = useState([]);
  const [randomBun, setRandomBun] = useState(null);
  const [totalPriceState, totalPriceDispatcher] = useReducer(
    reducer,
    initialTotalPrice,
    undefined
  );
  const ingredientsWithoutBun = randomSixIngredients.filter((item) => {
    return item.type !== "bun";
  });

  const ingredientsBun = data.filter((item) => {
    return item.type === "bun";
  });

  var bunsPrice;

  if (randomBun !== null) {
    bunsPrice = randomBun.price * 2;
  }

  useEffect(() => {
    setRandomSixIngredients(
      data
        .map((i) => [Math.random(), i])
        .sort()
        .map((i) => i[1])
        .slice(0, 7)
    );
    setRandomBun(
      ingredientsBun[Math.floor(Math.random() * ingredientsBun.length)]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ingredientsPrice = ingredientsWithoutBun.reduce(function (tot, arr) {
    return tot + arr.price;
  }, 0);

  const ingredientsWithBun = ingredientsWithoutBun.concat(randomBun);

  useEffect(() => {
    if (bunsPrice) {
      totalPriceDispatcher({
        type: "set",
        payload: bunsPrice + ingredientsPrice,
      });
    }
  }, [bunsPrice, ingredientsPrice]);

  const handleOrder = () => {
    const ingredientsId = ingredientsWithBun.map((ingredient) => {
      return ingredient._id;
    });
    props.getOrderNumber(ingredientsId);
    props.handleOpenModal();
  };

  return (
    <section className={`${BurgerConstructorStyles.BurgerConstructor} mt-25`}>
      {randomBun !== null && (
        <>
          <ul className={`${BurgerConstructorStyles.BurgerConstructor__list}`}>
            <li
              className={`${BurgerConstructorStyles.BurgerConstructor__listItem} mb-4 pl-4 pr-4`}
            >
              <div></div>

              <ConstructorElement
                type={"top"}
                isLocked={true}
                text={`${randomBun.name} (верх)`}
                price={randomBun.price}
                thumbnail={randomBun.image}
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
                text={`${randomBun.name} (них)`}
                price={randomBun.price}
                thumbnail={randomBun.image}
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
                {totalPriceState.price}
              </span>
              <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large" onClick={handleOrder}>
              Оформить заказ
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

BurgerConstructor.propTypes = {
  handleOpenModal: PropTypes.func,
  handleOrder: PropTypes.func,
};

export default BurgerConstructor;
