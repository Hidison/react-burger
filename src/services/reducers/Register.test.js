import { REGISTER, REGISTER_FAILED, REGISTER_SUCCESS } from "../actions/Register";
import { initialStateRegister, registerReducer } from "./Register";

describe("Register reducer", () => {
  const initialState = initialStateRegister;

  it("should return the initial state", () => {
    expect(registerReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle REGISTER", () => {
    expect(
      registerReducer(initialState, {
        type: REGISTER,
      })
    ).toEqual({
      ...initialState,
      registerRequest: true,
      registerFailed: false,
    });
  });

  it("should handle REGISTER_SUCCESS", () => {
    expect(
      registerReducer(initialState, {
        type: REGISTER_SUCCESS,
        payload: {
          accessToken: "Bearer eyJhbCJ9.eyJnITU2fQ._ZogBhBs",
          refreshToken: "edba52312bbd3",
          success: true,
          user: { email: "qwerty@mail.ru", name: "Sasha" },
        },
        registerSuccess: true,
      })
    ).toEqual({
      ...initialState,
      registerRequest: false,
      data: {
        accessToken: "Bearer eyJhbCJ9.eyJnITU2fQ._ZogBhBs",
        refreshToken: "edba52312bbd3",
        success: true,
        user: { email: "qwerty@mail.ru", name: "Sasha" },
      },
      registerSuccess: true,
    });

    expect(
      registerReducer(initialState, {
        type: REGISTER_SUCCESS,
        payload: {},
        registerSuccess: false,
      })
    ).toEqual({
      ...initialState,
      data: {},
      registerSuccess: false,
    });
  });

  it("should handle REGISTER_FAILED", () => {
    expect(
      registerReducer(initialState, {
        type: REGISTER_FAILED,
      })
    ).toEqual({
      ...initialState,
      registerFailed: true,
      registerRequest: false,
    });
  });
});
