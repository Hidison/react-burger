import * as AuthApi from "../../utils/AuthApi.js";

export const REGISTER = "REGISTER";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

function registerFailed() {
  return {
    type: REGISTER_FAILED,
  };
}

export function register(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: REGISTER,
    });
    AuthApi.register(email, password, name)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            data: res,
            registerSuccess: true,
          });
        } else {
          dispatch(registerFailed());
        }
      })
      .catch((err) => {
        dispatch(registerFailed());
      });
  };
}
