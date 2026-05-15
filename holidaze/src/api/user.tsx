import type {
  RegisterUserT,
  RegisterResponse,
  LoginUserT,
  LoginResponse,
} from "../types/user";
import { messageFromFailedResponse } from "../types/apiErrors";
import { noroffHeaders } from "./noroffHeaders";

const apiBase = import.meta.env.VITE_API_URL;

// Register user api
export const registerUserApi = async (
  user: RegisterUserT,
): Promise<RegisterResponse> => {
  const url = new URL("/auth/register", apiBase);

  const response = await fetch(url, {
    method: "POST",
    headers: noroffHeaders({ json: true }),
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const message = await messageFromFailedResponse(
      response,
      `Failed to register user: (${response.status}).`,
    );
    throw new Error(message);
  }

  const data = await response.json();
  return data;
};

// Login user api
export const loginUserApi = async (
  user: LoginUserT,
): Promise<LoginResponse> => {
  const url = new URL("/auth/login", apiBase);

  const response = await fetch(url, {
    method: "POST",
    headers: noroffHeaders({ json: true }),
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const message = await messageFromFailedResponse(
      response,
      `Failed to log in (${response.status}). Check your email and password.`,
    );
    throw new Error(message);
  }

  const data = await response.json();
  return data;
};
