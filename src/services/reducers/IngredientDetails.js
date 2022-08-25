import { SET_INGREDIENT } from "../actions/IngredientDetails";

const initialStateIngredient = {
  ingredient: {},
};

export const ingredientReducer = (state = initialStateIngredient, action) => {
  switch (action.type) {
    case SET_INGREDIENT: {
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
