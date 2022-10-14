import React from "react";
import { Redirect } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import { recoveryPassword } from "../services/actions/Auth";
import { useDispatch, useSelector } from "../services/hooks";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { values } = useSelector((state) => state.auth);
  const { success } = useSelector((state) => state.recovery);

  const handleRecovery = () => {
    dispatch(recoveryPassword(values.email));
  };

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
