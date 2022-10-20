import { TMessage } from "../../types";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_GET_MESSAGE_AUTH,
  WS_SEND_MESSAGE,
  TWSActions,
} from "../actions/wsActionTypes";

type TWSState = {
  wsConnected: boolean;
  message: any;
  messages: TMessage[] | null;
  messagesAuth: TMessage[] | null;
  isError: boolean;
  isClosed: boolean;
  error?: Event;
};

const initialState: TWSState = {
  wsConnected: false,
  message: null,
  messages: null,
  messagesAuth: null,
  isError: false,
  isClosed: true,
};

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        isError: false,
        isClosed: false,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
        isError: true,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        isClosed: true,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: action.payload,
      };
    case WS_GET_MESSAGE_AUTH:
      return {
        ...state,
        error: undefined,
        messagesAuth: action.payload,
      };
    case WS_SEND_MESSAGE:
      return {
        ...state,
        error: undefined,
        message: action.payload,
      };
    default:
      return state;
  }
};
