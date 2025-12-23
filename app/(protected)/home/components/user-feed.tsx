"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Play } from "lucide-react";
import { getStaggerDelay } from "../lib/animations";

export interface FeedItem {
  id: string;
  playerName: string;
  playerImage?: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  questTitle?: string;
  likes: number;
  comments: number;
  uploadedAt: number;
}

interface UserFeedProps {
  items: FeedItem[];
  onItemClick?: (item: FeedItem) => void;
}

const formatTimeAgo = (timestamp: number): string => {
  const diff = Date.now() - timestamp;
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor(diff / 60000);

  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  return "방금 전";
};

export const UserFeed = ({ items, onItemClick }: UserFeedProps) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-white mb-4 px-4">최근 업로드</h3>
      <div className="space-y-0">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: getStaggerDelay(index, 0.05, 0.03) }}
            className="w-full cursor-pointer active:bg-white/5 transition-colors"
            onClick={() => onItemClick?.(item)}
          >
            {/* 미디어 - 전체 너비 */}
            <div className="relative w-full aspect-video bg-black">
              {item.mediaType === "image" ? (
                <img src={item.mediaUrl} alt={item.questTitle || "업로드"} className="w-full h-full object-cover" />
              ) : (
                <>
                  <video src={item.mediaUrl} className="w-full h-full object-cover" muted playsInline />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                </>
              )}

              {/* 퀘스트 태그 */}
              {item.questTitle && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                  <span className="text-xs font-semibold text-white">{item.questTitle}</span>
                </div>
              )}
            </div>

            {/* 사용자 정보 및 액션 */}
            <div className="px-4 py-3 border-b border-white/10">
              {/* 사용자 정보 */}
              <div className="flex items-center gap-3 mb-3">
                {item.playerImage ? (
                  <img src={item.playerImage} alt={item.playerName} className="w-9 h-9 rounded-full" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-xs text-white/70">{item.playerName[0]}</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{item.playerName}</p>
                  <p className="text-xs text-white/50">{formatTimeAgo(item.uploadedAt)}</p>
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex items-center gap-6">
                <button
                  className="flex items-center gap-1.5 text-white/70 active:text-red-400 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.likes}</span>
                </button>
                <button
                  className="flex items-center gap-1.5 text-white/70 active:text-blue-400 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.comments}</span>
                </button>
                <button
                  className="flex items-center gap-1.5 text-white/70 active:text-green-400 transition-colors ml-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
