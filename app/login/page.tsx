"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { KakaoScript } from "@/login/components/kakao-script";
import { isAuthenticated } from "@/lib/utils/auth";
import { PATHS } from "@/constants/paths";
import { Logo } from "@/lib/assets";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push(PATHS.root);
    }
  }, [router]);

  const handleAppleLogin = () => {
    // Apple 로그인 로직
    console.log("Apple login");
  };

  const handleNaverLogin = () => {
    // Naver 로그인 로직
    console.log("Naver login");
  };

  const handleKakaoLogin = () => {
    // Kakao 로그인 로직
    if (window.Kakao) {
      window.Kakao.Auth.authorize({
        redirectUri: `${window.location.origin}/login/callback`,
      });
    }
  };

  return (
    <>
      <KakaoScript />
      <main className="relative flex flex-col items-center justify-center min-h-screen bg-[#0A0A0A] overflow-hidden px-6">
        {/* Background glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center w-full max-w-[360px]">
          {/* Logo */}
          <motion.div layoutId="shared-logo" className="mb-16">
            <Logo className="w-[180px] h-[60px]" />
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-12">Log in</h1>

          {/* Login Buttons */}
          <div className="w-full space-y-3">
            {/* Apple Login */}
            <button
              onClick={handleAppleLogin}
              className="w-full bg-white hover:bg-gray-100 active:bg-gray-200 text-black font-semibold py-4 px-6 rounded-2xl transition-colors flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span>Continue with Apple</span>
            </button>

            {/* Naver Login */}
            <button
              onClick={handleNaverLogin}
              className="w-full bg-white hover:bg-gray-100 active:bg-gray-200 text-black font-semibold py-4 px-6 rounded-2xl transition-colors flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#03C75A">
                <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z"/>
              </svg>
              <span>Continue with Naver</span>
            </button>

            {/* Kakao Login */}
            <button
              onClick={handleKakaoLogin}
              className="w-full bg-white hover:bg-gray-100 active:bg-gray-200 text-black font-semibold py-4 px-6 rounded-2xl transition-colors flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.794 1.85 5.246 4.634 6.632-.196.717-.638 2.353-.733 2.717-.114.438.161.433.339.315.145-.095 2.372-1.604 3.26-2.204.48.067.973.1 1.5.1 5.523 0 10-3.477 10-7.8S17.523 3 12 3z"/>
              </svg>
              <span>Continue with Kakao</span>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
