import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_VALUES, SET_ERRORS, SET_VALID } from "../services/actions/Auth";
import { SyntheticEvent } from "../types";

export function useFormAndValidation() {
  const dispatch = useDispatch();
  const { values, errors, valid } = useSelector((state: any) => state.auth);
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = (name: string, value: string) => {
    function resetError() {
      dispatch({
        type: SET_ERRORS,
        errors: {
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
            errors: {
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
            errors: {
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
            errors: {
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
      values: { ...values, [name]: value },
    });
    dispatch({
      type: SET_VALID,
      valid: { ...valid, [name]: validate(name, value) },
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
        errors: newErrors,
      });
      dispatch({
        type: SET_VALUES,
        values: newValues,
      });
      dispatch({
        type: SET_VALID,
        valid: newIsValid,
      });
    },
    [dispatch]
  );

  return {
    handleChange,
    resetForm,
  };
}
