import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyles from "../BurgerIngredients/BurgerIngredients.module.css";
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
        className={`${BurgerIngredientsStyles.burgerItem__countBlock} mt-1 mb-1`}
      >
        <span
          className={`${BurgerIngredientsStyles.burgerItem__count} text text_type_digits-default`}
        >
          {props.item.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={`${BurgerIngredientsStyles.burgerItem__text} text text_type_main-default`}
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
