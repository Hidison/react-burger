import {
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_GET_MESSAGE_AUTH,
  WS_SEND_MESSAGE_AUTH,
} from "../actions/wsActionTypesAuth";
import { initialStateWsReducerAuth, wsReducerAuth } from "./wsReducerAuth";

describe("Ws reducer", () => {
  const initialState = initialStateWsReducerAuth;

  it("should return the initial state", () => {
    expect(wsReducerAuth(undefined, {})).toEqual(initialState);
  });

  it("should handle WS_CONNECTION_SUCCESS_AUTH", () => {
    expect(
      wsReducerAuth(initialState, {
        type: WS_CONNECTION_SUCCESS_AUTH,
      })
    ).toEqual({
      ...initialState,
      wsConnected: true,
      isError: false,
      isClosed: false,
    });
  });

  it("should handle WS_CONNECTION_ERROR_AUTH", () => {
    expect(
      wsReducerAuth(initialState, {
        type: WS_CONNECTION_ERROR_AUTH,
        payload: {
          isTrusted: true,
          bubbles: false,
          cancelBubble: false,
          type: "error",
        },
      })
    ).toEqual({
      ...initialState,
      error: {
        isTrusted: true,
        bubbles: false,
        cancelBubble: false,
        type: "error",
      },
      wsConnected: false,
      isError: true,
    });
  });

  it("should handle WS_CONNECTION_CLOSED_AUTH", () => {
    expect(
      wsReducerAuth(initialState, {
        type: WS_CONNECTION_CLOSED_AUTH,
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: false,
      isClosed: true,
    });
  });

  it("should handle WS_GET_MESSAGE_AUTH", () => {
    expect(
      wsReducerAuth(initialState, {
        type: WS_GET_MESSAGE_AUTH,
        payload: {
          orders: [
            {
              createdAt: "2022-10-23T22:01:13.084Z",
              ingredients: ["60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733c7"],
              name: "Space флюоресцентный бургер",
              number: 28019,
              status: "done",
              updatedAt: "2022-10-23T22:01:13.403Z",
              _id: "6355b9a99b518a001bb76cc5",
            },
            {
              createdAt: "2022-10-23T19:03:24.050Z",
              ingredients: ["60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733c7"],
              name: "Space флюоресцентный бургер",
              number: 28013,
              status: "done",
              updatedAt: "2022-10-23T19:03:24.380Z",
              _id: "63558ffc9b518a001bb76c5c",
            },
          ],
          success: true,
          total: 27928,
          totalToday: 129,
        },
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      messages: {
        orders: [
          {
            createdAt: "2022-10-23T22:01:13.084Z",
            ingredients: ["60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733c7"],
            name: "Space флюоресцентный бургер",
            number: 28019,
            status: "done",
            updatedAt: "2022-10-23T22:01:13.403Z",
            _id: "6355b9a99b518a001bb76cc5",
          },
          {
            createdAt: "2022-10-23T19:03:24.050Z",
            ingredients: ["60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733c7"],
            name: "Space флюоресцентный бургер",
            number: 28013,
            status: "done",
            updatedAt: "2022-10-23T19:03:24.380Z",
            _id: "63558ffc9b518a001bb76c5c",
          },
        ],
        success: true,
        total: 27928,
        totalToday: 129,
      },
    });
  });

  it("should handle WS_SEND_MESSAGE_AUTH", () => {
    expect(
      wsReducerAuth(initialState, {
        type: WS_SEND_MESSAGE_AUTH,
        payload: {},
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      message: {},
    });
  });
});
