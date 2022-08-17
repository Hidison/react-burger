import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientStyles from "./Ingredient.module.css";
import PropTypes from "prop-types";

const Ingredient = (props) => {
  const handleIngredientClick = () => {
    props.setSelectedIngredient(props.item);
    props.handleOpenModal();
  };

  return (
    <div onClick={handleIngredientClick}>
      <img src={props.item.image} alt="иконка карточки" className="ml-4 mr-4" />
      <Counter count={1} size="default" />
      <div
        className={`${IngredientStyles.burgerItem__countBlock} mt-1 mb-1`}
      >
        <span
          className={`${IngredientStyles.burgerItem__count} text text_type_digits-default`}
        >
          {props.item.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={`${IngredientStyles.burgerItem__text} text text_type_main-default`}
      >
        {props.item.name}
      </p>
    </div>
  );
};

Ingredient.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Ingredient;
