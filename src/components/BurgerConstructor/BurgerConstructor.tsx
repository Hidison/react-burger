import React, { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { useDrop } from "react-dnd";
import uuid from "react-uuid";
import BurgerConstructorStyles from "./BurgerConstructor.module.css";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import MyScrollbar from "../UI/myScrollbar/MyScrollbar";
import { sendOrder } from "../../services/actions/OrderDetails";
import {
  SET_INGREDIENTS_BUN,
  ADD_INGREDIENTS_MAIN,
  SET_TOTAL_PRICE,
  SET_INGREDIENTS_ID,
  UPDATE_SELECTED_INGREDIENTS,
} from "../../services/actions/BurgerConstructor";
import ConstructorElementWrapper from "../ConstructorElementWrapper/ConstructorElementWrapper";
import { useHistory } from "react-router-dom";
import { TItem } from "../../types";
import { getCookie } from "../../utils/utils";

interface IBurgerConstructor {
  handleOpenModal: Function;
}

const BurgerConstructor: FC<IBurgerConstructor> = ({ handleOpenModal }) => {
  const dispatch = useDispatch();

  const { selectedIngredientsBun, selectedIngredientsMain, totalPrice, ID } = useSelector(
    (state) => state.selectedIngredients
  );
  const { auth } = useSelector((state) => state.auth);
  const history = useHistory();

  const aToken: string | undefined = getCookie("accessToken");

  const [{ isHoverBun }, dropTarget] = useDrop({
    accept: "ingredientBun",
    drop(item: TItem) {
      dispatch({
        type: SET_INGREDIENTS_BUN,
        payload: { ...item, count: 2 },
      });
    },
    collect: (monitor) => ({
      isHoverBun: monitor.isOver(),
    }),
  });

  const [{ isHoverDownBun }, dropTargetDown] = useDrop({
    accept: "ingredientBun",
    drop(item: TItem) {
      dispatch({
        type: SET_INGREDIENTS_BUN,
        payload: { ...item, count: 2 },
      });
    },
    collect: (monitor) => ({
      isHoverDownBun: monitor.isOver(),
    }),
  });

  const [{ isHoverMain }, dropTargetMain] = useDrop({
    accept: "ingredientMain",
    drop(item: TItem) {
      dispatch({
        type: ADD_INGREDIENTS_MAIN,
        payload: { ...item, dragId: uuid() },
      });
    },
    collect: (monitor) => ({
      isHoverMain: monitor.isOver(),
    }),
  });

  const opacityBun = isHoverBun || isHoverDownBun ? "0.5" : "1";
  const opacityMain = isHoverMain ? "0.5" : "1";

  const handleOrder = () => {
    if (auth) {
      dispatch(sendOrder(ID as string, aToken));
      handleOpenModal();
    } else {
      history.replace({ pathname: "/login" });
    }
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
    (dragIndex: number, hoverIndex: number) => {
      const dragIngredient: TItem = selectedIngredientsMain[dragIndex];
      const newIngredients: TItem[] = [...selectedIngredientsMain];
      newIngredients.splice(dragIndex, 1);
      newIngredients.splice(hoverIndex, 0, dragIngredient);
      dispatch({
        type: UPDATE_SELECTED_INGREDIENTS,
        payload: newIngredients,
      });
    },
    [selectedIngredientsMain, dispatch]
  );

  return (
    <section className={`${BurgerConstructorStyles.BurgerConstructor} mt-25`}>
      <ul
        className={`${BurgerConstructorStyles.BurgerConstructor__list}`}
        ref={dropTarget}
        style={{ opacity: opacityBun }}
      >
        {selectedIngredientsBun.price !== 0 ? (
          <ConstructorElementWrapper item={selectedIngredientsBun as TItem} type={"top"} />
        ) : (
          <li className={`${BurgerConstructorStyles.BurgerConstructor__listItem} mb-4 pl-4 pr-4`}>
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
            selectedIngredientsMain.map((item: TItem, index: number) => (
              <ConstructorElementWrapper
                key={item.dragId}
                id={item.dragId}
                item={item}
                index={index}
                moveIngredient={moveIngredient}
              />
            ))
          ) : (
            <li className={`${BurgerConstructorStyles.BurgerConstructor__listItem} pl-4 pr-4`}>
              <div></div>
              <div className={BurgerConstructorStyles.BurgerConstructor__element}>
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
          <ConstructorElementWrapper item={selectedIngredientsBun as TItem} type={"bottom"} />
        ) : (
          <li className={`${BurgerConstructorStyles.BurgerConstructor__listItem} mt-4 pl-4 pr-4`}>
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
      <div className={`${BurgerConstructorStyles.BurgerConstructor__result} mt-10`}>
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
            !selectedIngredientsBun.name || selectedIngredientsMain.length === 0 ? true : false
          }
          onClick={handleOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
