import { TAuthActions } from "../actions/Auth";

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

type TRecoveryListState = {
  recoveryRequest: boolean;
  recoveryFailed: boolean;
  success: boolean;
};

type TChangePasswordRecoveryListState = {
  changePasswordRequest: boolean;
  changePasswordFailed: boolean;
  data: { message: string; success: boolean } | null;
};

type TAuthListState = {
  auth: boolean;
  hidePassword: boolean;
  values: { name: string; email: string; password: string; code: string };
  errors: { name: string; email: string; password: string; submit: string };
  valid: { name: boolean; email: boolean; password: boolean };
};

const initialStateRecovery: TRecoveryListState = {
  recoveryRequest: false,
  recoveryFailed: false,
  success: false,
};

const initialStateChangePasswordRecovery: TChangePasswordRecoveryListState = {
  changePasswordRequest: false,
  changePasswordFailed: false,
  data: null,
};

const initialStateAuth: TAuthListState = {
  auth: false,
  hidePassword: true,
  values: { name: "", email: "", password: "", code: "" },
  errors: { name: "", email: "", password: "", submit: "" },
  valid: { name: false, email: false, password: false },
};

export const recoveryReducer = (
  state = initialStateRecovery,
  action: TAuthActions
): TRecoveryListState => {
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
        success: action.payload,
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
  action: TAuthActions
): TChangePasswordRecoveryListState => {
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
        data: action.payload,
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

export const authReducer = (
  state = initialStateAuth,
  action: TAuthActions
): TAuthListState => {
  switch (action.type) {
    case SET_AUTH: {
      return {
        ...state,
        auth: action.payload,
      };
    }
    case HIDE_PASSWORD: {
      return {
        ...state,
        hidePassword: action.payload,
      };
    }
    case SET_VALUES: {
      return {
        ...state,
        values: action.payload,
      };
    }
    case SET_ERRORS: {
      return {
        ...state,
        errors: action.payload,
      };
    }
    case SET_VALID: {
      return {
        ...state,
        valid: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
