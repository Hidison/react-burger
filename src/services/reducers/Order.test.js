import { SET_ORDER } from "../actions/Order";
import { setOrderReducer } from "./Order";

describe("Set order reducer", () => {
  const initialState = {
    order: {},
  };

  it("should return the initial state", () => {
    expect(setOrderReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SET_ORDER", () => {
    expect(
      setOrderReducer(initialState, {
        type: SET_ORDER,
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
      order: {
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
