import React from "react";
import WsConnectedErrorStyles from "./WsConnectedError.module.css";

const WsConnectedError = () => {
  return (
    <span className={`${WsConnectedErrorStyles.error} text text_type_main-medium`}>
      Ошибка загрузки данных.
    </span>
  );
};

export default WsConnectedError;
