import {
  SET_INGREDIENTS_BUN,
  ADD_INGREDIENTS_MAIN,
  DEL_INGREDIENTS_MAIN,
  SET_TOTAL_PRICE,
  SET_INGREDIENTS_ID,
  UPDATE_SELECTED_INGREDIENTS,
} from "../actions/BurgerConstructor";

const initialStateSelIngredients = {
  selectedIngredientsBun: { price: 0 },
  selectedIngredientsMain: [],
  totalPrice: 0,
  ID: [],
};

export const selectedIngredientReducer = (
  state = initialStateSelIngredients,
  action
) => {
  switch (action.type) {
    case SET_INGREDIENTS_BUN: {
      return {
        ...state,
        selectedIngredientsBun: action.item,
      };
    }
    case ADD_INGREDIENTS_MAIN: {
      return {
        ...state,
        selectedIngredientsMain: state.selectedIngredientsMain.concat([
          action.item,
        ]),
      };
    }
    case DEL_INGREDIENTS_MAIN: {
      return {
        ...state,
        selectedIngredientsMain: action.item,
      };
    }
    case SET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice:
          state.selectedIngredientsMain.reduce(function (tot, arr) {
            return tot + arr.price;
          }, 0) +
          state.selectedIngredientsBun.price * 2,
      };
    }
    case SET_INGREDIENTS_ID: {
      return {
        ...state,
        ID: state.selectedIngredientsMain
          .map((ingredient) => {
            return ingredient._id;
          })
          .concat(state.selectedIngredientsBun._id),
      };
    }
    case UPDATE_SELECTED_INGREDIENTS: {
      return {
        ...state,
        selectedIngredientsMain: action.sortedIngredients,
      };
    }
    default: {
      return state;
    }
  }
};
