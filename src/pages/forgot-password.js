import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import { recoveryPassword, SET_ERRORS } from "../services/actions/Auth";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { values, errors } = useSelector((state) => state.auth);
  const { success } = useSelector((state) => state.recovery);
  const { recoveryFailed } = useSelector((state) => state.recovery);

  const handleRecovery = () => {
    dispatch(recoveryPassword(values.email));
  };

  useEffect(() => {
    if (recoveryFailed) {
      dispatch({
        type: SET_ERRORS,
        errors: {
          ...errors,
          submit: "Ошибка восстановления пароля!",
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, recoveryFailed]);

  useEffect(() => {
    if (values.email === "") {
      dispatch({
        type: SET_ERRORS,
        errors: { name: "", email: "", password: "", submit: "" },
      });
    }
  }, [dispatch, values.email]);

  if (success) {
    return <Redirect to="/reset-password" />;
  } else {
    return (
      <Auth
        title={"Восстановление пароля"}
        buttonTitle={"Восстановить"}
        handleClick={handleRecovery}
      />
    );
  }
};

export default ForgotPasswordPage;
