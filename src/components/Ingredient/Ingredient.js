import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import IngredientStyles from "./Ingredient.module.css";
import PropTypes from "prop-types";
import { SEL_INGREDIENT } from "../../services/actions/IngredientDetails";
import { useDrag } from "react-dnd";

const Ingredient = ({ item, handleOpenModal }) => {
  const dispatch = useDispatch();
  const { ID } = useSelector((state) => state.selectedIngredients);

  const countIngredients = ID.filter((el) => item._id.indexOf(el) > -1);

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

  const handleIngredientClick = () => {
    dispatch({
      type: SEL_INGREDIENT,
      item,
    });
    handleOpenModal();
  };

  return (
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
  );
};

Ingredient.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Ingredient;
