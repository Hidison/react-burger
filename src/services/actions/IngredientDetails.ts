import { TItem } from "../../types";

export const SET_INGREDIENT: "SET_INGREDIENT" = "SET_INGREDIENT";

export interface ISetIngredientAction {
  readonly type: typeof SET_INGREDIENT;
  payload: TItem;
}

export type TIngredientDetailsActions = ISetIngredientAction;
