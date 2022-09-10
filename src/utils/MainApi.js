import { request } from "./utils";

export const baseUrl = "https://norma.nomoreparties.space/api";

export const getIngredients = () => {
  return request(`${baseUrl}/ingredients`, {
    method: "GET",
  });
};

export const postOrder = (id) => {
  return request(`${baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: id,
    }),
  });
};

export const recoveryPassword = (email) => {
  return request(`${baseUrl}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
};

export const changePassword = (password, token) => {
  return request(`${baseUrl}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  });
};
