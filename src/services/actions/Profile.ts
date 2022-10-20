import * as AuthApi from "../../utils/AuthApi";
import { AppDispatch, AppThunk } from "../types";
import { SET_ERRORS } from "./Auth";
import { updateToken } from "./Login";

export const LOGOUT: "LOGOUT" = "LOGOUT";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";

export const GET_USER: "GET_USER" = "GET_USER";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";

export const UPDATE_USER: "UPDATE_USER" = "UPDATE_USER";
export const UPDATE_USER_FAILED: "UPDATE_USER_FAILED" = "UPDATE_USER_FAILED";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";

export interface ILogoutAction {
  readonly type: typeof LOGOUT;
}
export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
}
export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface IGetUserAction {
  readonly type: typeof GET_USER;
}
export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}
export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  payload: { email: string; name: string };
}

export interface IUpdateUserAction {
  readonly type: typeof UPDATE_USER;
}
export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
}
export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  payload: { email: string; name: string };
}

export type TProfileActions =
  | ILogoutAction
  | ILogoutFailedAction
  | ILogoutSuccessAction
  | IGetUserAction
  | IGetUserFailedAction
  | IGetUserSuccessAction
  | IUpdateUserAction
  | IUpdateUserFailedAction
  | IUpdateUserSuccessAction;

const rToken: any = localStorage.getItem("refreshToken");

function logoutFailed(): ILogoutFailedAction {
  return {
    type: LOGOUT_FAILED,
  };
}

function getUserFailed(): IGetUserFailedAction {
  return {
    type: GET_USER_FAILED,
  };
}

function updateUserFailed(dispatch: AppDispatch) {
  dispatch({
    type: UPDATE_USER_FAILED,
  });
  dispatch({
    type: SET_ERRORS,
    payload: {
      name: "",
      email: "",
      password: "",
      submit: "Ошибка",
    },
  });
}

export const logout: AppThunk = (token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT,
    });
    AuthApi.logout(token)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: LOGOUT_SUCCESS,
            message: data.message,
          });
        } else {
          dispatch(logoutFailed());
        }
      })
      .catch((err) => {
        dispatch(logoutFailed());
      });
  };
};

export const getUser: AppThunk = (accessToken: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER,
    });
    AuthApi.getUser(accessToken)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            payload: data.user,
          });
        } else {
          dispatch(getUserFailed());
        }
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          dispatch(updateToken(rToken));
        } else {
          dispatch(getUserFailed());
        }
      });
  };
};

export const updateUser: AppThunk = (accessToken: string, email: string, name: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER,
    });
    AuthApi.updateUser(accessToken, email, name)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            user: data.user,
          });
        } else {
          updateUserFailed(dispatch);
        }
      })
      .catch((err) => {
        updateUserFailed(dispatch);
      });
  };
};
