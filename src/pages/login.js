import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import { SET_ERRORS } from "../services/actions/Auth";
import { login } from "../services/actions/Login";
import { REGISTER_SUCCESS } from "../services/actions/Register";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { auth, values, errors } = useSelector((state) => state.auth);
  const { loginFailed } = useSelector((state) => state.login);

  const location = useLocation();

  const handleLogin = () => {
    dispatch(login(values.email, values.password));
  };

  useEffect(() => {
    if (loginFailed) {
      dispatch({
        type: SET_ERRORS,
        errors: {
          ...errors,
          submit: "Ошибка авторизации!",
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, loginFailed]);

  useEffect(() => {
    if (values.email === "" && values.password === "") {
      dispatch({
        type: SET_ERRORS,
        errors: { name: "", email: "", password: "", submit: "" },
      });
    }
  }, [dispatch, values.email, values.password]);

  useEffect(() => {
    dispatch({
      type: REGISTER_SUCCESS,
      registerSuccess: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (auth) {
    return (
      <Redirect to={location.state ? location.state.from.pathname : "/"} />
    );
  }

  return (
    <Auth title={"Вход"} buttonTitle={"Войти"} handleClick={handleLogin} />
  );
};

export default LoginPage;
