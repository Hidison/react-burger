import { SET_APP_HEIGHT } from "../actions/App";
import { AppReducer } from "./App";

describe("App reducer", () => {
  it("should return the initial state", () => {
    expect(AppReducer(undefined, {})).toEqual({
      heightApp: 0,
    });
  });

  it("should handle SET_APP_HEIGHT", () => {
    expect(
      AppReducer(
        {},
        {
          type: SET_APP_HEIGHT,
          payload: 800,
        }
      )
    ).toEqual({
      heightApp: 800,
    });
  });
});
