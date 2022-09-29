import * as MainApi from "../../utils/MainApi";

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

function setPasswordError(dispatch: any) {
  dispatch({
    type: SET_ERRORS,
    errors: {
      name: "",
      email: "",
      password: "",
      submit: "Ошибка восстановления пароля!",
    },
  });
}

function recoveryPasswordFailed(dispatch: any) {
  dispatch({
    type: RECOVERY_PASSWORD_FAILED,
  });
  setPasswordError(dispatch);
}

function changePasswordFailed(dispatch: any) {
  dispatch({
    type: CHANGE_PASSWORD_FAILED,
  });
  setPasswordError(dispatch);
}

export function recoveryPassword(email: string) {
  return function (dispatch: any) {
    dispatch({
      type: RECOVERY_PASSWORD,
    });
    MainApi.recoveryPassword(email)
      .then((res) => {
        console.log(res);
        if (res && res.success) {
          dispatch({
            type: RECOVERY_PASSWORD_SUCCESS,
            success: res.success,
          });
        } else {
          recoveryPasswordFailed(dispatch);
        }
      })
      .catch((err) => {
        recoveryPasswordFailed(dispatch);
      });
  };
}

export function changePassword(password: string, token: string) {
  return function (dispatch: any) {
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
          changePasswordFailed(dispatch);
        }
      })
      .catch((err) => {
        changePasswordFailed(dispatch);
      });
  };
}
