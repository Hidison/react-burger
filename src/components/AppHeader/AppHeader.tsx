import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderStyles from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <header className={`${AppHeaderStyles.header} pt-4 pb-4`}>
      <div className={AppHeaderStyles.header__button}>
        <Button type="secondary" size="small">
          <div style={{ display: "flex" }}>
            <BurgerIcon type="primary" />
            <span className="text text_type_main-default text_color_inactive ml-2">
              Конструктор
            </span>
          </div>
        </Button>
        <Button type="secondary" size="small">
          <div style={{ display: "flex" }}>
            <ListIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive ml-2">
              Лента заказов
            </span>
          </div>
        </Button>
      </div>
      <Logo />
      <Button type="secondary" size="small">
        <div style={{ display: "flex" }}>
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default text_color_inactive ml-2">
            Личный кабинет
          </span>
        </div>
      </Button>
    </header>
  );
};

export default AppHeader;
