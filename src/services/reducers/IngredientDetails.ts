import { TItem } from "../../types";
import { SET_INGREDIENT, TIngredientDetailsActions } from "../actions/IngredientDetails";

type TIngredientListState = {
  ingredient: TItem | null;
};

const initialStateIngredient: TIngredientListState = {
  ingredient: null,
};

export const ingredientReducer = (
  state = initialStateIngredient,
  action: TIngredientDetailsActions
): TIngredientListState => {
  switch (action.type) {
    case SET_INGREDIENT: {
      return {
        ...state,
        ingredient: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
