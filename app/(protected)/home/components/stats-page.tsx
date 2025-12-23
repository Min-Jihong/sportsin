"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Award, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { StatRadarChart, type StatData } from "./stat-radar-chart";
import { scaleIn, slideInLeft, getStaggerDelay } from "../lib/animations";

const mockStats: StatData[] = [
  { label: "슈팅", value: 85, color: "#ef4444" },
  { label: "패스", value: 78, color: "#3b82f6" },
  { label: "드리블", value: 72, color: "#10b981" },
  { label: "수비", value: 68, color: "#f59e0b" },
  { label: "체력", value: 90, color: "#8b5cf6" },
  { label: "스피드", value: 82, color: "#ec4899" },
  { label: "골키퍼", value: 45, color: "#06b6d4" },
  { label: "팀워크", value: 88, color: "#14b8a6" },
];

export const StatsPage = () => {
  const router = useRouter();

  const averageValue = Math.round(mockStats.reduce((sum, stat) => sum + stat.value, 0) / mockStats.length);

  return (
    <div className="h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* 헤더 */}
      <div className="relative backdrop-blur-xl bg-white/5 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-4 px-4 py-4">
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">능력치</h1>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* 레이더 차트 */}
          <motion.div
            {...scaleIn}
            transition={{ ...scaleIn.transition, delay: 0, ease: [0.4, 0, 0.2, 1] as const }}
            className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 via-pink-500/10 to-red-500/10" />
            <div className="relative z-10">
              <div className="flex justify-center flex-col items-center gap-4">
                <StatRadarChart stats={mockStats} size={300} />
                <div className="flex items-center gap-4 text-sm text-white">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>상위 15%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span>목표: 90</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* 상세 통계 리스트 */}
          <div className="space-y-3">
            {mockStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                {...slideInLeft}
                transition={{
                  ...slideInLeft.transition,
                  delay: getStaggerDelay(index, 0.3, 0.05),
                  ease: [0.4, 0, 0.2, 1] as const,
                }}
                className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }} />
                    <span className="font-semibold text-white">{stat.label}</span>
                  </div>
                  <span className="text-lg font-bold text-white">{stat.value}</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: stat.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{
                      delay: getStaggerDelay(index, 0.5, 0.05),
                      duration: 0.8,
                      ease: [0.4, 0, 0.2, 1] as const,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
