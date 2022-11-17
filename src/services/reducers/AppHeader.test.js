import { SET_APP_HEADER_HEIGHT } from "../actions/AppHeader";
import { AppHeaderReducer } from "./AppHeader";

describe("App Header reducer", () => {
  it("should return the initial state", () => {
    expect(AppHeaderReducer(undefined, {})).toEqual({
      heightHeader: 0,
    });
  });

  it("should handle SET_APP_HEADER_HEIGHT", () => {
    expect(
      AppHeaderReducer(
        {},
        {
          type: SET_APP_HEADER_HEIGHT,
          payload: 200,
        }
      )
    ).toEqual({
      heightHeader: 200,
    });
  });
});
