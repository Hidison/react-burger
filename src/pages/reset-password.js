import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import { changePassword, SET_SUBMIT_ERROR } from "../services/actions/Auth";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();

  const { password, code } = useSelector((state) => state.auth);
  const { data, changePasswordFailed } = useSelector(
    (state) => state.changePassword
  );
  const { success } = useSelector((state) => state.recovery);

  const handleChangePassword = () => {
    dispatch(changePassword(password, code));
  };

  useEffect(() => {
    if (changePasswordFailed) {
      dispatch({
        type: SET_SUBMIT_ERROR,
        submitError: "Ошибка восстановления пароля!",
      });
    }
  }, [dispatch, changePasswordFailed]);

  useEffect(() => {
    if (password !== "" || code !== "" || (password === "" && code === "")) {
      dispatch({
        type: SET_SUBMIT_ERROR,
        submitError: "",
      });
    }
  }, [code, dispatch, password]);

  if (!success) {
    return <Redirect to="/forgot-password" />;
  } else if (data !== null && data.success) {
    return <Redirect to="/login" />;
  } else {
    return (
      <>
        <Auth
          title={"Восстановление пароля"}
          buttonTitle={"Сохранить"}
          handleClick={handleChangePassword}
        />
      </>
    );
  }
};

export default ResetPasswordPage;
