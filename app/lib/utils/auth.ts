import { protectedServer } from "./protected-server";

const AUTH_TOKEN_COOKIE_NAME = "authorize-access-token";

export const getAuthToken = (): string | null => {
  if (protectedServer()) return null;

  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith(`${AUTH_TOKEN_COOKIE_NAME}=`));

  if (tokenCookie) {
    // = 이후의 모든 값을 가져오기 위해 split 후 slice 사용
    const tokenValue = tokenCookie.split("=").slice(1).join("=");
    const token = decodeURIComponent(tokenValue);
    
    // 디버깅: 토큰이 제대로 읽혔는지 확인 (너무 자주 로그가 찍히지 않도록 조건부)
    if (token && process.env.NODE_ENV === "development") {
      // 개발 환경에서만 로그 출력 (너무 자주 찍히지 않도록)
    }
    return token;
  }

  // 개발 환경에서만 로그 출력 (너무 자주 찍히지 않도록)
  // console.warn("No auth token found in cookies");
  return null;
};

export const setAuthToken = (token: string, expiresAt: number) => {
  if (protectedServer()) return;

  // expiresAt이 seconds 단위인지 milliseconds 단위인지 확인
  // 일반적으로 10자리 숫자는 seconds, 13자리 숫자는 milliseconds
  let expiresAtMs = expiresAt;
  if (expiresAt < 10000000000) {
    // 10자리 이하면 seconds 단위로 간주
    expiresAtMs = expiresAt * 1000;
  }

  // maxAge 계산 (seconds 단위)
  const maxAge = Math.floor((expiresAtMs - Date.now()) / 1000);

  // maxAge가 유효하지 않으면 기본값(24시간) 사용
  const finalMaxAge = maxAge > 0 ? maxAge : 86400; // 24시간

  // URL 인코딩하여 특수문자 처리
  const encodedToken = encodeURIComponent(token);
  document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=${encodedToken}; path=/; max-age=${finalMaxAge}; SameSite=Lax`;
  
  // 디버깅: 토큰이 제대로 설정되었는지 확인
  if (process.env.NODE_ENV === "development") {
    console.log("Auth token set:", { 
      token: token.substring(0, 20) + "...", 
      expiresAt,
      expiresAtMs,
      maxAge,
      finalMaxAge,
      expiresAtDate: new Date(expiresAtMs).toISOString()
    });
  }
};

export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

export const clearAuthToken = () => {
  if (protectedServer()) return;

  document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=; path=/; max-age=0`;
};
