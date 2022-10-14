import React from "react";
import { useDispatch, useSelector } from "../services/hooks";
import { Redirect } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import { changePassword } from "../services/actions/Auth";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();

  const { values } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.changePassword);
  const { success } = useSelector((state) => state.recovery);

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
