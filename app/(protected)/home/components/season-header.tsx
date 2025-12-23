"use client";

import { motion } from "framer-motion";
import { Calendar, Trophy, Flame } from "lucide-react";
import { fadeIn } from "../lib/animations";
import type { Season } from "../lib/mock-season";
import { getDaysRemaining, getSeasonProgress } from "../lib/mock-season";

interface SeasonHeaderProps {
  season: Season;
}

export const SeasonHeader = ({ season }: SeasonHeaderProps) => {
  const daysRemaining = getDaysRemaining(season.endDate);
  const progress = getSeasonProgress(season);

  return (
    <motion.div
      {...fadeIn}
      transition={{ ...fadeIn.transition, delay: 0 }}
      className="w-full px-4 py-6 border-b border-white/10"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-bold text-white">{season.name}</h2>
            <span className="text-sm text-white/50">시즌 {season.number}</span>
          </div>
          <p className="text-sm text-white/70 mb-3">{season.description}</p>
          
          {/* 진행도 */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-white/60 mb-1">
              <span>시즌 진행도</span>
              <span className="font-semibold text-white">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-orange-500 to-red-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-white/50">
              <span>{season.completedQuests} / {season.totalQuests} 퀘스트 완료</span>
            </div>
          </div>
        </div>
      </div>

      {/* 시즌 정보 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-sm text-white/70">
          <Calendar className="w-4 h-4" />
          <span>{daysRemaining}일 남음</span>
        </div>
        {season.reward && (
          <div className="flex items-center gap-1.5 text-sm text-yellow-400">
            <Trophy className="w-4 h-4" />
            <span>{season.reward}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

