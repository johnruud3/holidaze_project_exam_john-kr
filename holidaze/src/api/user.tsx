import type {
  RegisterUserT,
  RegisterResponse,
  LoginUserT,
  LoginResponse,
} from "../types/user";
const apiBase = import.meta.env.VITE_API_URL;

// Register user api
export const registerUserApi = async (
  user: RegisterUserT,
): Promise<RegisterResponse> => {
  const url = new URL("/auth/register", apiBase);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`Failed to register user: ${response.status}`);
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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`Failed to login user: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
