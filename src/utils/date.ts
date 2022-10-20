import dateFormat from "dateformat";
import { i18n } from "dateformat";
i18n.monthNames = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

export const setDate = (date: string) => {
  const Time: string = dateFormat(date, "HH:MM");
  const Day: string = dateFormat(date, "DDDD");
  const FullDate: string = dateFormat(date, "d mmmm");

  return `${
    Day === "Yesterday" ? "Вчера" : Day === "Today" ? "Сегодня" : FullDate
  }, ${Time} i-GMT+3`;
};
