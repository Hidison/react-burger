export const SET_APP_HEADER_HEIGHT: "SET_APP_HEADER_HEIGHT" =
  "SET_APP_HEADER_HEIGHT";

export interface ISetAppHeaderHeightAction {
  readonly type: typeof SET_APP_HEADER_HEIGHT;
  payload: number;
}

export type TAppHeaderActions = ISetAppHeaderHeightAction;
