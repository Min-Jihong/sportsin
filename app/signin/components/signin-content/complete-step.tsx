"use client";

import { motion } from "framer-motion";
import { AnimationContainer } from "./animation-container";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PATHS } from "@/constants/paths";

export const CompleteStep = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push(PATHS.home);
    }, 3000);
  }, [router]);
  return (
    <AnimationContainer className="flex flex-col items-center justify-center gap-8 w-full px-4 h-full">
      {/* 메인 로딩 스피너 */}
      <div className="relative size-32 flex items-center justify-center">
        {/* 외부 회전 링 */}
        <motion.div
          className="absolute inset-0 border-4 border-blue-500/20 border-t-blue-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* 내부 펄스 원 */}
        <motion.div
          className="absolute inset-8 bg-blue-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 중앙 아이콘 */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Loader2 className="size-12 text-blue-400" />
        </motion.div>
      </div>

      {/* 텍스트 영역 */}
      <div className="text-center space-y-4">
        <motion.h1
          className="text-2xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          회원가입 처리 중입니다
        </motion.h1>

        <motion.p
          className="text-white/70 text-sm leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          잠시만 기다려주세요
        </motion.p>
      </div>

      {/* 하단 점 애니메이션 */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-3 h-3 bg-blue-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          />
        ))}
      </div>

      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </AnimationContainer>
  );
};
