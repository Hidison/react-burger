import { REGISTER, REGISTER_FAILED, REGISTER_SUCCESS, TRegisterActions } from "../actions/Register";

type TRegisterListState = {
  registerRequest: boolean;
  registerFailed: boolean;
  registerSuccess: boolean;
  data?:
    | {
        accessToken: string;
        refreshToken: string;
        success: boolean;
        user: { email: string; name: string };
      }
    | {};
};

export const initialStateRegister: TRegisterListState = {
  registerRequest: false,
  registerFailed: false,
  registerSuccess: false,
  data: {},
};

export const registerReducer = (
  state = initialStateRegister,
  action: TRegisterActions
): TRegisterListState => {
  switch (action.type) {
    case REGISTER: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        data: action.payload,
        registerSuccess: action.registerSuccess,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
