import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import uuid from "react-uuid";
import BurgerConstructorStyles from "./BurgerConstructor.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import MyScrollbar from "../UI/myScrollbar/MyScrollbar";
import PropTypes from "prop-types";
import { sendOrder } from "../../services/actions/OrderDetails";
import {
  SET_INGREDIENTS_BUN,
  ADD_INGREDIENTS_MAIN,
  SET_TOTAL_PRICE,
  SET_INGREDIENTS_ID,
  UPDATE_SELECTED_INGREDIENTS,
} from "../../services/actions/BurgerConstructor";
import ConstructorElementWrapper from "../ConstructorElementWrapper/ConstructorElement";

const BurgerConstructor = ({ handleOpenModal }) => {
  const dispatch = useDispatch();

  const { selectedIngredientsBun, selectedIngredientsMain, totalPrice, ID } =
    useSelector((state) => state.selectedIngredients);

  const [{ isHoverBun }, dropTarget] = useDrop({
    accept: "ingredientBun",
    collect: (monitor) => ({
      isHoverBun: monitor.isOver(),
    }),
    drop(item) {
      dispatch({
        type: SET_INGREDIENTS_BUN,
        item: { ...item, count: 2 },
      });
    },
  });

  const [{ isHoverDownBun }, dropTargetDown] = useDrop({
    accept: "ingredientBun",
    collect: (monitor) => ({
      isHoverDownBun: monitor.isOver(),
    }),
    drop(item) {
      dispatch({
        type: SET_INGREDIENTS_BUN,
        item: { ...item, count: 2 },
      });
    },
  });

  const [{ isHoverMain }, dropTargetMain] = useDrop({
    accept: "ingredientMain",
    collect: (monitor) => ({
      isHoverMain: monitor.isOver(),
    }),
    drop(item) {
      dispatch({
        type: ADD_INGREDIENTS_MAIN,
        item: { ...item, dragId: uuid() },
      });
    },
  });

  const opacityBun = isHoverBun || isHoverDownBun ? "0.5" : "1";
  const opacityMain = isHoverMain ? "0.5" : "1";

  const handleOrder = () => {
    dispatch({
      type: SET_INGREDIENTS_BUN,
      item: { price: 0 },
    });
    dispatch({
      type: UPDATE_SELECTED_INGREDIENTS,
      sortedIngredients: [],
    });
    dispatch(sendOrder(ID));
    handleOpenModal();
  };

  useEffect(() => {
    dispatch({
      type: SET_TOTAL_PRICE,
    });
    dispatch({
      type: SET_INGREDIENTS_ID,
    });
  }, [dispatch, selectedIngredientsBun, selectedIngredientsMain]);

  const moveIngredient = useCallback(
    (dragIndex, hoverIndex) => {
      const dragIngredient = selectedIngredientsMain[dragIndex];
      const newIngredients = [...selectedIngredientsMain];
      newIngredients.splice(dragIndex, 1);
      newIngredients.splice(hoverIndex, 0, dragIngredient);
      dispatch({
        type: UPDATE_SELECTED_INGREDIENTS,
        sortedIngredients: newIngredients,
      });
    },
    [selectedIngredientsMain, dispatch]
  );

  return (
    <section className={`${BurgerConstructorStyles.BurgerConstructor} mt-25`}>
      <>
        <ul
          className={`${BurgerConstructorStyles.BurgerConstructor__list}`}
          ref={dropTarget}
          style={{ opacity: opacityBun }}
        >
          {selectedIngredientsBun.price !== 0 ? (
            <ConstructorElementWrapper
              item={selectedIngredientsBun}
              type={"top"}
            />
          ) : (
            <li
              className={`${BurgerConstructorStyles.BurgerConstructor__listItem} mb-4 pl-4 pr-4`}
            >
              <div></div>
              <div
                style={{ opacity: opacityBun }}
                className={`${BurgerConstructorStyles.BurgerConstructor__element} ${BurgerConstructorStyles.BurgerConstructor__element_top}`}
              >
                Выберите булку (верх)
              </div>
            </li>
          )}
        </ul>
        <MyScrollbar height={"464px"}>
          <ul
            ref={dropTargetMain}
            className={`${BurgerConstructorStyles.BurgerConstructor__list}`}
            style={{ opacity: opacityMain, padding: "0" }}
          >
            {selectedIngredientsMain.length !== 0 ? (
              selectedIngredientsMain.map((item, index) => (
                <ConstructorElementWrapper
                  key={item.dragId}
                  id={item.dragId}
                  item={item}
                  index={index}
                  moveIngredient={moveIngredient}
                />
              ))
            ) : (
              <li
                className={`${BurgerConstructorStyles.BurgerConstructor__listItem} pl-4 pr-4`}
              >
                <div></div>
                <div
                  className={BurgerConstructorStyles.BurgerConstructor__element}
                >
                  Выберите ингредиент
                </div>
              </li>
            )}
          </ul>
        </MyScrollbar>
        <ul
          className={`${BurgerConstructorStyles.BurgerConstructor__list}`}
          ref={dropTargetDown}
          style={{ opacity: opacityBun }}
        >
          {selectedIngredientsBun.price !== 0 ? (
            <ConstructorElementWrapper
              item={selectedIngredientsBun}
              type={"bottom"}
            />
          ) : (
            <li
              className={`${BurgerConstructorStyles.BurgerConstructor__listItem} mt-4 pl-4 pr-4`}
            >
              <div></div>
              <div
                style={{ opacity: opacityBun }}
                className={`${BurgerConstructorStyles.BurgerConstructor__element} ${BurgerConstructorStyles.BurgerConstructor__element_bottom}`}
              >
                Выберите булку (низ)
              </div>
            </li>
          )}
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
          <Button
            type="primary"
            size="large"
            disabled={
              !selectedIngredientsBun.name ||
              selectedIngredientsMain.length === 0
                ? true
                : false
            }
            onClick={handleOrder}
          >
            Оформить заказ
          </Button>
        </div>
      </>
    </section>
  );
};

BurgerConstructor.propTypes = {
  handleOpenModal: PropTypes.func,
  getOrderNumber: PropTypes.func,
};

export default BurgerConstructor;
