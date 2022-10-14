import * as AuthApi from "../../utils/AuthApi";
import { setCookie } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../types";
import { SET_AUTH, SET_ERRORS } from "./Auth";
import { sendOrder } from "./OrderDetails";
import { getUser } from "./Profile";
import { WS_CONNECTION_START_AUTH } from "./wsActionTypes";

export const UPDATE_TOKEN: "UPDATE_TOKEN" = "UPDATE_TOKEN";
export const UPDATE_TOKEN_FAILED: "UPDATE_TOKEN_FAILED" = "UPDATE_TOKEN_FAILED";
export const UPDATE_TOKEN_SUCCESS: "UPDATE_TOKEN_SUCCESS" =
  "UPDATE_TOKEN_SUCCESS";

export const LOGIN: "LOGIN" = "LOGIN";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";

export interface IUpdateTokenAction {
  readonly type: typeof UPDATE_TOKEN;
}
export interface IUpdateTokenFailedAction {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}
export interface IUpdateTokenSuccessAction {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
}

export interface ILoginAction {
  readonly type: typeof LOGIN;
}
export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}
export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  payload: { email: string; name: string };
}

export type TLoginActions =
  | IUpdateTokenAction
  | IUpdateTokenFailedAction
  | IUpdateTokenSuccessAction
  | ILoginAction
  | ILoginFailedAction
  | ILoginSuccessAction;

function loginFailed(dispatch: AppDispatch) {
  dispatch({
    type: LOGIN_FAILED,
  });
  dispatch({
    type: SET_ERRORS,
    payload: {
      name: "",
      email: "",
      password: "",
      submit: "Ошибка авторизации!",
    },
  });
}

function updateTokenFailed(): IUpdateTokenFailedAction {
  return {
    type: UPDATE_TOKEN_FAILED,
  };
}

export const login: AppThunk = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN,
    });
    AuthApi.login(email, password)
      .then((data) => {
        if (data && data.success) {
          let authToken = data.accessToken;
          if (data.refreshToken) {
            localStorage.setItem("refreshToken", data.refreshToken);
          }
          if (authToken) {
            setCookie("accessToken", authToken, {
              "max-age": 86400,
            });
          }
          dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user,
          });
        } else {
          loginFailed(dispatch);
        }
      })
      .catch((err) => {
        loginFailed(dispatch);
      });
  };
};

export const updateToken: AppThunk = (token: string, target?, id?) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_TOKEN,
    });
    AuthApi.updateToken(token)
      .then((data) => {
        if (data && data.success) {
          localStorage.setItem("refreshToken", data.refreshToken);
          setCookie("accessToken", data.accessToken, {
            "max-age": 86400,
          });
          dispatch(getUser(data.accessToken));
          target === "postOrder" && dispatch(sendOrder(id, data.accessToken));
          target === "getOrder" &&
            dispatch({
              type: WS_CONNECTION_START_AUTH,
            });
        } else {
          dispatch({
            type: SET_AUTH,
            payload: false,
          });
          dispatch(updateTokenFailed());
        }
      })
      .catch((err) => {
        dispatch({
          type: SET_AUTH,
          payload: false,
        });
        dispatch(updateTokenFailed());
      });
  };
};
