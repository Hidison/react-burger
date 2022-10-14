import React from "react";
import { useSelector } from "react-redux";
import IngredientDetailsStyles from "./IngredientDetails.module.css";

const IngredientDetails = () => {
  const { ingredient } = useSelector((state: any) => state.ingredient);

  if (!ingredient) {
    return null;
  } else {
    return (
      <>
        <figure className={IngredientDetailsStyles.modal__imageBlock}>
          <img
            src={ingredient.image}
            alt={ingredient.name}
            className={IngredientDetailsStyles.modal__image}
          />
          <figcaption
            className={`${IngredientDetailsStyles.modal__imageText} text text_type_main-medium mt-4 mb-8`}
          >
            {ingredient.name}
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
              {ingredient.calories}
            </p>
          </li>
          <li
            className={`${IngredientDetailsStyles.modal__listItem} text text_type_main-default text_color_inactive mr-5`}
          >
            <span>Белки, г</span>
            <p className="text text_type_digits-default">
              {ingredient.proteins}
            </p>
          </li>
          <li
            className={`${IngredientDetailsStyles.modal__listItem} text text_type_main-default text_color_inactive mr-5`}
          >
            <span>Жиры, г</span>
            <p className="text text_type_digits-default">{ingredient.fat}</p>
          </li>
          <li
            className={`${IngredientDetailsStyles.modal__listItem} text text_type_main-default text_color_inactive`}
          >
            <span>Углеводы, г</span>
            <p className="text text_type_digits-default">
              {ingredient.carbohydrates}
            </p>
          </li>
        </ul>
      </>
    );
  }
};

export default IngredientDetails;
