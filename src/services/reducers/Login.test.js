import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  UPDATE_TOKEN,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,
} from "../actions/Login";
import { loginReducer, updateTokenReducer } from "./Login";

describe("Login reducer", () => {
  const initialState = {
    loginRequest: false,
    loginFailed: false,
    user: null,
  };

  it("should return the initial state", () => {
    expect(loginReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle LOGIN", () => {
    expect(
      loginReducer(initialState, {
        type: LOGIN,
      })
    ).toEqual({
      ...initialState,
      loginRequest: true,
      loginFailed: false,
    });
  });

  it("should handle LOGIN_SUCCESS", () => {
    expect(
      loginReducer(initialState, {
        type: LOGIN_SUCCESS,
        payload: { email: "qwerty@mail.ru", name: "Sasha" },
      })
    ).toEqual({
      ...initialState,
      loginRequest: false,
      user: { email: "qwerty@mail.ru", name: "Sasha" },
    });
  });

  it("should handle LOGIN_FAILED", () => {
    expect(
      loginReducer(initialState, {
        type: LOGIN_FAILED,
      })
    ).toEqual({
      ...initialState,
      loginFailed: true,
      loginRequest: false,
    });
  });
});

describe("Update token reducer", () => {
  const initialState = {
    updateTokenRequest: false,
    updateTokenFailed: false,
  };

  it("should return the initial state", () => {
    expect(updateTokenReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle UPDATE_TOKEN", () => {
    expect(
      updateTokenReducer(initialState, {
        type: UPDATE_TOKEN,
      })
    ).toEqual({
      ...initialState,
      updateTokenRequest: true,
      updateTokenFailed: false,
    });
  });

  it("should handle UPDATE_TOKEN_SUCCESS", () => {
    expect(
      updateTokenReducer(initialState, {
        type: UPDATE_TOKEN_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      updateTokenRequest: false,
    });
  });

  it("should handle UPDATE_TOKEN_FAILED", () => {
    expect(
      updateTokenReducer(initialState, {
        type: UPDATE_TOKEN_FAILED,
      })
    ).toEqual({
      ...initialState,
      updateTokenFailed: true,
      updateTokenRequest: false,
    });
  });
});
