import * as MainApi from "../../utils/MainApi.js";

export const RECOVERY_PASSWORD = "RECOVERY_PASSWORD";
export const RECOVERY_PASSWORD_FAILED = "RECOVERY_PASSWORD_FAILED";
export const RECOVERY_PASSWORD_SUCCESS = "RECOVERY_PASSWORD_SUCCESS";

export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const CHANGE_PASSWORD_FAILED = "CHANGE_PASSWORD_FAILED";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";

export const SET_AUTH = "SET_AUTH";
export const HIDE_PASSWORD = "HIDE_PASSWORD";

export const SET_VALUES = "SET_VALUES";
export const SET_VALID = "SET_VALID";
export const SET_ERRORS = "SET_ERRORS";
export const SET_SUBMIT_ERROR = "SET_SUBMIT_ERROR";

function recoveryPasswordFailed() {
  return {
    type: RECOVERY_PASSWORD_FAILED,
  };
}

function changePasswordFailed() {
  return {
    type: CHANGE_PASSWORD_FAILED,
  };
}

export function recoveryPassword(email) {
  return function (dispatch) {
    dispatch({
      type: RECOVERY_PASSWORD,
    });
    MainApi.recoveryPassword(email)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: RECOVERY_PASSWORD_SUCCESS,
            success: res.success,
          });
        } else {
          dispatch(recoveryPasswordFailed());
        }
      })
      .catch((err) => {
        dispatch(recoveryPasswordFailed());
      });
  };
}

export function changePassword(password, token) {
  return function (dispatch) {
    dispatch({
      type: CHANGE_PASSWORD,
    });
    MainApi.changePassword(password, token)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
            data: data,
          });
        } else {
          dispatch(changePasswordFailed());
        }
      })
      .catch((err) => {
        dispatch(changePasswordFailed());
      });
  };
}
