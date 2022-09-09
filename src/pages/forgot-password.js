import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import { recoveryPassword, SET_SUBMIT_ERROR } from "../services/actions/Auth";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);
  const { success } = useSelector((state) => state.recovery);
  const { recoveryFailed } = useSelector((state) => state.recovery);

  const handleRecovery = () => {
    dispatch(recoveryPassword(email));
  };

  useEffect(() => {
    if (recoveryFailed) {
      dispatch({
        type: SET_SUBMIT_ERROR,
        submitError: "Ошибка восстановления пароля!",
      });
    }
  }, [dispatch, recoveryFailed]);

  useEffect(() => {
    if (email !== "" || email === "") {
      dispatch({
        type: SET_SUBMIT_ERROR,
        submitError: "",
      });
    }
  }, [dispatch, email]);

  if (success) {
    return <Redirect to="/reset-password" />;
  } else {
    return (
      <>
        <Auth
          title={"Восстановление пароля"}
          buttonTitle={"Восстановить"}
          handleClick={handleRecovery}
        />
      </>
    );
  }
};

export default ForgotPasswordPage;
