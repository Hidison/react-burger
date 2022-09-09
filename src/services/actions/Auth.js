import * as MainApi from "../../utils/MainApi.js";

export const RECOVERY_PASSWORD = "RECOVERY_PASSWORD";
export const RECOVERY_PASSWORD_FAILED = "RECOVERY_PASSWORD_FAILED";
export const RECOVERY_PASSWORD_SUCCESS = "RECOVERY_PASSWORD_SUCCESS";

export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const CHANGE_PASSWORD_FAILED = "CHANGE_PASSWORD_FAILED";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";

export const SET_AUTH = "SET_AUTH";
export const HIDE_PASSWORD = "HIDE_PASSWORD";
export const SET_NAME = "SET_NAME";
export const SET_EMAIL = "SET_EMAIL";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_CODE = "SET_CODE";

export const SET_NAME_VALID = "SET_NAME_VALID";
export const SET_EMAIL_VALID = "SET_EMAIL_VALID";
export const SET_PASSWORD_VALID = "SET_PASSWORD_VALID";

export const SET_NAME_ERROR = "SET_NAME_ERROR";
export const SET_EMAIL_ERROR = "SET_EMAIL_ERROR";
export const SET_PASSWORD_ERROR = "SET_PASSWORD_ERROR";
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

export function validateName(e) {
  return function (dispatch) {
    if (e.target.value.length < 2) {
      dispatch({
        type: SET_NAME_ERROR,
        nameError: "Имя должно состоять минимум из 2-ух символов",
      });
      dispatch({
        type: SET_NAME_VALID,
        nameValid: false,
      });
    } else {
      dispatch({
        type: SET_NAME_ERROR,
        nameError: "",
      });
      dispatch({
        type: SET_NAME_VALID,
        nameValid: true,
      });
    }
  };
}

export function validateEmail(e) {
  return function (dispatch) {
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.test(String(e.target.value))) {
      dispatch({
        type: SET_EMAIL_ERROR,
        emailError: "Введите корректный email",
      });
      dispatch({
        type: SET_EMAIL_VALID,
        emailValid: false,
      });
    } else {
      dispatch({
        type: SET_EMAIL_ERROR,
        emailError: "",
      });
      dispatch({
        type: SET_EMAIL_VALID,
        emailValid: true,
      });
    }
  };
}

export function validatePassword(e) {
  return function (dispatch) {
    if (e.target.value.length < 6 || e.target.value.length > 20) {
      dispatch({
        type: SET_PASSWORD_ERROR,
        passwordError: "Пароль должен быть от 6 до 20 символов",
      });
      dispatch({
        type: SET_PASSWORD_VALID,
        passwordValid: false,
      });
    } else {
      dispatch({
        type: SET_PASSWORD_ERROR,
        passwordError: "",
      });
      dispatch({
        type: SET_PASSWORD_VALID,
        passwordValid: true,
      });
    }
  };
}
