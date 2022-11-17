import { CustomResponse } from "../types";
import { baseUrl } from "./constants";
import { request } from "./utils";

export const register = (
  email: string,
  password: string,
  name: string
): Promise<CustomResponse> => {
  return request(`${baseUrl}/auth/register`, {
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
  return request(`${baseUrl}/auth/login`, {
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
  return request(`${baseUrl}/auth/token`, {
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
  return request(`${baseUrl}/auth/logout`, {
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
  return request(`${baseUrl}/auth/user`, {
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
  return request(`${baseUrl}/auth/user`, {
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
