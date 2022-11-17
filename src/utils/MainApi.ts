import { CustomResponse } from "../types";
import { baseUrl } from "./constants";
import { request } from "./utils";

export const getIngredients = (): Promise<CustomResponse> => {
  return request(`${baseUrl}/ingredients`, {
    method: "GET",
  });
};

export const postOrder = (id: string, accessToken: string): Promise<CustomResponse> => {
  return request(`${baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({
      ingredients: id,
    }),
  });
};

export const recoveryPassword = (email: string): Promise<CustomResponse> => {
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

export const changePassword = (password: string, token: string): Promise<CustomResponse> => {
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
