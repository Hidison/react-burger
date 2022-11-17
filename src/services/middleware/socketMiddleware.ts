import type { Middleware, MiddlewareAPI } from "redux";
import { TWSAction } from "../../types";
import { getCookie } from "../../utils/utils";

import type { TApplicationActions, AppDispatch, RootState } from "../types";

export const socketMiddleware = (
  wsUrl: string,
  WSActions: TWSAction,
  auth: boolean
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnectionStart,
        wsConnectionSuccess,
        wsConnectionError,
        wsConnectionClose,
        wsConnectionClosed,
        wsGetMessage,
        wsSendMessage,
      } = WSActions;

      const aToken: string | undefined = getCookie("accessToken") as string;
      const aTokenWithoutBearer = auth && aToken ? aToken.replace("Bearer ", "") : null;

      if (type === wsConnectionStart) {
        socket = aTokenWithoutBearer
          ? new WebSocket(`${wsUrl}?token=${aTokenWithoutBearer}`)
          : new WebSocket(wsUrl);
      }

      if (socket) {
        let closedByAuth = false;
        socket.onopen = (event) => {
          dispatch({ type: wsConnectionSuccess, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: wsConnectionError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({ type: wsGetMessage, payload: JSON.parse(data) });
        };

        socket.onclose = (event) => {
          dispatch({ type: wsConnectionClosed, payload: event });
          if (!closedByAuth && event.code !== 1000) {
            setTimeout(() => {
              dispatch({
                type: wsConnectionStart,
              });
            }, 5000);
          }
        };

        if (wsConnectionClose && type === wsConnectionClose && socket) {
          socket.close(1000, "Сокет закрыт");
          closedByAuth = true;
        }

        if (type === wsSendMessage) {
          const message = action.payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
