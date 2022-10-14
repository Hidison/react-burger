export const SET_ORDER: "SET_ORDER" = "SET_ORDER";

export interface ISetOrderAction {
  readonly type: typeof SET_ORDER;
  payload: any;
}

export type TOrderActions = ISetOrderAction;
