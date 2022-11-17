import {
  RECOVERY_PASSWORD,
  RECOVERY_PASSWORD_SUCCESS,
  RECOVERY_PASSWORD_FAILED,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  SET_AUTH,
  HIDE_PASSWORD,
  SET_VALUES,
  SET_ERRORS,
  SET_VALID,
} from "../actions/Auth";
import { initialStateAuth, recoveryReducer, changePasswordReducer, authReducer } from "./Auth";

describe("Recovery reducer", () => {
  const initialState = {
    recoveryRequest: false,
    recoveryFailed: false,
    success: false,
  };

  it("should return the initial state", () => {
    expect(recoveryReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle RECOVERY_PASSWORD", () => {
    expect(
      recoveryReducer(initialState, {
        type: RECOVERY_PASSWORD,
      })
    ).toEqual({
      recoveryRequest: true,
      recoveryFailed: false,
      success: false,
    });
  });

  it("should handle RECOVERY_PASSWORD_SUCCESS", () => {
    expect(
      recoveryReducer(initialState, {
        type: RECOVERY_PASSWORD_SUCCESS,
        payload: true,
      })
    ).toEqual({
      recoveryRequest: false,
      recoveryFailed: false,
      success: true,
    });
  });

  it("should handle RECOVERY_PASSWORD_FAILED", () => {
    expect(
      recoveryReducer(initialState, {
        type: RECOVERY_PASSWORD_FAILED,
      })
    ).toEqual({
      recoveryRequest: false,
      recoveryFailed: true,
      success: false,
    });
  });
});

describe("Change password reducer", () => {
  const initialState = {
    changePasswordRequest: false,
    changePasswordFailed: false,
    data: null,
  };

  it("should return the initial state", () => {
    expect(changePasswordReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle CHANGE_PASSWORD", () => {
    expect(
      changePasswordReducer(initialState, {
        type: CHANGE_PASSWORD,
      })
    ).toEqual({
      changePasswordRequest: true,
      changePasswordFailed: false,
      data: null,
    });
  });

  it("should handle CHANGE_PASSWORD_SUCCESS", () => {
    expect(
      changePasswordReducer(initialState, {
        type: CHANGE_PASSWORD_SUCCESS,
        payload: { success: true, message: "Password successfully reset" },
      })
    ).toEqual({
      changePasswordRequest: false,
      changePasswordFailed: false,
      data: { success: true, message: "Password successfully reset" },
    });
  });

  it("should handle CHANGE_PASSWORD_FAILED", () => {
    expect(
      changePasswordReducer(initialState, {
        type: CHANGE_PASSWORD_FAILED,
      })
    ).toEqual({
      changePasswordRequest: false,
      changePasswordFailed: true,
      data: null,
    });
  });
});

describe("Auth reducer", () => {
  const initialState = initialStateAuth;

  it("should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SET_AUTH", () => {
    expect(
      authReducer(initialState, {
        type: SET_AUTH,
        payload: true,
      })
    ).toEqual({
      ...initialState,
      auth: true,
    });

    expect(
      authReducer(initialState, {
        type: SET_AUTH,
        payload: false,
      })
    ).toEqual({
      ...initialState,
      auth: false,
    });
  });

  it("should handle HIDE_PASSWORD", () => {
    expect(
      authReducer(initialState, {
        type: HIDE_PASSWORD,
        payload: true,
      })
    ).toEqual({
      ...initialState,
      hidePassword: true,
    });

    expect(
      authReducer(initialState, {
        type: HIDE_PASSWORD,
        payload: false,
      })
    ).toEqual({
      ...initialState,
      hidePassword: false,
    });
  });

  it("should handle SET_VALUES", () => {
    expect(
      authReducer(initialState, {
        type: SET_VALUES,
        payload: { name: "Sasha", email: "sasha@mail.ru", password: "qwerty", code: "123qweq" },
      })
    ).toEqual({
      ...initialState,
      values: { name: "Sasha", email: "sasha@mail.ru", password: "qwerty", code: "123qweq" },
    });
  });

  it("should handle SET_ERRORS", () => {
    expect(
      authReducer(initialState, {
        type: SET_ERRORS,
        payload: {
          name: "Имя должно состоять минимум из 2-ух символов",
          email: "Введите корректный email",
          password: "Пароль должен быть от 6 до 20 символов",
          submit: "Ошибка регистрации!",
        },
      })
    ).toEqual({
      ...initialState,
      errors: {
        name: "Имя должно состоять минимум из 2-ух символов",
        email: "Введите корректный email",
        password: "Пароль должен быть от 6 до 20 символов",
        submit: "Ошибка регистрации!",
      },
    });
  });

  it("should handle SET_VALID", () => {
    expect(
      authReducer(initialState, {
        type: SET_VALID,
        payload: { name: true, email: false, password: false },
      })
    ).toEqual({
      ...initialState,
      valid: { name: true, email: false, password: false },
    });

    expect(
      authReducer(initialState, {
        type: SET_VALID,
        payload: { name: false, email: false, password: false },
      })
    ).toEqual({
      ...initialState,
      valid: { name: false, email: false, password: false },
    });

    expect(
      authReducer(initialState, {
        type: SET_VALID,
        payload: { name: true, email: true, password: true },
      })
    ).toEqual({
      ...initialState,
      valid: { name: true, email: true, password: true },
    });
  });
});
