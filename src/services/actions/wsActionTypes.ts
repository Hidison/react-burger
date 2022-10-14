export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_START_AUTH: "WS_CONNECTION_START_AUTH" = "WS_CONNECTION_START_AUTH";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_GET_MESSAGE_AUTH: "WS_GET_MESSAGE_AUTH" = "WS_GET_MESSAGE_AUTH";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";

export interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWSConnectionStartAuthAction {
  readonly type: typeof WS_CONNECTION_START_AUTH;
}
export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: any;
}
export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWSGetMessageAction {
  payload: any;
  readonly type: typeof WS_GET_MESSAGE;
}
export interface IWSGetMessageAuthAction {
  payload: any;
  readonly type: typeof WS_GET_MESSAGE_AUTH;
}
export interface IWSSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  payload: any;
}

export type TWSActions =
  | IWSConnectionStartAction
  | IWSConnectionStartAuthAction
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction
  | IWSGetMessageAuthAction
  | IWSSendMessageAction;
