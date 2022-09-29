import * as AuthApi from "../../utils/AuthApi";
import { setCookie } from "../../utils/utils";
import { SET_ERRORS } from "./Auth";
import { getUser } from "./Profile";

export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const UPDATE_TOKEN_FAILED = "UPDATE_TOKEN_FAILED";
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS";

export const LOGIN = "LOGIN";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

function loginFailed(dispatch: any) {
  dispatch({
    type: LOGIN_FAILED,
  });
  dispatch({
    type: SET_ERRORS,
    errors: {
      name: "",
      email: "",
      password: "",
      submit: "Ошибка авторизации!",
    },
  });
}

function updateTokenFailed() {
  return {
    type: UPDATE_TOKEN_FAILED,
  };
}

export function login(email: string, password: string) {
  return function (dispatch: any) {
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
            user: data.user,
          });
        } else {
          loginFailed(dispatch);
        }
      })
      .catch((err) => {
        loginFailed(dispatch);
      });
  };
}

export function updateToken(token: string) {
  return function (dispatch: any) {
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
        } else {
          dispatch(updateTokenFailed());
        }
      })
      .catch((err) => {
        dispatch(updateTokenFailed());
      });
  };
}
