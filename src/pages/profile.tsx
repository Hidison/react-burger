import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef, useState } from "react";
import ProfileStyles from "./profile.module.css";
import LoginStyles from "../components/Auth/Auth.module.css";
import { useDispatch, useSelector } from "../services/hooks";
import { SET_ERRORS, SET_VALID, SET_VALUES } from "../services/actions/Auth";
import { getUser, updateUser } from "../services/actions/Profile";
import { getCookie } from "../utils/utils";
import Loader from "../components/UI/Loader/Loader";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { SyntheticEvent } from "../types";
import ProfileNav from "../components/ProfileNav/ProfileNav";

const ProfilePage = () => {
  const [disabledName, setDisabledName] = useState<boolean>(true);
  const [disabledEmail, setDisabledEmail] = useState<boolean>(true);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(true);
  const dispatch = useDispatch();

  const { values, errors, valid } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { updateUserRequest, updateUserFailed } = useSelector(
    (state) => state.updatedUser
  );
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const { handleChange } = useFormAndValidation();

  useEffect(() => {
    if (!disabledName && nameRef.current) {
      nameRef.current.focus();
    }
    if (!disabledEmail && emailRef.current) {
      emailRef.current.focus();
    }
  }, [disabledEmail, disabledName]);

  const aToken = getCookie("accessToken");

  useEffect(() => {
    if (user) {
      dispatch({
        type: SET_VALUES,
        payload: { ...values, name: user.name, email: user.email },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user]);

  useEffect(() => {
    dispatch({
      type: SET_VALID,
      payload: { ...valid, name: true, email: true },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const updateUserInfo = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(aToken as string, values.email, values.name));
    if (!disabledName && nameRef.current) {
      nameRef.current.blur();
    }
    if (!disabledEmail && emailRef.current) {
      emailRef.current.blur();
    }
  };

  useEffect(() => {
    if (updateUserFailed) {
      return;
    } else {
      dispatch(getUser(aToken as string));
    }
  }, [aToken, dispatch, updateUserFailed, updateUserRequest]);

  const cancelUpdateUserInfo = () => {
    dispatch({
      type: SET_VALUES,
      payload: { name: user.name, email: user.email, password: "", code: "" },
    });
    resetError();
  };

  useEffect(() => {
    dispatch({
      type: SET_ERRORS,
      payload: {
        ...errors,
        submit: "",
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetError = () => {
    dispatch({
      type: SET_ERRORS,
      payload: {
        ...errors,
        name: "",
        email: "",
        submit: "",
      },
    });
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
        <ProfileNav />
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
            onChange={(e) => e}
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
              {updateUserFailed && errors.submit}
              {updateUserRequest && <Loader />}
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ProfilePage;
