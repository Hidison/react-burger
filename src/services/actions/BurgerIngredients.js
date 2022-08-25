import * as MainApi from "../../utils/MainApi.js";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";

function getIngredientsFailed() {
  return {
    type: GET_INGREDIENTS_FAILED,
  };
}

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });
    MainApi.getIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data,
          });
        } else {
          dispatch(getIngredientsFailed());
        }
      })
      .catch((err) => {
        dispatch(getIngredientsFailed());
      });
  };
}
