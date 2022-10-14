import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../services/hooks";
import { Redirect, useLocation } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import { login } from "../services/actions/Login";
import { REGISTER_SUCCESS } from "../services/actions/Register";
import { Location } from "history";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { auth, values } = useSelector((state) => state.auth);

  const location = useLocation<{ from: Location }>();
  const handleLogin = () => {
    dispatch(login(values.email, values.password));
  };

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
