import { TMessageOrder } from "../../types";

export const SET_ORDER_DATA: "SET_ORDER_DATA" = "SET_ORDER_DATA";

export interface ISetOrderDataAction {
  readonly type: typeof SET_ORDER_DATA;
  payload: TMessageOrder;
}

export type TOrderDataActions = ISetOrderDataAction;
