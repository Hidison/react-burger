import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import LoginStyles from "./Auth.module.css";
import React, { FC, useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks";
import {
  HIDE_PASSWORD,
  SET_AUTH,
  RECOVERY_PASSWORD_SUCCESS,
  SET_ERRORS,
} from "../../services/actions/Auth";
import { getCookie } from "../../utils/utils";
import Loader from "../UI/Loader/Loader";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { SyntheticEvent } from "../../types";

interface IAuthProps {
  title: string;
  buttonTitle: string;
  handleClick: Function;
}

const Auth: FC<IAuthProps> = ({ title, buttonTitle, handleClick }) => {
  const dispatch = useDispatch();
  const { handleChange, resetForm } = useFormAndValidation();

  const { auth, hidePassword, values, errors, valid } = useSelector((state) => state.auth);

  const { recoveryRequest, recoveryFailed } = useSelector((state) => state.recovery);
  const { loginRequest, loginFailed } = useSelector((state) => state.login);

  const { registerRequest, registerFailed } = useSelector((state) => state.register);

  const { changePasswordRequest, changePasswordFailed } = useSelector(
    (state) => state.changePassword
  );

  const aToken = getCookie("accessToken");

  useEffect(() => {
    if (aToken) {
      dispatch({
        type: SET_AUTH,
        payload: true,
      });
    }
  }, [aToken, dispatch]);

  const location = useLocation();

  const onClick = (e: SyntheticEvent) => {
    e.preventDefault();
    handleClick();
    resetForm();
  };

  const onIconClick = () => {
    dispatch({
      type: HIDE_PASSWORD,
      payload: hidePassword ? false : true,
    });
  };

  const onLinkClick = () => {
    if (location.pathname === "/reset-password") {
      dispatch({
        type: RECOVERY_PASSWORD_SUCCESS,
        payload: false,
      });
    }
  };

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetError = () => {
    dispatch({
      type: SET_ERRORS,
      payload: {
        ...errors,
        submit: "",
      },
    });
  };

  if (auth) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className={LoginStyles.login}>
        <h1 className="text text_type_main-medium mb-6">{title}</h1>
        <form onSubmit={onClick} autoComplete="off">
          {location.pathname === "/register" && (
            <div>
              <Input
                type={"text"}
                name={"name"}
                placeholder={"??????"}
                onChange={handleChange}
                onFocus={resetError}
                value={values.name || ""}
                size={"default"}
              />
              <div className={`${LoginStyles.errorMessage} text_type_main-default`}>
                {errors.name}
              </div>
            </div>
          )}
          {location.pathname !== "/reset-password" && (
            <div>
              <Input
                type={"email"}
                name={"email"}
                placeholder={location.pathname === "/forgot-password" ? "?????????????? e-mail" : "E-mail"}
                onChange={handleChange}
                onFocus={resetError}
                value={values.email || ""}
                size={"default"}
              />
              <div className={`${LoginStyles.errorMessage} text_type_main-default`}>
                {errors.email}
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
                  location.pathname === "/reset-password" ? "?????????????? ?????????? ????????????" : "????????????"
                }
                onChange={handleChange}
                onFocus={resetError}
                value={values.password || ""}
                size={"default"}
                name={"password"}
                icon={hidePassword ? "ShowIcon" : "HideIcon"}
                onIconClick={onIconClick}
              />
              <div className={`${LoginStyles.errorMessage} text_type_main-default`}>
                {errors.password}
              </div>
            </div>
          )}
          {location.pathname === "/reset-password" && (
            <Input
              type={"text"}
              name={"code"}
              placeholder={"?????????????? ?????? ???? ????????????"}
              onChange={handleChange}
              onFocus={resetError}
              value={values.code || ""}
              size={"default"}
            />
          )}
          <div className={`${LoginStyles.ButtonSubmitContainer} mt-6 pl-0`}>
            <Button
              type="primary"
              size="medium"
              disabled={
                location.pathname === "/login"
                  ? !valid.password || !valid.email
                    ? true
                    : false
                  : location.pathname === "/register"
                  ? !valid.name || !valid.password || !valid.email
                    ? true
                    : false
                  : location.pathname === "/forgot-password"
                  ? !valid.email
                    ? true
                    : false
                  : location.pathname === "/reset-password"
                  ? !valid.password || values.code === ""
                    ? true
                    : false
                  : true
              }
            >
              {buttonTitle}
            </Button>

            <div
              className={`${LoginStyles.errorMessage} ${LoginStyles.errorMessage_type_submit} text_type_main-default`}
            >
              {(recoveryFailed || loginFailed || registerFailed || changePasswordFailed) &&
                errors.submit}
              {(recoveryRequest || loginRequest || registerRequest || changePasswordRequest) && (
                <Loader />
              )}
            </div>
          </div>
        </form>
        <div className={`${LoginStyles.login__moveBlock} mt-20 mb-4`}>
          <p className="text text_type_main-default text_color_inactive">
            {location.pathname === "/login"
              ? "????????? ?????????? ?????????????????????????"
              : location.pathname === "/register"
              ? "?????? ?????????????????????????????????"
              : "?????????????????? ?????????????"}
          </p>
          <Link
            to={location.pathname === "/login" ? { pathname: "/register" } : { pathname: "/login" }}
            onClick={onLinkClick}
            className={`${LoginStyles.login__moveRegisterText} text text_type_main-default`}
          >
            {location.pathname === "/login" ? "????????????????????????????????????" : "??????????"}
          </Link>
        </div>
        {location.pathname === "/login" && (
          <div className={LoginStyles.login__moveBlock}>
            <p className="text text_type_main-default text_color_inactive">???????????? ?????????????</p>
            <Link
              to={{ pathname: "/forgot-password" }}
              className={`${LoginStyles.login__moveRegisterText} text text_type_main-default`}
            >
              ???????????????????????? ????????????
            </Link>
          </div>
        )}
      </div>
    );
  }
};

export default Auth;
