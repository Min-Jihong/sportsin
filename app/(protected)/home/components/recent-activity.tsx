"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { fadeIn, slideInLeft, getStaggerDelay } from "../lib/animations";

interface Activity {
  id: string;
  playerName: string;
  playerImage?: string;
  questTitle: string;
  completedAt: number;
}

const mockActivities: Activity[] = [
  {
    id: "1",
    playerName: "김철수",
    playerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    questTitle: "골키퍼 세이브 챌린지",
    completedAt: Date.now() - 3600000,
  },
  {
    id: "2",
    playerName: "이영희",
    playerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    questTitle: "프리킥 골 넣기",
    completedAt: Date.now() - 7200000,
  },
  {
    id: "3",
    playerName: "박민수",
    playerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    questTitle: "드리블 스킬 쇼케이스",
    completedAt: Date.now() - 10800000,
  },
];

const formatTimeAgo = (timestamp: number): string => {
  const diff = Date.now() - timestamp;
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor(diff / 60000);

  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  return "방금 전";
};

export const RecentActivity = () => {
  return (
    <motion.div
      {...fadeIn}
      transition={{ ...fadeIn.transition, delay: 0 }}
      className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 overflow-hidden"
    >
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 via-pink-500/10 to-red-500/10" />

      <div className="relative z-10">
        <h3 className="text-lg font-bold text-white mb-4">최근 활동</h3>
        <div className="space-y-3">
          {mockActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              {...slideInLeft}
              transition={{ ...slideInLeft.transition, delay: getStaggerDelay(index, 0.25, 0.08) }}
              className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              {activity.playerImage ? (
                <img
                  src={activity.playerImage}
                  alt={activity.playerName}
                  className="w-10 h-10 rounded-full border-2 border-white/20"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white/50" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">
                  <span className="font-semibold">{activity.playerName}</span>님이{" "}
                  <span className="text-blue-400">{activity.questTitle}</span> 완료
                </p>
                <p className="text-xs text-white/50 mt-0.5">{formatTimeAgo(activity.completedAt)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
