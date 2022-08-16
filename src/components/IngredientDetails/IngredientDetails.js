import React from "react";
import IngredientDetailsStyles from "./IngredientDetails.module.css";
import PropTypes from "prop-types";

const IngredientDetails = (props) => {
  return (
    <>
      <figure className={IngredientDetailsStyles.modal__imageBlock}>
        <img
          src={props.selectedIngredient.image}
          alt={props.selectedIngredient.name}
          className={IngredientDetailsStyles.modal__image}
        />
        <figcaption
          className={`${IngredientDetailsStyles.modal__imageText} text text_type_main-medium mt-4 mb-8`}
        >
          {props.selectedIngredient.name}
        </figcaption>
      </figure>
      <ul className={`${IngredientDetailsStyles.modal__list} mb-15`}>
        <li
          className={`${IngredientDetailsStyles.modal__listItem} text text_type_main-default text_color_inactive mr-5`}
        >
          <span className={IngredientDetailsStyles.modal__listItemTitle}>
            Калории,ккал
          </span>
          <p className="text text_type_digits-default">
            {props.selectedIngredient.calories}
          </p>
        </li>
        <li
          className={`${IngredientDetailsStyles.modal__listItem} text text_type_main-default text_color_inactive mr-5`}
        >
          <span>Белки, г</span>
          <p className="text text_type_digits-default">
            {props.selectedIngredient.proteins}
          </p>
        </li>
        <li
          className={`${IngredientDetailsStyles.modal__listItem} text text_type_main-default text_color_inactive mr-5`}
        >
          <span>Жиры, г</span>
          <p className="text text_type_digits-default">
            {props.selectedIngredient.fat}
          </p>
        </li>
        <li
          className={`${IngredientDetailsStyles.modal__listItem} text text_type_main-default text_color_inactive`}
        >
          <span>Углеводы, г</span>
          <p className="text text_type_digits-default">
            {props.selectedIngredient.carbohydrates}
          </p>
        </li>
      </ul>
    </>
  );
};

IngredientDetails.propTypes = {
  selectedIngredient: PropTypes.object.isRequired,
};

export default IngredientDetails;
