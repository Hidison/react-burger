import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import { SET_SUBMIT_ERROR } from "../services/actions/Auth";
import { register } from "../services/actions/Register";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { email, password, name } = useSelector((state) => state.auth);
  const { registerFailed, registerSuccess } = useSelector(
    (state) => state.register
  );

  const handleRegister = () => {
    dispatch(register(email, password, name));
  };

  useEffect(() => {
    if (registerFailed) {
      dispatch({
        type: SET_SUBMIT_ERROR,
        submitError: "Ошибка регистрации!",
      });
    }
  }, [dispatch, registerFailed]);

  useEffect(() => {
    if (
      email !== "" ||
      password !== "" ||
      name !== "" ||
      (email === "" && password === "" && name === "")
    ) {
      dispatch({
        type: SET_SUBMIT_ERROR,
        submitError: "",
      });
    }
  }, [dispatch, email, password, name]);

  if (registerSuccess) {
    return <Redirect to="/login" />;
  } else {
    return (
      <>
        <Auth
          title={"Регистрация"}
          buttonTitle={"Зарегистрироваться"}
          handleClick={handleRegister}
        />
      </>
    );
  }
};

export default RegisterPage;
