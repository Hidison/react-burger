import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import LoginStyles from "./Auth.module.css";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AppHeader from "../AppHeader/AppHeader";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  HIDE_PASSWORD,
  SET_NAME,
  SET_EMAIL,
  SET_PASSWORD,
  SET_CODE,
  SET_NAME_VALID,
  SET_PASSWORD_VALID,
  SET_EMAIL_VALID,
  SET_NAME_ERROR,
  SET_PASSWORD_ERROR,
  SET_EMAIL_ERROR,
  validateName,
  validateEmail,
  validatePassword,
  SET_AUTH,
  SET_SUBMIT_ERROR,
  RECOVERY_PASSWORD_SUCCESS,
} from "../../services/actions/Auth";
import { getCookie } from "../../utils/utils";
import Loader from "../UI/Loader/Loader";

const Auth = ({ title, buttonTitle, handleClick }) => {
  const dispatch = useDispatch();

  const {
    auth,
    hidePassword,
    name,
    email,
    password,
    code,
    nameValid,
    passwordValid,
    emailValid,
    nameError,
    passwordError,
    emailError,
    submitError,
  } = useSelector((state) => state.auth);

  const { recoveryRequest, recoveryFailed } = useSelector(
    (state) => state.recovery
  );
  const { loginRequest, loginFailed } = useSelector((state) => state.login);

  const { registerRequest, registerFailed } = useSelector(
    (state) => state.register
  );

  const { changePasswordRequest, changePasswordFailed } = useSelector(
    (state) => state.changePassword
  );

  const aToken = getCookie("accessToken");

  useEffect(() => {
    if (aToken) {
      dispatch({
        type: SET_AUTH,
        auth: true,
      });
    }
  }, [aToken, dispatch]);

  const location = useLocation();

  const onClick = () => {
    handleClick();
    resetInputs();
  };

  const changeName = (e) => {
    dispatch({
      type: SET_NAME,
      name: e.target.value,
    });
    dispatch(validateName(e));
  };

  const changeEmail = (e) => {
    dispatch({
      type: SET_EMAIL,
      email: e.target.value,
    });
    dispatch(validateEmail(e));
  };

  const changePassword = (e) => {
    dispatch({
      type: SET_PASSWORD,
      password: e.target.value,
    });
    dispatch(validatePassword(e));
  };

  const changeCode = (e) => {
    dispatch({
      type: SET_CODE,
      code: e.target.value,
    });
  };

  const onIconClick = () => {
    dispatch({
      type: HIDE_PASSWORD,
      hidePassword: hidePassword ? false : true,
    });
  };

  const resetInputs = () => {
    dispatch({
      type: SET_NAME,
      name: "",
    });
    dispatch({
      type: SET_EMAIL,
      email: "",
    });
    dispatch({
      type: SET_PASSWORD,
      password: "",
    });
    dispatch({
      type: SET_CODE,
      code: "",
    });
    dispatch({
      type: SET_PASSWORD_VALID,
      passwordValid: false,
    });
    dispatch({
      type: SET_EMAIL_VALID,
      emailValid: false,
    });
    dispatch({
      type: SET_NAME_VALID,
      nameValid: false,
    });
    dispatch({
      type: SET_NAME_ERROR,
      nameError: "",
    });
    dispatch({
      type: SET_EMAIL_ERROR,
      emailError: "",
    });
    dispatch({
      type: SET_PASSWORD_ERROR,
      passwordError: "",
    });
    dispatch({
      type: SET_SUBMIT_ERROR,
      submitError: "",
    });
  };

  const onLinkClick = () => {
    if (location.pathname === "/reset-password") {
      dispatch({
        type: RECOVERY_PASSWORD_SUCCESS,
        success: false,
      });
    }
  };

  useEffect(() => {
    resetInputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (auth) {
    return <Redirect to="/" />;
  } else {
    return (
      <>
        <AppHeader />
        <div className={LoginStyles.login}>
          <h1 className="text text_type_main-medium">{title}</h1>
          {location.pathname === "/register" && (
            <div>
              <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={changeName}
                value={name}
                size={"default"}
              />
              <div
                className={`${LoginStyles.errorMessage} text_type_main-default`}
              >
                {nameError}
              </div>
            </div>
          )}
          {location.pathname !== "/reset-password" && (
            <div>
              <Input
                type={"email"}
                placeholder={
                  location.pathname === "/forgot-password"
                    ? "Укажите e-mail"
                    : "E-mail"
                }
                onChange={changeEmail}
                value={email}
                size={"default"}
              />
              <div
                className={`${LoginStyles.errorMessage} text_type_main-default`}
              >
                {emailError}
              </div>
            </div>
          )}
          {location.pathname === "/forgot-password" ? (
            <></>
          ) : (
            <div>
              <Input
                type={hidePassword ? "password" : "text"}
                placeholder={
                  location.pathname === "/reset-password"
                    ? "Введите новый пароль"
                    : "Пароль"
                }
                onChange={changePassword}
                value={password}
                size={"default"}
                name={"password"}
                icon={hidePassword ? "ShowIcon" : "HideIcon"}
                onIconClick={onIconClick}
              />
              <div
                className={`${LoginStyles.errorMessage} text_type_main-default`}
              >
                {passwordError}
              </div>
            </div>
          )}
          {location.pathname === "/reset-password" && (
            <Input
              type={"text"}
              placeholder={"Введите код из письма"}
              onChange={changeCode}
              value={code}
              size={"default"}
            />
          )}
          <div className={`${LoginStyles.ButtonSubmitContainer} mt-6 pl-0`}>
            <Button
              type="primary"
              size="medium"
              disabled={
                location.pathname === "/login"
                  ? !passwordValid || !emailValid
                    ? true
                    : false
                  : location.pathname === "/register"
                  ? !nameValid || !passwordValid || !emailValid
                    ? true
                    : false
                  : location.pathname === "/forgot-password"
                  ? !emailValid
                    ? true
                    : false
                  : location.pathname === "/reset-password"
                  ? !passwordValid || code === ""
                    ? true
                    : false
                  : true
              }
              onClick={onClick}
            >
              {buttonTitle}
            </Button>
            <div
              className={`${LoginStyles.errorMessage} ${LoginStyles.errorMessage_type_submit} text_type_main-default`}
            >
              {(recoveryFailed ||
                loginFailed ||
                registerFailed ||
                changePasswordFailed) &&
                submitError}
              {(recoveryRequest ||
                loginRequest ||
                registerRequest ||
                changePasswordRequest) && <Loader />}
            </div>
          </div>

          <div className={`${LoginStyles.login__moveBlock} mt-20 mb-4`}>
            <p className="text text_type_main-default text_color_inactive">
              {location.pathname === "/login"
                ? "Вы — новый пользователь?"
                : location.pathname === "/register"
                ? "Уже зарегистрированы?"
                : "Вспомнили пароль?"}
            </p>
            <Link
              to={
                location.pathname === "/login"
                  ? { pathname: "/register" }
                  : { pathname: "/login" }
              }
              onClick={onLinkClick}
              className={`${LoginStyles.login__moveRegisterText} text text_type_main-default`}
            >
              {location.pathname === "/login" ? "Зарегистрироваться" : "Войти"}
            </Link>
          </div>
          {location.pathname === "/login" && (
            <div className={LoginStyles.login__moveBlock}>
              <p className="text text_type_main-default text_color_inactive">
                Забыли пароль?
              </p>
              <Link
                to={{ pathname: "/forgot-password" }}
                className={`${LoginStyles.login__moveRegisterText} text text_type_main-default`}
              >
                Восстановить пароль
              </Link>
            </div>
          )}
        </div>
      </>
    );
  }
};

Auth.propTypes = {
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
  handleClick: PropTypes.func,
};

export default Auth;
