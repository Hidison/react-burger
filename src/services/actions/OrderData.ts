export const SET_ORDER_DATA: "SET_ORDER_DATA" = "SET_ORDER_DATA";

export interface ISetOrderDataAction {
  readonly type: typeof SET_ORDER_DATA;
  payload: any;
}

export type TOrderDataActions = ISetOrderDataAction;
