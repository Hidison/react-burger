import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import { changePassword } from "../services/actions/Auth";

const ResetPasswordPage = () => {
  const dispatch: any = useDispatch();

  const { values } = useSelector((state: any) => state.auth);
  const { data } = useSelector((state: any) => state.changePassword);
  const { success } = useSelector((state: any) => state.recovery);

  const handleChangePassword: Function = () => {
    dispatch(changePassword(values.password, values.code));
  };

  if (!success) {
    return <Redirect to="/forgot-password" />;
  } else if (data !== null && data.success) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Auth
        title={"Восстановление пароля"}
        buttonTitle={"Сохранить"}
        handleClick={handleChangePassword}
      />
    );
  }
};

export default ResetPasswordPage;
