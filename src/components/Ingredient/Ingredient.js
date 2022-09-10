import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import IngredientStyles from "./Ingredient.module.css";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useEffect, useMemo } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { SET_INGREDIENT } from "../../services/actions/IngredientDetails";
import { getIngIdFromLocation } from "../../utils/utils";

const Ingredient = ({ item, handleOpenModal }) => {
  const dispatch = useDispatch();
  const { ID } = useSelector((state) => state.selectedIngredients);
  const { ingredients } = useSelector((state) => state.ingredients);
  const ingredientId = item["_id"];

  const location = useLocation();
  const history = useHistory();
  const ingredientIdFromlocation = getIngIdFromLocation(
    history.location.pathname
  );

  const ingredient = useMemo(
    () => ingredients.find((item) => item._id === ingredientIdFromlocation),
    [ingredientIdFromlocation, ingredients]
  );

  const countIngredients = useMemo(
    () => ID.filter((el) => item._id.indexOf(el) > -1),
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

  const opacity = isHover ? "0.5" : "1";

  useEffect(() => {
    dispatch({
      type: SET_INGREDIENT,
      item: ingredient,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientIdFromlocation]);

  const handleIngredientClick = () => {
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

Ingredient.propTypes = {
  item: PropTypes.object.isRequired,
  handleOpenModal: PropTypes.func,
};

export default Ingredient;
