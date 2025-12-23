"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { PATHS } from "@/constants/paths";
import { fadeIn } from "../lib/animations";

export const MyQuestsButton = () => {
  const router = useRouter();

  return (
    <motion.button
      {...fadeIn}
      transition={{ ...fadeIn.transition, delay: 0.1 }}
      onClick={() => router.push(PATHS.myQuests)}
      className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 overflow-hidden hover:bg-white/10 transition-all w-full"
    >
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-500/20">
            <Target className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">내 퀘스트</h3>
            <p className="text-xs text-white/50 mt-0.5">도전한 퀘스트 확인하기</p>
          </div>
        </div>
        <div className="text-white/30">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
};
