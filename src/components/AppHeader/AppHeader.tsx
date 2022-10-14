import React, { useEffect, useRef } from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderStyles from "./AppHeader.module.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { SyntheticEvent } from "../../types";
import { useDispatch } from "../../services/hooks";
import { SET_APP_HEADER_HEIGHT } from "../../services/actions/AppHeader";

const AppHeader = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const handleClickConstructor = (e: SyntheticEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
    }
  };
  const handleClickPrifile = (e: SyntheticEvent) => {
    if (location.pathname === "/profile") {
      e.preventDefault();
    }
  };

  const handleClickOrders = (e: SyntheticEvent) => {
    if (location.pathname === "/feed") {
      e.preventDefault();
    }
  };

  const onLogoClick = () => {
    history.replace({ pathname: "/" });
  };

  const HeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const height =
      HeaderRef && HeaderRef.current && HeaderRef.current.offsetHeight;
    dispatch({
      type: SET_APP_HEADER_HEIGHT,
      payload: height,
    });
  }, [HeaderRef, dispatch]);

  return (
    <header className={`${AppHeaderStyles.header}`}>
      <div
        ref={HeaderRef}
        className={`${AppHeaderStyles.header__container} pt-4 pb-4`}
      >
        <div className={AppHeaderStyles.headerButton}>
          <Link
            to="/"
            className={
              location.pathname === "/"
                ? `${AppHeaderStyles.headerButton__content} pr-8`
                : `${AppHeaderStyles.headerButton__content} ${AppHeaderStyles.active} pr-8`
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
            to="/feed"
            className={
              location.pathname === "/feed"
                ? `${AppHeaderStyles.headerButton__content} pr-8 pl-8`
                : `${AppHeaderStyles.headerButton__content} ${AppHeaderStyles.active} pr-8 pl-8`
            }
            onClick={handleClickOrders}
          >
            <ListIcon
              type={location.pathname === "/feed" ? "primary" : "secondary"}
            />
            <span
              className={
                location.pathname === "/feed"
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
              ? `${AppHeaderStyles.headerButton__content} pl-8`
              : `${AppHeaderStyles.headerButton__content} ${AppHeaderStyles.active} pl-8`
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
      </div>
    </header>
  );
};

export default AppHeader;
