import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef, useState } from "react";
import ProfileStyles from "./profile.module.css";
import LoginStyles from "../components/Auth/Auth.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import AppHeader from "../components/AppHeader/AppHeader";
import {
  SET_NAME,
  SET_EMAIL,
  validateEmail,
  validateName,
  SET_NAME_ERROR,
  SET_EMAIL_ERROR,
  SET_NAME_VALID,
  SET_EMAIL_VALID,
  SET_AUTH,
} from "../services/actions/Auth";
import { getUser, logout, updateUser } from "../services/actions/Profile";
import { deleteCookie, getCookie } from "../utils/utils";
import Loader from "../components/UI/Loader/Loader";

const ProfilePage = () => {
  const [disabledName, setDisabledName] = useState(true);
  const [disabledEmail, setDisabledEmail] = useState(true);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [successfulUpdateMsg, setSuccessfulUpdateMsg] = useState("");
  const dispatch = useDispatch();

  const location = useLocation();

  const { name, email, nameValid, emailValid, nameError, emailError } =
    useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { updateUserRequest, updateUserFailed } = useSelector(
    (state) => state.updatedUser
  );
  const nameRef = useRef(null);
  const emailRef = useRef(null);

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
        type: SET_NAME,
        name: user.name,
      });
      dispatch({
        type: SET_EMAIL,
        email: user.email,
      });
    }
  }, [dispatch, user]);

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

  useEffect(() => {
    dispatch({
      type: SET_NAME_VALID,
      nameValid: true,
    });
    dispatch({
      type: SET_EMAIL_VALID,
      emailValid: true,
    });
  }, [dispatch]);

  const updateUserInfo = () => {
    dispatch(updateUser(aToken, email, name));
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
      type: SET_NAME,
      name: user.name,
    });
    dispatch({
      type: SET_EMAIL,
      email: user.email,
    });
    dispatch({
      type: SET_NAME_ERROR,
      nameError: "",
    });
    dispatch({
      type: SET_EMAIL_ERROR,
      emailError: "",
    });
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

  useEffect(() => {
    if (user === null) {
      setSaveButtonDisabled(true);
    } else if (name === user.name && email === user.email) {
      setSaveButtonDisabled(true);
    } else if (!nameValid || !emailValid) {
      setSaveButtonDisabled(true);
    } else {
      setSaveButtonDisabled(false);
    }
  }, [email, emailValid, name, nameValid, user]);

  return (
    <>
      <AppHeader />
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
          <div>
            <Input
              disabled={disabledName}
              onIconClick={() => {
                setDisabledName(false);
              }}
              onBlur={() => {
                setDisabledName(true);
              }}
              ref={nameRef}
              type={"text"}
              placeholder={"Имя"}
              onChange={changeName}
              value={name || ""}
              size={"default"}
              icon={"EditIcon"}
            />
            <div
              className={`${LoginStyles.errorMessage} text_type_main-default`}
            >
              {nameError}
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
              ref={emailRef}
              type={"email"}
              placeholder={"Логин"}
              onChange={changeEmail}
              value={email || ""}
              size={"default"}
              icon={"EditIcon"}
            />
            <div
              className={`${LoginStyles.errorMessage} text_type_main-default`}
            >
              {emailError}
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
            <div className={ProfileStyles.error}>
              {updateUserFailed ? (
                successfulUpdateMsg
              ) : updateUserRequest ? (
                <Loader />
              ) : (
                <></>
              )}
            </div>
            <Button
              type="secondary"
              size="medium"
              onClick={cancelUpdateUserInfo}
              disabled={
                user === null
                  ? true
                  : name === user.name && email === user.email
                  ? true
                  : false
              }
            >
              Отмена
            </Button>
            <Button
              type="primary"
              size="medium"
              onClick={updateUserInfo}
              disabled={saveButtonDisabled}
            >
              Сохранить
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
