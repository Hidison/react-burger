import { SEND_ORDER, SEND_ORDER_SUCCESS, SEND_ORDER_FAILED } from "../actions/OrderDetails";
import { orderReducer } from "./OrderDetails";

describe("Order reducer", () => {
  const initialState = {
    orderRequest: false,
    orderFailed: false,
    orderNumber: 1234,
    orderIngredient: [],
  };

  it("should return the initial state", () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SEND_ORDER", () => {
    expect(
      orderReducer(initialState, {
        type: SEND_ORDER,
      })
    ).toEqual({
      ...initialState,
      orderRequest: true,
      orderFailed: false,
    });
  });

  it("should handle SEND_ORDER_SUCCESS", () => {
    expect(
      orderReducer(initialState, {
        type: SEND_ORDER_SUCCESS,
        payload: 28019,
      })
    ).toEqual({
      ...initialState,
      orderRequest: false,
      orderNumber: 28019,
    });
  });

  it("should handle SEND_ORDER_FAILED", () => {
    expect(
      orderReducer(initialState, {
        type: SEND_ORDER_FAILED,
      })
    ).toEqual({
      ...initialState,
      orderFailed: true,
      orderRequest: false,
    });
  });
});
