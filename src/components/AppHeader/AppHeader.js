import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderStyles from "./AppHeader.module.css";
import { Link, useHistory, useLocation } from "react-router-dom";

const AppHeader = () => {
  const location = useLocation();
  const history = useHistory();

  const handleClickConstructor = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
    }
  };
  const handleClickPrifile = (e) => {
    if (location.pathname === "/profile") {
      e.preventDefault();
    }
  };

  const handleClickOrders = (e) => {
    if (location.pathname === "/profile/orders") {
      e.preventDefault();
    }
  };

  const onLogoClick = () => {
    history.replace({ pathname: "/" });
  };

  return (
    <header className={`${AppHeaderStyles.header} pt-4 pb-4`}>
      <div className={AppHeaderStyles.headerButton}>
        <Link
          to="/"
          className={
            location.pathname === "/"
              ? `${AppHeaderStyles.headerButton__content}`
              : `${AppHeaderStyles.headerButton__content} ${AppHeaderStyles.active}`
          }
          onClick={handleClickConstructor}
        >
          <BurgerIcon
            type={location.pathname === "/" ? "primary" : "secondary"}
          />
          <span
            className={
              location.pathname === "/"
                ? "text text_type_main-default ml-2"
                : "text text_type_main-default text_color_inactive ml-2"
            }
          >
            Конструктор
          </span>
        </Link>
        <Link
          to="/profile/orders"
          className={
            location.pathname === "/profile/orders"
              ? `${AppHeaderStyles.headerButton__content}`
              : `${AppHeaderStyles.headerButton__content} ${AppHeaderStyles.active}`
          }
          onClick={handleClickOrders}
        >
          <ListIcon
            type={
              location.pathname === "/profile/orders" ? "primary" : "secondary"
            }
          />
          <span
            className={
              location.pathname === "/profile/orders"
                ? "text text_type_main-default ml-2"
                : "text text_type_main-default text_color_inactive ml-2"
            }
          >
            Лента заказов
          </span>
        </Link>
      </div>
      <div className={AppHeaderStyles.logo} onClick={onLogoClick}>
        <Logo />
      </div>
      <Link
        to="/profile"
        className={
          location.pathname === "/profile"
            ? `${AppHeaderStyles.headerButton__content}`
            : `${AppHeaderStyles.headerButton__content} ${AppHeaderStyles.active}`
        }
        onClick={handleClickPrifile}
      >
        <ProfileIcon
          type={location.pathname === "/profile" ? "primary" : "secondary"}
        />
        <span
          className={
            location.pathname === "/profile"
              ? "text text_type_main-default ml-2"
              : "text text_type_main-default text_color_inactive ml-2"
          }
        >
          Личный кабинет
        </span>
      </Link>
    </header>
  );
};

export default AppHeader;
