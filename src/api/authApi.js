import { apiClient } from "./apiClient";

export const registerUser = (userData) => {
  return apiClient("/holidaze/auth/register", {
    method: "POST",
    body: userData,
  });
};

export const loginUser = (credentials) => {
  return apiClient("/holidaze/auth/login", {
    method: "POST",
    body: credentials,
  });
};
