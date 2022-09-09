import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { DEL_INGREDIENTS_MAIN } from "../../services/actions/BurgerConstructor";
import BurgerConstructorStyles from "../BurgerConstructor/BurgerConstructor.module.css";

const ConstructorElementWrapper = ({
  item,
  id,
  index,
  moveIngredient,
  type,
}) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { selectedIngredientsMain } = useSelector(
    (state) => state.selectedIngredients
  );

  const delSelectedIngredient = useMemo(
    () =>
      selectedIngredientsMain.filter(
        (ingredient) => ingredient.dragId !== item.dragId
      ),
    [item.dragId, selectedIngredientsMain]
  );

  const [, drop] = useDrop({
    accept: "ingredient",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isHoverIng }, drag] = useDrag({
    type: "ingredient",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isHoverIng: monitor.isDragging(),
    }),
  });

  const opacityIng = isHoverIng ? "0" : "1";
  if (item.type !== "bun") {
    drag(drop(ref));
  }
  const preventDefault = (e) => e.preventDefault();

  return (
    <li
      className={
        item.type === "bun"
          ? type === "top"
            ? `${BurgerConstructorStyles.BurgerConstructor__listItem} mb-4 pl-4 pr-4`
            : `${BurgerConstructorStyles.BurgerConstructor__listItem} mt-4 pl-4 pr-4`
          : `${BurgerConstructorStyles.BurgerConstructor__listItem} ${BurgerConstructorStyles.BurgerConstructor__listItem_main} mb-4 pl-4 pr-4`
      }
      ref={ref}
      onDrop={preventDefault}
      style={{ opacity: opacityIng }}
    >
      {item.type === "bun" ? <div></div> : <DragIcon type="primary" />}
      <ConstructorElement
        type={type}
        isLocked={item.type === "bun" ? true : false}
        text={
          item.type === "bun"
            ? type === "top"
              ? `${item.name} (верх)`
              : `${item.name} (низ)`
            : item.name
        }
        price={item.price}
        thumbnail={item.image}
        handleClose={() =>
          dispatch({
            type: DEL_INGREDIENTS_MAIN,
            item: delSelectedIngredient,
          })
        }
      />
    </li>
  );
};

ConstructorElementWrapper.propTypes = {
  item: PropTypes.object.isRequired,
  id: PropTypes.string,
  index: PropTypes.number,
  moveIngredient: PropTypes.func,
  type: PropTypes.string,
};

export default ConstructorElementWrapper;
