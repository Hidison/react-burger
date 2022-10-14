import type { Middleware, MiddlewareAPI } from "redux";
import { getCookie } from "../../utils/utils";

import type { TApplicationActions, AppDispatch, RootState } from "../types";

export const socketMiddleware = (wsUrl: string, auth: boolean): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type } = action;

      const aToken: string | undefined = getCookie("accessToken") as string;

      const aTokenWithoutBearer = aToken ? aToken.replace("Bearer ", "") : null;

      if (type === "WS_CONNECTION_START") {
        !auth ? (socket = new WebSocket(wsUrl)) : (socket = null);
      }

      if (type === "WS_CONNECTION_START_AUTH") {
        auth
          ? (socket = new WebSocket(`${wsUrl}?token=${aTokenWithoutBearer}`))
          : (socket = null);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: "WS_CONNECTION_SUCCESS", payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: "WS_CONNECTION_ERROR", payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          !auth
            ? dispatch({ type: "WS_GET_MESSAGE", payload: JSON.parse(data) })
            : dispatch({
                type: "WS_GET_MESSAGE_AUTH",
                payload: JSON.parse(data),
              });
        };
        socket.onclose = (event) => {
          dispatch({ type: "WS_CONNECTION_CLOSED", payload: event });
        };

        if (type === "WS_SEND_MESSAGE") {
          const message = action.payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
