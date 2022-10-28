export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSE: "WS_CONNECTION_CLOSE" = "WS_CONNECTION_CLOSE";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";

export const WSActionsAll = {
  wsConnectionStart: WS_CONNECTION_START,
  wsConnectionSuccess: WS_CONNECTION_SUCCESS,
  wsConnectionError: WS_CONNECTION_ERROR,
  wsConnectionClose: WS_CONNECTION_CLOSE,
  wsConnectionClosed: WS_CONNECTION_CLOSED,
  wsGetMessage: WS_GET_MESSAGE,
  wsSendMessage: WS_SEND_MESSAGE,
};

export interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: any;
}
export interface IWSConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSE;
}
export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWSGetMessageAction {
  payload: any;
  readonly type: typeof WS_GET_MESSAGE;
}
export interface IWSSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  payload: any;
}

export type TWSActionsAll =
  | IWSConnectionStartAction
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionCloseAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction
  | IWSSendMessageAction;
