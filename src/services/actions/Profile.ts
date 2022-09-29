import * as AuthApi from "../../utils/AuthApi";
import { SET_ERRORS } from "./Auth";
import { updateToken } from "./Login";

export const LOGOUT = "LOGOUT";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const GET_USER = "GET_USER";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";

export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";

const rToken: any = localStorage.getItem("refreshToken");

function logoutFailed() {
  return {
    type: LOGOUT_FAILED,
  };
}

function getUserFailed() {
  return {
    type: GET_USER_FAILED,
  };
}

function updateUserFailed(dispatch: any) {
  dispatch({
    type: UPDATE_USER_FAILED,
  });
  dispatch({
    type: SET_ERRORS,
    errors: {
      name: "",
      email: "",
      password: "",
      submit: "Ошибка",
    },
  });
}

export function logout(token: string) {
  return function (dispatch: any) {
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
}

export function getUser(accessToken: string) {
  return function (dispatch: any) {
    dispatch({
      type: GET_USER,
    });
    AuthApi.getUser(accessToken)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: data.user,
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
}

export function updateUser(accessToken: string, email: string, name: string) {
  return function (dispatch: any) {
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
}
