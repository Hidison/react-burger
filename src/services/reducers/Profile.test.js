import {
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from "../actions/Profile";
import { getUserReducer, initialStateUser, logoutReducer, updateUserReducer } from "./Profile";

describe("Logout reducer", () => {
  const initialState = {
    logoutRequest: false,
    logoutFailed: false,
  };

  it("should return the initial state", () => {
    expect(logoutReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle LOGOUT", () => {
    expect(
      logoutReducer(initialState, {
        type: LOGOUT,
      })
    ).toEqual({
      ...initialState,
      logoutRequest: true,
      logoutFailed: false,
    });
  });

  it("should handle LOGOUT_SUCCESS", () => {
    expect(
      logoutReducer(initialState, {
        type: LOGOUT_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      logoutRequest: false,
    });
  });

  it("should handle LOGOUT_FAILED", () => {
    expect(
      logoutReducer(initialState, {
        type: LOGOUT_FAILED,
      })
    ).toEqual({
      ...initialState,
      logoutFailed: true,
      logoutRequest: false,
    });
  });
});

describe("Get user reducer", () => {
  const initialState = initialStateUser;

  it("should return the initial state", () => {
    expect(getUserReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_USER", () => {
    expect(
      getUserReducer(initialState, {
        type: GET_USER,
      })
    ).toEqual({
      ...initialState,
      getUserRequest: true,
      getUserFailed: false,
    });
  });

  it("should handle GET_USER_SUCCESS", () => {
    expect(
      getUserReducer(initialState, {
        type: GET_USER_SUCCESS,
        payload: { email: "qwerty@mail.ru", name: "Sasha" },
      })
    ).toEqual({
      ...initialState,
      getUserRequest: false,
      user: { email: "qwerty@mail.ru", name: "Sasha" },
    });
  });

  it("should handle GET_USER_FAILED", () => {
    expect(
      getUserReducer(initialState, {
        type: GET_USER_FAILED,
      })
    ).toEqual({
      ...initialState,
      getUserFailed: true,
      getUserRequest: false,
    });
  });
});

describe("Update user reducer", () => {
  const initialState = initialStateUser;

  it("should return the initial state", () => {
    expect(updateUserReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle UPDATE_USER", () => {
    expect(
      updateUserReducer(initialState, {
        type: UPDATE_USER,
      })
    ).toEqual({
      ...initialState,
      updateUserRequest: true,
      updateUserFailed: false,
    });
  });

  it("should handle UPDATE_USER_SUCCESS", () => {
    expect(
      updateUserReducer(initialState, {
        type: UPDATE_USER_SUCCESS,
        payload: { email: "qwerty@mail.ru", name: "Alex" },
      })
    ).toEqual({
      ...initialState,
      updateUserRequest: false,
      user: { email: "qwerty@mail.ru", name: "Alex" },
    });
  });

  it("should handle UPDATE_USER_FAILED", () => {
    expect(
      updateUserReducer(initialState, {
        type: UPDATE_USER_FAILED,
      })
    ).toEqual({
      ...initialState,
      updateUserFailed: true,
      updateUserRequest: false,
    });
  });
});
