import { protectedServer } from "./protected-server";

const AUTH_TOKEN_COOKIE_NAME = "authorize-access-token";

export const getAuthToken = (): string | null => {
  if (protectedServer()) return null;

  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith(`${AUTH_TOKEN_COOKIE_NAME}=`));

  if (tokenCookie) {
    return tokenCookie.split("=")[1];
  }

  return null;
};

export const setAuthToken = (token: string, expiresAt: number) => {
  if (protectedServer()) return;

  // expiresAt은 Unix timestamp (milliseconds)이므로 maxAge 계산
  const maxAge = Math.floor((expiresAt - Date.now()) / 1000);

  document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

export const clearAuthToken = () => {
  if (protectedServer()) return;

  document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=; path=/; max-age=0`;
};
