import React from "react";
import ProfileNavStyles from "./ProfileNav.module.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "../../services/hooks";
import { deleteCookie } from "../../utils/utils";
import { SET_AUTH } from "../../services/actions/Auth";
import { logout } from "../../services/actions/Profile";

const ProfileNav = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const rToken = localStorage.getItem("refreshToken");

  const logoutSistem = () => {
    dispatch(logout(rToken));
    deleteCookie("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch({
      type: SET_AUTH,
      payload: false,
    });
  };

  return (
    <nav className={ProfileNavStyles.nav}>
      <span className={ProfileNavStyles.linkBlock}>
        <Link
          to="/profile"
          className={
            location.pathname === "/profile"
              ? `${ProfileNavStyles.link} ${ProfileNavStyles.linkActive} text text_type_main-medium`
              : `${ProfileNavStyles.link} ${ProfileNavStyles.linkDisabled} text text_type_main-medium text_color_inactive`
          }
        >
          Профиль
        </Link>
      </span>
      <span className={ProfileNavStyles.linkBlock}>
        <Link
          to="/profile/orders"
          className={
            location.pathname === "/profile/orders"
              ? `${ProfileNavStyles.link} ${ProfileNavStyles.linkActive} text text_type_main-medium`
              : `${ProfileNavStyles.link} ${ProfileNavStyles.linkDisabled} text text_type_main-medium text_color_inactive`
          }
        >
          История заказов
        </Link>
      </span>
      <span className={ProfileNavStyles.linkBlock}>
        <button
          onClick={logoutSistem}
          to="/"
          className={
            location.pathname === "/profile/orders/:id"
              ? `${ProfileNavStyles.link} ${ProfileNavStyles.linkActive} text text_type_main-medium`
              : `${ProfileNavStyles.link} ${ProfileNavStyles.linkDisabled} text text_type_main-medium text_color_inactive`
          }
        >
          Выход
        </button>
      </span>
      <p
        className={`${ProfileNavStyles.text} text text_type_main-default text_color_inactive mt-20`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  );
};

export default ProfileNav;
