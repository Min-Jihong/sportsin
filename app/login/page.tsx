"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { KakaoScript } from "@/login/components/kakao-script";
import { KakaoLoginButton } from "@/login/components/kakao-login-button";
import { isAuthenticated } from "@/lib/utils/auth";
import { PATHS } from "@/constants/paths";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push(PATHS.root);
    }
  }, [router]);

  return (
    <>
      <KakaoScript />
      <div className="flex items-center justify-center min-h-screen bg-black p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-gray-950 rounded-3xl p-8 shadow-2xl border border-blue-500/20"
        >
          <div className="flex flex-col items-center gap-8">
            <div className="text-center space-y-3">
              <h1 className="text-2xl font-bold text-white">로그인</h1>
              <p className="text-white/70 text-sm">카카오 계정으로 간편하게 시작하세요</p>
            </div>
            <KakaoLoginButton />
          </div>
        </motion.div>
      </div>
    </>
  );
}
