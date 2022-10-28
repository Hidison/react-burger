import { TMessage } from "../../types";
import {
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_GET_MESSAGE_AUTH,
  WS_SEND_MESSAGE_AUTH,
  TWSActionsAuth,
} from "../actions/wsActionTypesAuth";

type TWSAuthState = {
  wsConnected: boolean;
  message: any;
  messages: TMessage[] | null;
  isError: boolean;
  isClosed: boolean;
  error?: Event;
};

export const initialStateWsReducerAuth: TWSAuthState = {
  wsConnected: false,
  message: null,
  messages: null,
  isError: false,
  isClosed: true,
};

export const wsReducerAuth = (
  state = initialStateWsReducerAuth,
  action: TWSActionsAuth
): TWSAuthState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_AUTH:
      return {
        ...state,
        wsConnected: true,
        isError: false,
        isClosed: false,
      };

    case WS_CONNECTION_ERROR_AUTH:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
        isError: true,
      };

    case WS_CONNECTION_CLOSED_AUTH:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        isClosed: true,
      };

    case WS_GET_MESSAGE_AUTH:
      return {
        ...state,
        error: undefined,
        messages: action.payload,
      };
    case WS_SEND_MESSAGE_AUTH:
      return {
        ...state,
        error: undefined,
        message: action.payload,
      };
    default:
      return state;
  }
};
