"use client";

import { motion } from "framer-motion";
import { UserPlus, UserCheck } from "lucide-react";
import { getStaggerDelay } from "../../home/lib/animations";
import type { SearchUser } from "../lib/mock-search-data";

interface UserSearchResultsProps {
  users: SearchUser[];
  onUserClick?: (user: SearchUser) => void;
  onFollow?: (userId: string) => void;
}

export const UserSearchResults = ({ users, onUserClick, onFollow }: UserSearchResultsProps) => {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <p className="text-white/50 text-sm">검색 결과가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {users.map((user, index) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: getStaggerDelay(index, 0.05, 0.03) }}
          className="w-full px-4 py-3 border-b border-white/10 cursor-pointer active:bg-white/5 transition-colors"
          onClick={() => onUserClick?.(user)}
        >
          <div className="flex items-center gap-3">
            {/* 프로필 이미지 */}
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.name}
                className="w-12 h-12 rounded-full flex-shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg text-white/70">{user.name[0]}</span>
              </div>
            )}

            {/* 사용자 정보 */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user.name}</p>
              {user.username && (
                <p className="text-xs text-white/50 truncate">@{user.username}</p>
              )}
              {user.bio && (
                <p className="text-xs text-white/60 mt-0.5 line-clamp-1">{user.bio}</p>
              )}
              {user.questsCompleted !== undefined && (
                <p className="text-xs text-white/40 mt-1">퀘스트 {user.questsCompleted}개 완료</p>
              )}
            </div>

            {/* 팔로우 버튼 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFollow?.(user.id);
              }}
              className={user.isFollowing ? "text-white/50" : "text-blue-400"}
            >
              {user.isFollowing ? (
                <UserCheck className="w-5 h-5" />
              ) : (
                <UserPlus className="w-5 h-5" />
              )}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

