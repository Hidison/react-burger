import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/hooks";
import IngredientStyles from "./Ingredient.module.css";
import { useDrag } from "react-dnd";
import { FC, MouseEventHandler, useEffect, useMemo } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { SET_INGREDIENT } from "../../services/actions/IngredientDetails";
import { getIngIdFromLocation } from "../../utils/utils";
import { TItem } from "../../types";

interface IIngredient {
  item: TItem;
  handleOpenModal: Function;
}

const Ingredient: FC<IIngredient> = ({ item, handleOpenModal }) => {
  const dispatch = useDispatch();
  const { ID } = useSelector((state) => state.selectedIngredients);
  const { ingredients } = useSelector((state) => state.ingredients);
  const ingredientId = item["_id"];

  const location = useLocation();
  const history = useHistory();
  const ingredientIdFromlocation: string = getIngIdFromLocation(
    history.location.pathname
  );

  const ingredient = useMemo(
    () =>
      ingredients.find((item: TItem) => item._id === ingredientIdFromlocation),
    [ingredientIdFromlocation, ingredients]
  );

  const countIngredients = useMemo(
    () => (ID as string[]).filter((el: string) => item._id.indexOf(el) > -1),
    [ID, item._id]
  );

  const [{ isHover }, bunRef] = useDrag({
    type: "ingredientBun",
    item: { ...item },
    collect: (monitor) => ({
      isHover: monitor.isDragging(),
    }),
  });

  const [, mainRef] = useDrag({
    type: "ingredientMain",
    item: { ...item },
  });

  const opacity: string = isHover ? "0.5" : "1";

  useEffect(() => {
    dispatch({
      type: SET_INGREDIENT,
      payload: ingredient as TItem,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientIdFromlocation]);

  const handleIngredientClick: MouseEventHandler = () => {
    handleOpenModal();
  };

  return (
    <Link
      key={ingredientId}
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      className={IngredientStyles.link}
    >
      <div
        onClick={handleIngredientClick}
        ref={item.type === "bun" ? bunRef : mainRef}
        style={{ opacity: opacity }}
      >
        <img src={item.image} alt="иконка карточки" className="ml-4 mr-4" />
        <Counter
          count={
            item.type === "bun"
              ? countIngredients.length * 2
              : countIngredients.length
          }
          size="default"
        />
        <div className={`${IngredientStyles.burgerItem__countBlock} mt-1 mb-1`}>
          <span
            className={`${IngredientStyles.burgerItem__count} text text_type_digits-default`}
          >
            {item.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <p
          className={`${IngredientStyles.burgerItem__text} text text_type_main-default`}
        >
          {item.name}
        </p>
      </div>
    </Link>
  );
};

export default Ingredient;
