import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import { recoveryPassword } from "../services/actions/Auth";

const ForgotPasswordPage = () => {
  const dispatch: any = useDispatch();
  const { values } = useSelector((state: any) => state.auth);
  const { success } = useSelector((state: any) => state.recovery);

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
