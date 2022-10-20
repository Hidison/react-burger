import React from "react";
import { useDispatch, useSelector } from "../services/hooks";
import { Redirect } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import { register } from "../services/actions/Register";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { values } = useSelector((state) => state.auth);
  const { registerSuccess } = useSelector((state) => state.register);

  const handleRegister: Function = () => {
    dispatch(register(values.email, values.password, values.name));
  };

  if (registerSuccess) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Auth title={"Регистрация"} buttonTitle={"Зарегистрироваться"} handleClick={handleRegister} />
    );
  }
};

export default RegisterPage;
