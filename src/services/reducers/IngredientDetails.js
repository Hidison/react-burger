import { SEL_INGREDIENT } from "../actions/IngredientDetails";

const initialStateIngredient = {
  ingredient: {},
};

export const ingredientReducer = (state = initialStateIngredient, action) => {
  switch (action.type) {
    case SEL_INGREDIENT: {
      return {
        ...state,
        ingredient: action.item,
      };
    }
    default: {
      return state;
    }
  }
};
