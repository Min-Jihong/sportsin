"use client";

import { motion } from "framer-motion";
import { Trophy, Users, ChevronRight } from "lucide-react";
import { getStaggerDelay } from "../lib/animations";
import type { Quest } from "./quest-card";

interface QuestListProps {
  quests: Quest[];
  onQuestClick?: (quest: Quest) => void;
}

export const QuestList = ({ quests, onQuestClick }: QuestListProps) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-white mb-4 px-4">추천 퀘스트</h3>
      <div className="space-y-0">
        {quests.map((quest, index) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: getStaggerDelay(index, 0.1, 0.03) }}
            className="w-full px-4 py-4 border-b border-white/10 cursor-pointer active:bg-white/5 transition-colors"
            onClick={() => onQuestClick?.(quest)}
          >
            <div className="flex items-center gap-4">
              {/* 썸네일 */}
              {quest.thumbnail ? (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={quest.thumbnail} alt={quest.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-7 h-7 text-white/50" />
                </div>
              )}

              {/* 퀘스트 정보 */}
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-semibold text-white mb-1">{quest.title}</h4>
                <p className="text-sm text-white/60 mb-2 line-clamp-1">{quest.description}</p>
                <div className="flex items-center gap-1 text-xs text-white/50">
                  <Users className="w-3 h-3" />
                  <span>{quest.completedCount}명 완료</span>
                </div>
              </div>

              {/* 화살표 */}
              <div className="flex-shrink-0">
                <ChevronRight className="w-5 h-5 text-white/30" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
