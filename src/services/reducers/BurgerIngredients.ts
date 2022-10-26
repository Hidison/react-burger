import { TItem } from "../../types";
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  TBurgerIngredientsActions,
} from "../actions/BurgerIngredients";

type TIngredientsListState = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredients: TItem[];
  bunIngredients: TItem[];
  mainIngredients: TItem[];
  sauceIngredients: TItem[];
};

const initialStateIngredients: TIngredientsListState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: [],
  bunIngredients: [],
  mainIngredients: [],
  sauceIngredients: [],
};

export const ingredientsReducer = (
  state = initialStateIngredients,
  action: TBurgerIngredientsActions
): TIngredientsListState => {
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
        ingredients: action.payload,
        ingredientsRequest: false,
        bunIngredients: action.payload.filter((item: TItem) => item.type === "bun"),
        mainIngredients: action.payload.filter((item: TItem) => item.type === "main"),
        sauceIngredients: action.payload.filter((item: TItem) => item.type === "sauce"),
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
