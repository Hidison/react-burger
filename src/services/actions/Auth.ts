import * as MainApi from "../../utils/MainApi";
import { AppDispatch, AppThunk } from "../types";

export const RECOVERY_PASSWORD: "RECOVERY_PASSWORD" = "RECOVERY_PASSWORD";
export const RECOVERY_PASSWORD_FAILED: "RECOVERY_PASSWORD_FAILED" = "RECOVERY_PASSWORD_FAILED";
export const RECOVERY_PASSWORD_SUCCESS: "RECOVERY_PASSWORD_SUCCESS" = "RECOVERY_PASSWORD_SUCCESS";

export const CHANGE_PASSWORD: "CHANGE_PASSWORD" = "CHANGE_PASSWORD";
export const CHANGE_PASSWORD_FAILED: "CHANGE_PASSWORD_FAILED" = "CHANGE_PASSWORD_FAILED";
export const CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS" = "CHANGE_PASSWORD_SUCCESS";

export const SET_AUTH: "SET_AUTH" = "SET_AUTH";
export const HIDE_PASSWORD: "HIDE_PASSWORD" = "HIDE_PASSWORD";

export const SET_VALUES: "SET_VALUES" = "SET_VALUES";
export const SET_VALID: "SET_VALID" = "SET_VALID";
export const SET_ERRORS: "SET_ERRORS" = "SET_ERRORS";
export const SET_SUBMIT_ERROR: "SET_SUBMIT_ERROR" = "SET_SUBMIT_ERROR";

export interface IRecoveryPasswordAction {
  readonly type: typeof RECOVERY_PASSWORD;
}
export interface IRecoveryPasswordFailedAction {
  readonly type: typeof RECOVERY_PASSWORD_FAILED;
}
export interface IRecoveryPasswordSuccessAction {
  readonly type: typeof RECOVERY_PASSWORD_SUCCESS;
  payload: boolean;
}

export interface IChangePasswordAction {
  readonly type: typeof CHANGE_PASSWORD;
}
export interface IChangePasswordFailedAction {
  readonly type: typeof CHANGE_PASSWORD_FAILED;
}
export interface IChangePasswordSuccessAction {
  readonly type: typeof CHANGE_PASSWORD_SUCCESS;
  payload: { message: string; success: boolean };
}

export interface ISetAuthAction {
  readonly type: typeof SET_AUTH;
  payload: boolean;
}
export interface IHidePasswordAction {
  readonly type: typeof HIDE_PASSWORD;
  payload: boolean;
}

export interface ISetValuesAction {
  readonly type: typeof SET_VALUES;
  payload: { name: string; email: string; password: string; code: string };
}
export interface ISetValidAction {
  readonly type: typeof SET_VALID;
  payload: { name: boolean; email: boolean; password: boolean };
}
export interface ISetErrorsAction {
  readonly type: typeof SET_ERRORS;
  payload: { name: string; email: string; password: string; submit: string };
}
export interface ISetSubmitErrorAction {
  readonly type: typeof SET_SUBMIT_ERROR;
}

export type TAuthActions =
  | IRecoveryPasswordAction
  | IRecoveryPasswordFailedAction
  | IRecoveryPasswordSuccessAction
  | IChangePasswordAction
  | IChangePasswordFailedAction
  | IChangePasswordSuccessAction
  | ISetAuthAction
  | IHidePasswordAction
  | ISetValuesAction
  | ISetValidAction
  | ISetErrorsAction
  | ISetSubmitErrorAction;

function setPasswordError(dispatch: AppDispatch) {
  dispatch({
    type: SET_ERRORS,
    payload: {
      name: "",
      email: "",
      password: "",
      submit: "Ошибка восстановления пароля!",
    },
  });
}

function recoveryPasswordFailed(dispatch: AppDispatch) {
  dispatch({
    type: RECOVERY_PASSWORD_FAILED,
  });
  setPasswordError(dispatch);
}

function changePasswordFailed(dispatch: AppDispatch) {
  dispatch({
    type: CHANGE_PASSWORD_FAILED,
  });
  setPasswordError(dispatch);
}

export const recoveryPassword: AppThunk = (email: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: RECOVERY_PASSWORD,
    });
    MainApi.recoveryPassword(email)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: RECOVERY_PASSWORD_SUCCESS,
            payload: res.success,
          });
        } else {
          recoveryPasswordFailed(dispatch);
        }
      })
      .catch((err) => {
        recoveryPasswordFailed(dispatch);
      });
  };
};

export const changePassword: AppThunk = (password: string, token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: CHANGE_PASSWORD,
    });
    MainApi.changePassword(password, token)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
            payload: data,
          });
        } else {
          changePasswordFailed(dispatch);
        }
      })
      .catch((err) => {
        changePasswordFailed(dispatch);
      });
  };
};
