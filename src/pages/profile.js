import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef, useState } from "react";
import ProfileStyles from "./profile.module.css";
import LoginStyles from "../components/Auth/Auth.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  SET_AUTH,
  SET_ERRORS,
  SET_VALID,
  SET_VALUES,
} from "../services/actions/Auth";
import { getUser, logout, updateUser } from "../services/actions/Profile";
import { deleteCookie, getCookie } from "../utils/utils";
import Loader from "../components/UI/Loader/Loader";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

const ProfilePage = () => {
  const [disabledName, setDisabledName] = useState(true);
  const [disabledEmail, setDisabledEmail] = useState(true);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [successfulUpdateMsg, setSuccessfulUpdateMsg] = useState("");
  const dispatch = useDispatch();

  const location = useLocation();

  const { values, errors, valid } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { updateUserRequest, updateUserFailed } = useSelector(
    (state) => state.updatedUser
  );
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const { handleChange } = useFormAndValidation();

  useEffect(() => {
    if (!disabledName) {
      nameRef.current.focus();
    }
    if (!disabledEmail) {
      emailRef.current.focus();
    }
  }, [disabledEmail, disabledName]);

  const aToken = getCookie("accessToken");
  const rToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    if (user) {
      dispatch({
        type: SET_VALUES,
        values: { ...values, name: user.name, email: user.email },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user]);

  useEffect(() => {
    dispatch({
      type: SET_VALID,
      valid: { ...valid, name: true, email: true },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const updateUserInfo = (e) => {
    e.preventDefault();
    dispatch(updateUser(aToken, values.email, values.name));
    if (!disabledName) {
      nameRef.current.blur();
    }
    if (!disabledEmail) {
      emailRef.current.blur();
    }
  };

  useEffect(() => {
    if (updateUserFailed) {
      setSuccessfulUpdateMsg("Ошибка.");
    } else if (updateUserRequest) {
      setSuccessfulUpdateMsg("Загрузка...");
    } else {
      setSuccessfulUpdateMsg("");
      dispatch(getUser(aToken));
    }
  }, [aToken, dispatch, updateUserFailed, updateUserRequest]);

  const cancelUpdateUserInfo = () => {
    dispatch({
      type: SET_VALUES,
      values: { name: user.name, email: user.email },
    });
    dispatch({
      type: SET_ERRORS,
      errors: {
        ...errors,
        name: "",
        email: "",
      },
    });
    setSuccessfulUpdateMsg("");
  };

  const logoutSistem = () => {
    dispatch(logout(rToken));
    if (rToken) {
      deleteCookie("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch({
        type: SET_AUTH,
        auth: false,
      });
    }
  };

  const resetError = () => {
    setSuccessfulUpdateMsg("");
  };

  useEffect(() => {
    if (user === null) {
      setSaveButtonDisabled(true);
    } else if (values.name === user.name && values.email === user.email) {
      setSaveButtonDisabled(true);
    } else if (!valid.name || !valid.email) {
      setSaveButtonDisabled(true);
    } else {
      setSaveButtonDisabled(false);
    }
  }, [user, valid.email, valid.name, values.email, values.name]);

  return (
    <main className={ProfileStyles.main}>
      <section>
        <nav className={ProfileStyles.nav}>
          <span className={ProfileStyles.linkBlock}>
            <Link
              to="/profile"
              className={
                location.pathname === "/profile"
                  ? `${ProfileStyles.link} ${ProfileStyles.linkActive} text text_type_main-medium`
                  : `${ProfileStyles.link} ${ProfileStyles.linkDisabled} text text_type_main-medium text_color_inactive`
              }
            >
              Профиль
            </Link>
          </span>
          <span className={ProfileStyles.linkBlock}>
            <Link
              to="/profile/orders"
              className={
                location.pathname === "/profile/orders"
                  ? `${ProfileStyles.link} ${ProfileStyles.linkActive} text text_type_main-medium`
                  : `${ProfileStyles.link} ${ProfileStyles.linkDisabled} text text_type_main-medium text_color_inactive`
              }
            >
              История заказов
            </Link>
          </span>
          <span className={ProfileStyles.linkBlock}>
            <button
              onClick={logoutSistem}
              to="/"
              className={
                location.pathname === "/profile/orders/:id"
                  ? `${ProfileStyles.link} ${ProfileStyles.linkActive} text text_type_main-medium`
                  : `${ProfileStyles.link} ${ProfileStyles.linkDisabled} text text_type_main-medium text_color_inactive`
              }
            >
              Выход
            </button>
          </span>
          <p
            className={`${ProfileStyles.text} text text_type_main-default text_color_inactive mt-20`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </nav>
      </section>
      <section className={`${ProfileStyles.inputsContainer} ml-15`}>
        <form onSubmit={updateUserInfo} autoComplete="off">
          <div>
            <Input
              disabled={disabledName}
              onIconClick={() => {
                setDisabledName(false);
              }}
              onBlur={() => {
                setDisabledName(true);
              }}
              onFocus={resetError}
              ref={nameRef}
              type={"text"}
              name={"name"}
              placeholder={"Имя"}
              onChange={handleChange}
              value={values.name || ""}
              size={"default"}
              icon={"EditIcon"}
            />
            <div
              className={`${LoginStyles.errorMessage} text_type_main-default`}
            >
              {errors.name}
            </div>
          </div>
          <div>
            <Input
              disabled={disabledEmail}
              onIconClick={() => {
                setDisabledEmail(false);
              }}
              onBlur={() => {
                setDisabledEmail(true);
              }}
              onFocus={resetError}
              ref={emailRef}
              type={"email"}
              name={"email"}
              placeholder={"Логин"}
              onChange={handleChange}
              value={values.email || ""}
              size={"default"}
              icon={"EditIcon"}
            />
            <div
              className={`${LoginStyles.errorMessage} text_type_main-default`}
            >
              {errors.email}
            </div>
          </div>

          <Input
            disabled={true}
            type={"text"}
            placeholder={"Пароль"}
            value={"******"}
            size={"default"}
            icon={"EditIcon"}
          />
          <div className={`${ProfileStyles.buttonsContainer} mt-6`}>
            <Button type="primary" size="medium" disabled={saveButtonDisabled}>
              Сохранить
            </Button>
            <Button
              type="secondary"
              size="medium"
              onClick={cancelUpdateUserInfo}
              disabled={
                user === null
                  ? true
                  : values.name === user.name && values.email === user.email
                  ? true
                  : false
              }
            >
              Отмена
            </Button>
            <div className={ProfileStyles.error}>
              {updateUserFailed ? (
                successfulUpdateMsg
              ) : updateUserRequest ? (
                <Loader />
              ) : (
                <></>
              )}
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ProfilePage;
