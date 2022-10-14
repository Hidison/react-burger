import * as AuthApi from "../../utils/AuthApi";
import { SET_ERRORS } from "./Auth";

export const REGISTER = "REGISTER";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

function registerFailed(dispatch: any) {
  dispatch({
    type: REGISTER_FAILED,
  });
  dispatch({
    type: SET_ERRORS,
    errors: {
      name: "",
      email: "",
      password: "",
      submit: "Ошибка регистрации!",
    },
  });
}

export function register(email: string, password: string, name: string) {
  return function (dispatch: any) {
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
          registerFailed(dispatch);
        }
      })
      .catch((err) => {
        registerFailed(dispatch);
      });
  };
}
