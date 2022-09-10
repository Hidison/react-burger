import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import { changePassword, SET_ERRORS } from "../services/actions/Auth";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();

  const { values, errors } = useSelector((state) => state.auth);
  const { data, changePasswordFailed } = useSelector(
    (state) => state.changePassword
  );
  const { success } = useSelector((state) => state.recovery);

  const handleChangePassword = () => {
    dispatch(changePassword(values.password, values.code));
  };

  useEffect(() => {
    if (changePasswordFailed) {
      dispatch({
        type: SET_ERRORS,
        errors: {
          ...errors,
          submit: "Ошибка восстановления пароля!",
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, changePasswordFailed]);

  useEffect(() => {
    if (values.password === "" && values.code === "") {
      dispatch({
        type: SET_ERRORS,
        errors: { name: "", email: "", password: "", submit: "" },
      });
    }
  }, [dispatch, values.code, values.password]);

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
