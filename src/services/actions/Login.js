import * as AuthApi from "../../utils/AuthApi.js";
import { setCookie } from "../../utils/utils.js";
import { getUser } from "./Profile.js";

export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const UPDATE_TOKEN_FAILED = "UPDATE_TOKEN_FAILED";
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS";

export const LOGIN = "LOGIN";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

function loginFailed() {
  return {
    type: LOGIN_FAILED,
  };
}

function updateTokenFailed() {
  return {
    type: UPDATE_TOKEN_FAILED,
  };
}

export function login(email, password) {
  return function (dispatch) {
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
          dispatch(loginFailed());
        }
      })
      .catch((err) => {
        dispatch(loginFailed());
      });
  };
}

export function updateToken(token) {
  return function (dispatch) {
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
