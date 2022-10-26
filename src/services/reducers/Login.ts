import {
  UPDATE_TOKEN,
  UPDATE_TOKEN_FAILED,
  UPDATE_TOKEN_SUCCESS,
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  TLoginActions,
} from "../actions/Login";

type TLoginListState = {
  loginRequest: boolean;
  loginFailed: boolean;
  user: { email: string; name: string } | null;
};

const initialStateLogin: TLoginListState = {
  loginRequest: false,
  loginFailed: false,
  user: null,
}; 

const initialStateUpdateToken = {
  updateTokenRequest: false,
  updateTokenFailed: false,
};

export const loginReducer = (state = initialStateLogin, action: TLoginActions): TLoginListState => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        user: action.payload,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const updateTokenReducer = (state = initialStateUpdateToken, action: any) => {
  switch (action.type) {
    case UPDATE_TOKEN: {
      return {
        ...state,
        updateTokenRequest: true,
        updateTokenFailed: false,
      };
    }
    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        updateTokenRequest: false,
      };
    }
    case UPDATE_TOKEN_FAILED: {
      return {
        ...state,
        updateTokenFailed: true,
        updateTokenRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
