import { TItem } from "../../types";

export const SET_INGREDIENTS_BUN: "SET_INGREDIENTS_BUN" = "SET_INGREDIENTS_BUN";
export const DEL_INGREDIENTS_MAIN: "DEL_INGREDIENTS_MAIN" = "DEL_INGREDIENTS_MAIN";
export const SET_TOTAL_PRICE: "SET_TOTAL_PRICE" = "SET_TOTAL_PRICE";
export const ADD_INGREDIENTS_MAIN: "ADD_INGREDIENTS_MAIN" = "ADD_INGREDIENTS_MAIN";
export const SET_INGREDIENTS_ID: "SET_INGREDIENTS_ID" = "SET_INGREDIENTS_ID";
export const UPDATE_SELECTED_INGREDIENTS: "UPDATE_SELECTED_INGREDIENTS" =
  "UPDATE_SELECTED_INGREDIENTS";

export interface ISetIngredientsBunAction {
  readonly type: typeof SET_INGREDIENTS_BUN;
  payload: TItem;
}
export interface IDelIngredientsBunAction {
  readonly type: typeof DEL_INGREDIENTS_MAIN;
  payload: TItem[];
}
export interface ISetTotalPriceAction {
  readonly type: typeof SET_TOTAL_PRICE;
}

export interface IAddIngredientsMainAction {
  readonly type: typeof ADD_INGREDIENTS_MAIN;
  payload: TItem;
}
export interface ISetIngredientsIdAction {
  readonly type: typeof SET_INGREDIENTS_ID;
}
export interface IUpdateSelectedIngredientsAction {
  readonly type: typeof UPDATE_SELECTED_INGREDIENTS;
  payload: TItem[];
}

export type TBurgerConstructorActions =
  | ISetIngredientsBunAction
  | IDelIngredientsBunAction
  | ISetTotalPriceAction
  | IAddIngredientsMainAction
  | ISetIngredientsIdAction
  | IUpdateSelectedIngredientsAction;
