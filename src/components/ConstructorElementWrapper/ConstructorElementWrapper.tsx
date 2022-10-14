import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useMemo, useRef } from "react";
import {
  useDispatch,
  useSelector,
} from "../../services/hooks";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { DEL_INGREDIENTS_MAIN } from "../../services/actions/BurgerConstructor";
import BurgerConstructorStyles from "../BurgerConstructor/BurgerConstructor.module.css";
import { TItem, SyntheticEvent } from "../../types";

interface IConstructorElementWrapper {
  item: TItem;
  id?: string;
  index?: number;
  moveIngredient?: Function;
  type?: "top" | "bottom" | undefined;
}

const ConstructorElementWrapper: FC<IConstructorElementWrapper> = ({
  item,
  id,
  index,
  moveIngredient,
  type,
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const dispatch = useDispatch();
  const { selectedIngredientsMain } = useSelector(
    (state) => state.selectedIngredients
  );

  const delSelectedIngredient = useMemo(
    () =>
      selectedIngredientsMain.filter(
        (ingredient: TItem) => ingredient.dragId !== item.dragId
      ),
    [item.dragId, selectedIngredientsMain]
  );

  const [, drop] = useDrop({
    accept: "ingredient",
    hover: (item: TItem, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index as number;
      const hoverIndex = index as number;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: XYCoord | null = monitor.getClientOffset();
      const hoverClientY =
        clientOffset && clientOffset.y - hoverBoundingRect.top;
      if (hoverClientY) {
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
      }
      moveIngredient !== undefined && moveIngredient(dragIndex, hoverIndex);
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

  const opacityIng: string = isHoverIng ? "0" : "1";
  if (item.type !== "bun") {
    drag(drop(ref));
  }
  const preventDefault = (e: SyntheticEvent) => e.preventDefault();

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
            payload: delSelectedIngredient,
          })
        }
      />
    </li>
  );
};

export default ConstructorElementWrapper;
