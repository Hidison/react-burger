import { SET_ORDER_DATA } from "../actions/OrderData";
import { orderDataReducer } from "./OrderData";

describe("Order data reducer", () => {
  const initialState = {
    orderData: null,
  };

  it("should return the initial state", () => {
    expect(orderDataReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SET_ORDER", () => {
    expect(
      orderDataReducer(initialState, {
        type: SET_ORDER_DATA,
        payload: {
          createdAt: "2022-10-23T19:55:25.721Z",
          ingredients: [
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733d0",
            "60d3b41abdacab0026a733c7",
          ],
          name: "Экзо-плантаго флюоресцентный бургер",
          number: 28016,
          status: "done",
          updatedAt: "2022-10-23T19:55:26.100Z",
          _id: "63559c2d9b518a001bb76c85",
        },
      })
    ).toEqual({
      ...initialState,
      orderData: {
        createdAt: "2022-10-23T19:55:25.721Z",
        ingredients: [
          "60d3b41abdacab0026a733c7",
          "60d3b41abdacab0026a733d0",
          "60d3b41abdacab0026a733c7",
        ],
        name: "Экзо-плантаго флюоресцентный бургер",
        number: 28016,
        status: "done",
        updatedAt: "2022-10-23T19:55:26.100Z",
        _id: "63559c2d9b518a001bb76c85",
      },
    });
  });
});
