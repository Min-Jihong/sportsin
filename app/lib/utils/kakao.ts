import { protectedServer } from "./protected-server";

export const initKakao = () => {
  if (protectedServer()) return;
  if (window.Kakao && !window.Kakao.isInitialized()) {
    const javascriptKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
    if (javascriptKey) {
      window.Kakao.init(javascriptKey);
    }
  }
};

export const loginWithKakao = () => {
  if (protectedServer()) return;
  if (window.Kakao) {
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
    window.Kakao.Auth.authorize({
      redirectUri,
    });
  }
};

export const getKakaoToken = () => {
  if (protectedServer()) return null;
  if (window.Kakao?.Auth) {
    return window.Kakao.Auth.getAccessToken();
  }
  return null;
};

export const getKakaoTokenFromCode = async (code: string): Promise<string | null> => {
  if (protectedServer()) return null;

  try {
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
    const clientId = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

    if (!redirectUri || !clientId) {
      console.error("Kakao configuration is missing");
      return null;
    }

    // code를 사용해서 accessToken 받기
    const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId,
        redirect_uri: redirectUri,
        code: code,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json().catch(() => ({}));
      console.error("Failed to get access token:", errorData);
      throw new Error("Failed to get access token");
    }

    const data = await tokenResponse.json();

    // Kakao SDK에 accessToken 설정
    if (window.Kakao?.Auth) {
      window.Kakao.Auth.setAccessToken(data.access_token);
    }

    return data.access_token;
  } catch (error) {
    console.error("Error getting Kakao token from code:", error);
    return null;
  }
};

export const logoutKakao = () => {
  if (typeof window !== "undefined" && window.Kakao?.Auth) {
    window.Kakao.Auth.setAccessToken(null);
  }
};
