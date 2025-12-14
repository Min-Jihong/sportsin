"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { PATHS } from "@/constants/paths";
import { delay } from "es-toolkit";
import { usePostLogin } from "@/hooks/use-post-login";
import { setAuthToken } from "@/lib/utils/auth";
import { getKakaoTokenFromCode } from "@/lib/utils/kakao";
import { useSigninDataStore } from "@/signin/lib/stores/use-signin-data-store";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { mutate: postLogin } = usePostLogin();
  const { setData: setSigninData } = useSigninDataStore();

  const handleCallback = async () => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    // 임시: 로그인 실패해도 다음 페이지로 진행
    if (error) {
      setStatus("error");
      setErrorMessage("로그인 중 오류가 발생했습니다.");
      await delay(1500);
      router.push(PATHS.signin);
      return;
    }

    if (!code) {
      setStatus("error");
      setErrorMessage("인증 코드를 받지 못했습니다.");
      await delay(1500);
      router.push(PATHS.signin);
      return;
    }

    // 카카오 서버에서 code를 access_token으로 교환
    const kakaoAccessToken = await getKakaoTokenFromCode(code);

    if (!kakaoAccessToken) {
      setStatus("error");
      setErrorMessage("카카오 토큰 교환에 실패했습니다.");
      await delay(1500);
      router.push(PATHS.signin);
      return;
    }

    // 교환받은 access_token을 백엔드에 전달
    postLogin(
      {
        providerId: "kakao",
        appId: "SPORTSIN",
        accessToken: kakaoAccessToken,
      },
      {
        onSuccess: (userToken) => {
          // 토큰 저장
          setAuthToken(userToken.accessToken, userToken.expiresAt);
          setStatus("success");

          // name이 없으면 signin으로 이동하고 데이터 저장
          const shouldGoToSignin = !userToken.name || userToken.name.trim() === "";

          if (shouldGoToSignin) {
            // signin 페이지에 전달할 데이터 저장
            setSigninData({
              imageUrl: userToken.imageUrl,
              nickname: userToken.nickname,
              name: userToken.name,
              userId: userToken.userId,
            });

            delay(1500).then(() => {
              router.replace(PATHS.signin);
            });
          } else {
            // name이 있으면 home으로 이동
            delay(1500).then(() => {
              router.replace(PATHS.home);
            });
          }
        },
        onError: (error) => {
          console.error("OAuth authentication error:", error);
          setStatus("error");
          setErrorMessage(error instanceof Error ? error.message : "인증에 실패했습니다.");
        },
      }
    );
  };

  useEffect(() => {
    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-white/70">로그인 처리중...</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white/70">로그인 성공!</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-white/70">{errorMessage || "로그인 실패"}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
