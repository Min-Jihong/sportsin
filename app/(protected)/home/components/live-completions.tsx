"use client";

import { motion } from "framer-motion";
import { Play, Image as ImageIcon, Zap } from "lucide-react";
import { getStaggerDelay } from "../lib/animations";

export interface LiveCompletion {
  id: string;
  playerName: string;
  playerImage?: string;
  questTitle: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  completedAt: number;
}

interface LiveCompletionsProps {
  completions: LiveCompletion[];
  onCompletionClick?: (completion: LiveCompletion) => void;
}

const formatTimeAgo = (timestamp: number): string => {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor(diff / 1000);

  if (minutes > 0) return `${minutes}분 전`;
  if (seconds > 10) return `${seconds}초 전`;
  return "방금 전";
};

export const LiveCompletions = ({ completions, onCompletionClick }: LiveCompletionsProps) => {
  return (
    <div className="w-full px-4 py-4 border-b border-white/10">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <h3 className="text-base font-bold text-white">실시간 완료</h3>
        <span className="text-xs text-white/50">지금 막 완료된 퀘스트</span>
      </div>
      
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {completions.map((completion, index) => (
          <motion.div
            key={completion.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: getStaggerDelay(index, 0.05, 0.02) }}
            className="flex-shrink-0 w-32 cursor-pointer active:scale-95 transition-transform"
            onClick={() => onCompletionClick?.(completion)}
          >
            {/* 미디어 썸네일 */}
            <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-black mb-2">
              {completion.mediaType === "image" ? (
                <img
                  src={completion.mediaUrl}
                  alt={completion.questTitle}
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <video
                    src={completion.mediaUrl}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                </>
              )}
              
              {/* 실시간 배지 */}
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </div>

            {/* 정보 */}
            <div className="px-1">
              <p className="text-xs font-semibold text-white truncate mb-0.5">
                {completion.questTitle}
              </p>
              <div className="flex items-center gap-1.5 mb-1">
                {completion.playerImage ? (
                  <img
                    src={completion.playerImage}
                    alt={completion.playerName}
                    className="w-4 h-4 rounded-full"
                  />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-white/10" />
                )}
                <p className="text-xs text-white/70 truncate">{completion.playerName}</p>
              </div>
              <p className="text-xs text-yellow-400">{formatTimeAgo(completion.completedAt)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

