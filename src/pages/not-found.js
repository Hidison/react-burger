import React from "react";
import { Link } from "react-router-dom";
import NotFoundPageStyles from "./not-found.module.css";

const NotFound404 = () => {
  return (
    <div className={NotFoundPageStyles.container}>
      <h1 className={NotFoundPageStyles.title}>Ошибка 404</h1>
      <h1 className={NotFoundPageStyles.subtitle}>Страница не найдена</h1>
      <Link to="/" className={NotFoundPageStyles.link}>
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound404;
