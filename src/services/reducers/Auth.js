import {
  RECOVERY_PASSWORD,
  RECOVERY_PASSWORD_FAILED,
  RECOVERY_PASSWORD_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_SUCCESS,
  SET_AUTH,
  HIDE_PASSWORD,
  SET_VALUES,
  SET_VALID,
  SET_ERRORS,
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
  values: { name: "", email: "", password: "", code: "" },
  errors: { name: "", email: "", password: "", submit: "" },
  valid: { name: false, email: false, password: false },
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
    case SET_VALUES: {
      return {
        ...state,
        values: action.values,
      };
    }
    case SET_ERRORS: {
      return {
        ...state,
        errors: action.errors,
      };
    }
    case SET_VALID: {
      return {
        ...state,
        valid: action.valid,
      };
    }
    default: {
      return state;
    }
  }
};
