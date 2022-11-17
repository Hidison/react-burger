export const WS_CONNECTION_START_AUTH: "WS_CONNECTION_START_AUTH" = "WS_CONNECTION_START_AUTH";
export const WS_CONNECTION_SUCCESS_AUTH: "WS_CONNECTION_SUCCESS_AUTH" =
  "WS_CONNECTION_SUCCESS_AUTH";
export const WS_CONNECTION_ERROR_AUTH: "WS_CONNECTION_ERROR_AUTH" = "WS_CONNECTION_ERROR_AUTH";
export const WS_CONNECTION_CLOSE_AUTH: "WS_CONNECTION_CLOSE_AUTH" = "WS_CONNECTION_CLOSE_AUTH";
export const WS_CONNECTION_CLOSED_AUTH: "WS_CONNECTION_CLOSED_AUTH" = "WS_CONNECTION_CLOSED_AUTH";
export const WS_GET_MESSAGE_AUTH: "WS_GET_MESSAGE_AUTH" = "WS_GET_MESSAGE_AUTH";
export const WS_SEND_MESSAGE_AUTH: "WS_SEND_MESSAGE_AUTH" = "WS_SEND_MESSAGE_AUTH";

export const WSActionsAuth = {
  wsConnectionStart: WS_CONNECTION_START_AUTH,
  wsConnectionSuccess: WS_CONNECTION_SUCCESS_AUTH,
  wsConnectionError: WS_CONNECTION_ERROR_AUTH,
  wsConnectionClose: WS_CONNECTION_CLOSE_AUTH,
  wsConnectionClosed: WS_CONNECTION_CLOSED_AUTH,
  wsGetMessage: WS_GET_MESSAGE_AUTH,
  wsSendMessage: WS_SEND_MESSAGE_AUTH,
};

export interface IWSConnectionStartAuthAction {
  readonly type: typeof WS_CONNECTION_START_AUTH;
}
export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS_AUTH;
}
export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR_AUTH;
  payload: any;
}
export interface IWSConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSE_AUTH;
}
export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED_AUTH;
}
export interface IWSGetMessageAuthAction {
  payload: any;
  readonly type: typeof WS_GET_MESSAGE_AUTH;
}
export interface IWSSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE_AUTH;
  payload: any;
}

export type TWSActionsAuth =
  | IWSConnectionStartAuthAction
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionCloseAction
  | IWSConnectionClosedAction
  | IWSGetMessageAuthAction
  | IWSSendMessageAction;
