"use client";

import { motion } from "framer-motion";
import { Play, Heart, MessageCircle } from "lucide-react";
import { getStaggerDelay } from "../../home/lib/animations";
import type { SearchMedia } from "../lib/mock-search-data";

interface MediaSearchResultsProps {
  media: SearchMedia[];
  onMediaClick?: (media: SearchMedia) => void;
}

export const MediaSearchResults = ({ media, onMediaClick }: MediaSearchResultsProps) => {
  if (media.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <p className="text-white/50 text-sm">검색 결과가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-3 gap-0.5">
      {media.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: getStaggerDelay(index, 0.03, 0.02) }}
          className="relative aspect-square bg-black cursor-pointer active:opacity-80 transition-opacity"
          onClick={() => onMediaClick?.(item)}
        >
          {item.mediaType === "image" ? (
            <img
              src={item.mediaUrl}
              alt={item.questTitle || "미디어"}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <video
                src={item.mediaUrl}
                className="w-full h-full object-cover"
                muted
                playsInline
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Play className="w-6 h-6 text-white fill-white" />
              </div>
            </>
          )}

          {/* 오버레이 정보 */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span className="text-xs font-medium">{item.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs font-medium">{item.comments}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

