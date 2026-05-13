export const AUTH_ACCESS_TOKEN_KEY = "holidaze_access_token";

export function readStoredAccessToken(): string | null {
  return localStorage.getItem(AUTH_ACCESS_TOKEN_KEY);
}

export function writeStoredAccessToken(token: string): void {
  localStorage.setItem(AUTH_ACCESS_TOKEN_KEY, token);
}

export function clearStoredAccessToken(): void {
  localStorage.removeItem(AUTH_ACCESS_TOKEN_KEY);
}
