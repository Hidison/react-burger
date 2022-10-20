import { CustomResponse } from "../types";
import { request } from "./utils";

export const baseUrl = "https://norma.nomoreparties.space/api/auth";

export const register = (
  email: string,
  password: string,
  name: string
): Promise<CustomResponse> => {
  return request(`${baseUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
};

export const login = (email: string, password: string): Promise<CustomResponse> => {
  return request(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};

export const updateToken = (token: string): Promise<CustomResponse> => {
  return request(`${baseUrl}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
};

export const logout = (token: string): Promise<CustomResponse> => {
  return request(`${baseUrl}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
};

export const getUser = (accessToken: string): Promise<CustomResponse> => {
  return request(`${baseUrl}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  });
};

export const updateUser = (
  accessToken: string,
  email: string,
  name: string
): Promise<CustomResponse> => {
  return request(`${baseUrl}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({
      email: email,
      name: name,
    }),
  });
};
