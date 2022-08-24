import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../actions/BurgerIngredients";

const initialStateIngredients = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: [],
  bunIngredients: [],
  mainIngredients: [],
  sauceIngredients: [],
};

export const ingredientsReducer = (state = initialStateIngredients, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
        bunIngredients: action.ingredients.filter(
          (item) => item.type === "bun"
        ),
        mainIngredients: action.ingredients.filter(
          (item) => item.type === "main"
        ),
        sauceIngredients: action.ingredients.filter(
          (item) => item.type === "sauce"
        ),
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
