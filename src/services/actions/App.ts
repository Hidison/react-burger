export const SET_APP_HEIGHT: "SET_APP_HEIGHT" = "SET_APP_HEIGHT";

export interface ISetAppHeightAction {
  readonly type: typeof SET_APP_HEIGHT;
  payload: number;
}

export type TAppActions = ISetAppHeightAction;
