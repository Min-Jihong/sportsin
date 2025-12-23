"use client";

import { Trophy, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeIn, getStaggerDelay } from "../lib/animations";

interface StatItem {
  icon: typeof Trophy;
  label: string;
  value: string | number;
  color: string;
}

const stats: StatItem[] = [
  { icon: Trophy, label: "완료한 퀘스트", value: 12, color: "text-yellow-400" },
  { icon: Target, label: "진행 중", value: 3, color: "text-blue-400" },
  { icon: Zap, label: "연속 기록", value: "7일", color: "text-purple-400" },
];

export const StatsCard = () => {
  return (
    <motion.div
      {...fadeIn}
      transition={{ ...fadeIn.transition, delay: 0 }}
      className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 overflow-hidden"
    >
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />

      <div className="relative z-10">
        <h3 className="text-sm font-semibold text-white/70 mb-3">나의 통계</h3>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: getStaggerDelay(index, 0.1, 0.08) }}
                className="flex flex-col items-center gap-2"
              >
                <div className={cn("p-2 rounded-full bg-white/5", stat.color)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-1">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
