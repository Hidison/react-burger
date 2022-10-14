import { TItem } from "../../types";
import {
  SET_INGREDIENTS_BUN,
  ADD_INGREDIENTS_MAIN,
  DEL_INGREDIENTS_MAIN,
  SET_TOTAL_PRICE,
  SET_INGREDIENTS_ID,
  UPDATE_SELECTED_INGREDIENTS,
  TBurgerConstructorActions,
} from "../actions/BurgerConstructor";

type TSelIngredientsListState = {
  selectedIngredientsBun:
    | TItem
    | { price: number; _id: string | null; name: string };
  selectedIngredientsMain: TItem[];
  totalPrice: number;
  ID: string[] | string;
};

const initialStateSelIngredients: TSelIngredientsListState = {
  selectedIngredientsBun: { price: 0, _id: null, name: "" },
  selectedIngredientsMain: [],
  totalPrice: 0,
  ID: [],
};

export const selectedIngredientReducer = (
  state = initialStateSelIngredients,
  action: TBurgerConstructorActions
): TSelIngredientsListState => {
  switch (action.type) {
    case SET_INGREDIENTS_BUN: {
      return {
        ...state,
        selectedIngredientsBun: action.payload,
      };
    }
    case ADD_INGREDIENTS_MAIN: {
      return {
        ...state,
        selectedIngredientsMain: state.selectedIngredientsMain.concat([
          action.payload,
        ]),
      };
    }
    case DEL_INGREDIENTS_MAIN: {
      return {
        ...state,
        selectedIngredientsMain: action.payload,
      };
    }
    case SET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice:
          state.selectedIngredientsMain.reduce(function (
            tot: number,
            arr: { price: number }
          ) {
            return tot + arr.price;
          },
          0) +
          state.selectedIngredientsBun.price * 2,
      };
    }
    case SET_INGREDIENTS_ID: {
      return {
        ...state,
        ID: state.selectedIngredientsMain
          .map((ingredient: TItem) => {
            return ingredient._id;
          })
          .concat(state.selectedIngredientsBun._id as string),
      };
    }
    case UPDATE_SELECTED_INGREDIENTS: {
      return {
        ...state,
        selectedIngredientsMain: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
