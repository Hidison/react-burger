import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import { SET_SUBMIT_ERROR } from "../services/actions/Auth";
import { login } from "../services/actions/Login";
import { REGISTER_SUCCESS } from "../services/actions/Register";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { auth, email, password } = useSelector((state) => state.auth);
  const { loginFailed } = useSelector((state) => state.login);

  const location = useLocation();

  const handleLogin = () => {
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (loginFailed) {
      dispatch({
        type: SET_SUBMIT_ERROR,
        submitError: "Ошибка авторизации!",
      });
    }
  }, [dispatch, loginFailed]);

  useEffect(() => {
    if (email !== "" || password !== "" || (email === "" && password === "")) {
      dispatch({
        type: SET_SUBMIT_ERROR,
        submitError: "",
      });
    }
  }, [dispatch, email, password]);

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
    <>
      <Auth title={"Вход"} buttonTitle={"Войти"} handleClick={handleLogin} />
    </>
  );
};

export default LoginPage;
