"use client";

import { motion } from "framer-motion";
import { loginWithKakao } from "@/lib/utils/kakao";

export function KakaoLoginButton() {
  return (
    <motion.button
      onClick={loginWithKakao}
      className="relative overflow-hidden rounded-xl"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <img
        src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width={222}
        alt="카카오 로그인 버튼"
        className="block"
      />
    </motion.button>
  );
}
