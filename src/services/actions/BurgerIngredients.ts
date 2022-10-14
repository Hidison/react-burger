import { TItem } from "../../types";
import * as MainApi from "../../utils/MainApi";
import { AppDispatch, AppThunk } from "../types"; 

export const GET_INGREDIENTS: "GET_INGREDIENTS" = "GET_INGREDIENTS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS;
}
export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
} 
export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  payload: TItem[];
}

export type TBurgerIngredientsActions =
  | IGetIngredientsAction
  | IGetIngredientsFailedAction
  | IGetIngredientsSuccessAction;

function getIngredientsFailed(): IGetIngredientsFailedAction {
  return {
    type: GET_INGREDIENTS_FAILED,
  };
}

export const getIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });
    MainApi.getIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch(getIngredientsFailed());
        }
      })
      .catch((err) => {
        dispatch(getIngredientsFailed());
      });
  };
};
