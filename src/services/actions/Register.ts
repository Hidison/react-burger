import * as AuthApi from "../../utils/AuthApi";
import { AppDispatch, AppThunk } from "../types";
import { SET_ERRORS } from "./Auth";

export const REGISTER: "REGISTER" = "REGISTER";
export const REGISTER_FAILED: "REGISTER_FAILED" = "REGISTER_FAILED";
export const REGISTER_SUCCESS: "REGISTER_SUCCESS" = "REGISTER_SUCCESS";

export interface IRegisterAction {
  readonly type: typeof REGISTER;
}
export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
}
export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  payload?: {
    accessToken: string;
    refreshToken: string;
    success: boolean;
    user: { email: string; name: string };
  };
  registerSuccess: boolean;
}

export type TRegisterActions = IRegisterAction | IRegisterFailedAction | IRegisterSuccessAction;

function registerFailed(dispatch: AppDispatch) {
  dispatch({
    type: REGISTER_FAILED,
  });
  dispatch({
    type: SET_ERRORS,
    payload: {
      name: "",
      email: "",
      password: "",
      submit: "Ошибка регистрации!",
    },
  });
}

export const register: AppThunk = (email: string, password: string, name: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER,
    });
    AuthApi.register(email, password, name)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res,
            registerSuccess: true,
          });
        } else {
          registerFailed(dispatch);
        }
      })
      .catch((err) => {
        registerFailed(dispatch);
      });
  };
};
