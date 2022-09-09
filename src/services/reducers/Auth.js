import {
  RECOVERY_PASSWORD,
  RECOVERY_PASSWORD_FAILED,
  RECOVERY_PASSWORD_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_SUCCESS,
  SET_AUTH,
  HIDE_PASSWORD,
  SET_NAME,
  SET_EMAIL,
  SET_PASSWORD,
  SET_CODE,
  SET_NAME_VALID,
  SET_EMAIL_VALID,
  SET_PASSWORD_VALID,
  SET_NAME_ERROR,
  SET_EMAIL_ERROR,
  SET_PASSWORD_ERROR,
  SET_SUBMIT_ERROR,
} from "../actions/Auth";

const initialStateRecovery = {
  recoveryRequest: false,
  recoveryFailed: false,
  success: false,
};

const initialStateChangePasswordRecovery = {
  changePasswordRequest: false,
  changePasswordFailed: false,
  data: null,
};

const initialStateAuth = {
  auth: false,
  hidePassword: true,
  name: "",
  email: "",
  password: "",
  code: "",
  nameValid: false,
  emailValid: false,
  passwordValid: false,
  nameError: "",
  emailError: "",
  passwordError: "",
  submitError: "",
};

export const recoveryReducer = (state = initialStateRecovery, action) => {
  switch (action.type) {
    case RECOVERY_PASSWORD: {
      return {
        ...state,
        recoveryRequest: true,
        recoveryFailed: false,
      };
    }
    case RECOVERY_PASSWORD_SUCCESS: {
      return {
        ...state,
        recoveryRequest: false,
        success: action.success,
      };
    }
    case RECOVERY_PASSWORD_FAILED: {
      return {
        ...state,
        recoveryFailed: true,
        recoveryRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const changePasswordReducer = (
  state = initialStateChangePasswordRecovery,
  action
) => {
  switch (action.type) {
    case CHANGE_PASSWORD: {
      return {
        ...state,
        changePasswordRequest: true,
        changePasswordFailed: false,
      };
    }
    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        changePasswordRequest: false,
        data: action.data,
      };
    }
    case CHANGE_PASSWORD_FAILED: {
      return {
        ...state,
        changePasswordFailed: true,
        changePasswordRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const authReducer = (state = initialStateAuth, action) => {
  switch (action.type) {
    case SET_AUTH: {
      return {
        ...state,
        auth: action.auth,
      };
    }
    case HIDE_PASSWORD: {
      return {
        ...state,
        hidePassword: action.hidePassword,
      };
    }
    case SET_NAME: {
      return {
        ...state,
        name: action.name,
      };
    }
    case SET_EMAIL: {
      return {
        ...state,
        email: action.email,
      };
    }
    case SET_PASSWORD: {
      return {
        ...state,
        password: action.password,
      };
    }
    case SET_CODE: {
      return {
        ...state,
        code: action.code,
      };
    }
    case SET_NAME_VALID: {
      return {
        ...state,
        nameValid: action.nameValid,
      };
    }
    case SET_EMAIL_VALID: {
      return {
        ...state,
        emailValid: action.emailValid,
      };
    }
    case SET_PASSWORD_VALID: {
      return {
        ...state,
        passwordValid: action.passwordValid,
      };
    }
    case SET_NAME_ERROR: {
      return {
        ...state,
        nameError: action.nameError,
      };
    }
    case SET_EMAIL_ERROR: {
      return {
        ...state,
        emailError: action.emailError,
      };
    }
    case SET_PASSWORD_ERROR: {
      return {
        ...state,
        passwordError: action.passwordError,
      };
    }
    case SET_SUBMIT_ERROR: {
      return {
        ...state,
        submitError: action.submitError,
      };
    }
    default: {
      return state;
    }
  }
};
