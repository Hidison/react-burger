import {
  LOGOUT,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  GET_USER,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  TProfileActions,
} from "../actions/Profile";

type TLogoutListState = {
  logoutRequest: boolean;
  logoutFailed: boolean;
};

type TUserListState = {
  getUserRequest: boolean;
  getUserFailed: boolean;
  updateUserRequest: boolean;
  updateUserFailed: boolean;
  user: {
    email: string;
    name: string;
  };
};

const initialStateLogout: TLogoutListState = {
  logoutRequest: false,
  logoutFailed: false,
};

const initialStateUser: TUserListState = {
  getUserRequest: false,
  getUserFailed: false,
  updateUserRequest: false,
  updateUserFailed: false,
  user: {
    email: "",
    name: "",
  },
};

export const logoutReducer = (
  state = initialStateLogout,
  action: TProfileActions
): TLogoutListState => {
  switch (action.type) {
    case LOGOUT: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const getUserReducer = (
  state = initialStateUser,
  action: TProfileActions
): TUserListState => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        user: action.payload,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserFailed: true,
        getUserRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const updateUserReducer = (state = initialStateUser, action: TProfileActions) => {
  switch (action.type) {
    case UPDATE_USER: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserFailed: false,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        user: action.payload,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserFailed: true,
        updateUserRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
