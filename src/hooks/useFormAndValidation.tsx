import { useCallback } from "react";
import { SET_VALUES, SET_ERRORS, SET_VALID } from "../services/actions/Auth";
import { useDispatch, useSelector } from "../services/hooks";
import { SyntheticEvent } from "../types";

export function useFormAndValidation() {
  const dispatch = useDispatch();
  const { values, errors, valid } = useSelector((state) => state.auth);
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = (name: string, value: string) => {
    function resetError() {
      dispatch({
        type: SET_ERRORS,
        payload: {
          ...errors,
          [name]: "",
        },
      });
    }
    switch (name) {
      case "name": {
        if (value.length < 2) {
          dispatch({
            type: SET_ERRORS,
            payload: {
              ...errors,
              [name]: "Имя должно состоять минимум из 2-ух символов",
            },
          });
          return false;
        } else {
          resetError();
          return true;
        }
      }
      case "email": {
        if (!email.test(String(value))) {
          dispatch({
            type: SET_ERRORS,
            payload: {
              ...errors,
              [name]: "Введите корректный email",
            },
          });
          return false;
        } else {
          resetError();
          return true;
        }
      }
      case "password": {
        if (value.length < 6 || value.length > 20) {
          dispatch({
            type: SET_ERRORS,
            payload: {
              ...errors,
              [name]: "Пароль должен быть от 6 до 20 символов",
            },
          });
          return false;
        } else {
          resetError();
          return true;
        }
      }
      default:
        break;
    }
  };

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    dispatch({
      type: SET_VALUES,
      payload: { ...values, [name]: value },
    });
    dispatch({
      type: SET_VALID,
      payload: { ...valid, [name]: validate(name, value) },
    });
  };

  const resetForm = useCallback(
    (
      newValues = { name: "", email: "", password: "", code: "" },
      newErrors = { name: "", email: "", password: "", submit: "" },
      newIsValid = { name: false, email: false, password: false }
    ) => {
      dispatch({
        type: SET_ERRORS,
        payload: newErrors,
      });
      dispatch({
        type: SET_VALUES,
        payload: newValues,
      });
      dispatch({
        type: SET_VALID,
        payload: newIsValid,
      });
    },
    [dispatch]
  );

  return {
    handleChange,
    resetForm,
  };
}
