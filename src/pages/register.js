import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import { SET_ERRORS } from "../services/actions/Auth";
import { register } from "../services/actions/Register";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { values, errors } = useSelector((state) => state.auth);
  const { registerFailed, registerSuccess } = useSelector(
    (state) => state.register
  );

  const handleRegister = () => {
    dispatch(register(values.email, values.password, values.name));
  };

  useEffect(() => {
    if (registerFailed) {
      dispatch({
        type: SET_ERRORS,
        errors: {
          ...errors,
          submit: "Ошибка регистрации!",
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, registerFailed]);

  useEffect(() => {
    if (values.name === "" && values.email === "" && values.password === "") {
      dispatch({
        type: SET_ERRORS,
        errors: { name: "", email: "", password: "", submit: "" },
      });
    }
  }, [dispatch, values.email, values.name, values.password]);

  if (registerSuccess) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Auth
        title={"Регистрация"}
        buttonTitle={"Зарегистрироваться"}
        handleClick={handleRegister}
      />
    );
  }
};

export default RegisterPage;
