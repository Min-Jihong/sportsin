"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Trophy, Award, Calendar, ArrowLeft, UserPlus, UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { StatRadarChart, type StatData } from "./stat-radar-chart";
import { ProfileTabs } from "./profile-tabs";
import { ProfileMediaGrid } from "./profile-media-grid";
import { getStaggerDelay } from "../lib/animations";
import { mockBadges, mockCompletedQuests, mockProfileMedia, type ProfileMedia } from "../lib/mock-profile";
import { PATHS } from "@/constants/paths";

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

interface ProfilePageProps {
  userId?: string;
  isOwnProfile?: boolean;
}

export const ProfilePage = ({ userId, isOwnProfile = true }: ProfilePageProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"stats" | "media">("media");
  const averageValue = Math.round(mockStats.reduce((sum, stat) => sum + stat.value, 0) / mockStats.length);

  // TODO: userId로 실제 사용자 데이터 가져오기
  const isFollowing = false; // 다른 사용자 프로필일 때 팔로우 상태

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleMediaClick = (media: ProfileMedia) => {
    // TODO: 미디어 상세 페이지로 이동
    console.log("미디어 클릭:", media);
  };

  const handleFollow = () => {
    // TODO: 팔로우/언팔로우 API 호출
    console.log("팔로우:", userId);
  };

  return (
    <div className="h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* 헤더 */}
      <div className="shrink-0 flex items-center justify-between px-4 py-4 border-b border-white/10">
        {!isOwnProfile && (
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        )}
        <h1 className="text-xl font-bold text-white flex-1 text-center">{isOwnProfile ? "프로필" : "프로필"}</h1>
        {isOwnProfile ? (
          <button
            onClick={() => router.push("/settings")}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Settings className="w-5 h-5 text-white" />
          </button>
        ) : (
          <button onClick={handleFollow} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            {isFollowing ? (
              <UserCheck className="w-5 h-5 text-blue-400" />
            ) : (
              <UserPlus className="w-5 h-5 text-white" />
            )}
          </button>
        )}
      </div>

      {/* 프로필 정보 */}
      <div className="shrink-0 px-4 py-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">U</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-1">사용자 이름</h2>
            <p className="text-sm text-white/70 mb-2">축구 플레이어</p>
            <div className="flex items-center gap-4 text-xs text-white/50">
              <div className="flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                <span>{mockCompletedQuests.length}개 완료</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-3 h-3" />
                <span>{mockBadges.length}개 뱃지</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 탭 */}
      <div className="shrink-0">
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === "media" ? (
          <div className="w-full px-4 py-6">
            <ProfileMediaGrid media={mockProfileMedia} onMediaClick={handleMediaClick} />
          </div>
        ) : (
          <div className="w-full">
            {/* 능력치 */}
            <div className="px-4 py-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">능력치</h3>
                {isOwnProfile && (
                  <button
                    onClick={() => router.push(PATHS.stats)}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    상세 보기 →
                  </button>
                )}
              </div>
              <div className="flex justify-center mb-4">
                <StatRadarChart stats={mockStats} size={280} />
              </div>
              <div className="flex items-center justify-center gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>평균: {averageValue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>상위 15%</span>
                </div>
              </div>
            </div>

            {/* 뱃지 */}
            <div className="px-4 py-6 border-b border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">받은 뱃지</h3>
              <div className="grid grid-cols-5 gap-3">
                {mockBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: getStaggerDelay(index, 0.1, 0.05) }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${badge.color}20`, border: `2px solid ${badge.color}` }}
                    >
                      <Trophy className="w-7 h-7" style={{ color: badge.color }} />
                    </div>
                    <p className="text-xs text-white/70 text-center line-clamp-2">{badge.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 클리어한 퀘스트 */}
            <div className="px-4 py-6">
              <h3 className="text-lg font-bold text-white mb-4">클리어한 퀘스트</h3>
              <div className="space-y-0">
                {mockCompletedQuests.map((quest, index) => (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: getStaggerDelay(index, 0.1, 0.05) }}
                    className="w-full py-4 border-b border-white/10 cursor-pointer active:bg-white/5 transition-colors"
                    onClick={() => router.push(`/quests/${quest.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      {/* 썸네일 */}
                      {quest.thumbnail ? (
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                          <img src={quest.thumbnail} alt={quest.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                          <Trophy className="w-7 h-7 text-white/50" />
                        </div>
                      )}

                      {/* 퀘스트 정보 */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-white mb-1">{quest.title}</h4>
                        <p className="text-sm text-white/60 mb-2 line-clamp-1">{quest.description}</p>
                        <div className="flex items-center gap-3 text-xs text-white/50">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(quest.completedAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* 완료 표시 */}
                      <div className="shrink-0">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Trophy className="w-4 h-4 text-green-400" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
