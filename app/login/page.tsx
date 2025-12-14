"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { KakaoScript } from "@/login/components/kakao-script";
import { KakaoLoginButton } from "@/login/components/kakao-login-button";
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

  return (
    <>
      <KakaoScript />
      <main className="relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none opacity-50" />

        <div className="relative z-10 flex flex-col items-center w-full max-w-[320px]">
          <motion.div layoutId="shared-logo" className="mb-10">
            <Logo className="w-[212px] h-[72px]" />
          </motion.div>
          <KakaoLoginButton />
        </div>
      </main>
    </>
  );
}
