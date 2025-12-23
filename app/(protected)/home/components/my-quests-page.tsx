"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Clock, CheckCircle2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Quest } from "./quest-card";

interface MyQuest extends Quest {
  status: "in_progress" | "completed" | "failed";
  acceptedAt: number;
  completedAt?: number;
}

const mockMyQuests: MyQuest[] = [
  {
    id: "1",
    title: "골키퍼 세이브 챌린지",
    description: "경기 중 멋진 세이브를 기록하고 인증샷을 올려보세요!",
    thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    completedCount: 42,
    status: "in_progress",
    acceptedAt: Date.now() - 86400000,
  },
  {
    id: "2",
    title: "프리킥 골 넣기",
    description: "프리킥 상황에서 골을 넣고 영상을 공유하세요",
    completedCount: 28,
    status: "completed",
    acceptedAt: Date.now() - 172800000,
    completedAt: Date.now() - 86400000,
  },
  {
    id: "3",
    title: "팀워크 어시스트",
    description: "팀원과의 완벽한 패스 플레이를 보여주세요",
    completedCount: 35,
    status: "failed",
    acceptedAt: Date.now() - 259200000,
  },
];

const statusConfig = {
  in_progress: {
    icon: Clock,
    label: "진행 중",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-500/50",
  },
  completed: {
    icon: CheckCircle2,
    label: "완료",
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    borderColor: "border-green-500/50",
  },
  failed: {
    icon: XCircle,
    label: "실패",
    color: "text-red-400",
    bgColor: "bg-red-500/20",
    borderColor: "border-red-500/50",
  },
};

export const MyQuestsPage = () => {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<"all" | MyQuest["status"]>("all");
  const [myQuests, setMyQuests] = useState<MyQuest[]>([]);

  useEffect(() => {
    // localStorage에서 저장된 퀘스트 가져오기
    const savedQuests = JSON.parse(localStorage.getItem("acceptedQuests") || "[]");
    if (savedQuests.length > 0) {
      setMyQuests(savedQuests);
    } else {
      // 저장된 퀘스트가 없으면 mock 데이터 사용
      setMyQuests(mockMyQuests);
    }
  }, []);

  const filteredQuests =
    selectedStatus === "all"
      ? myQuests
      : myQuests.filter((quest) => quest.status === selectedStatus);

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* 헤더 */}
      <div className="relative backdrop-blur-xl bg-white/5 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-4 px-4 py-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">내 퀘스트</h1>
        </div>

        {/* 필터 탭 */}
        <div className="flex gap-2 px-4 pb-4">
          {(["all", "in_progress", "completed", "failed"] as const).map((status) => {
            const config = status === "all" ? null : statusConfig[status];
            const isActive = selectedStatus === status;

            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  isActive
                    ? "bg-blue-500 text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                )}
              >
                {status === "all" ? "전체" : config?.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 퀘스트 목록 */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="container mx-auto px-4 py-6 space-y-4">
          {filteredQuests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-white/50">
              <Trophy className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg">퀘스트가 없습니다</p>
            </div>
          ) : (
            filteredQuests.map((quest, index) => {
              const config = statusConfig[quest.status];
              const StatusIcon = config.icon;

              return (
                <motion.div
                  key={quest.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
                  className={cn(
                    "relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden",
                    "hover:bg-white/10 transition-all cursor-pointer"
                  )}
                  onClick={() => {
                    // TODO: 퀘스트 상세 페이지로 이동
                    console.log("퀘스트 상세:", quest.id);
                  }}
                >
                  {/* 배경 이미지 */}
                  {quest.thumbnail && (
                    <div className="absolute inset-0">
                      <img
                        src={quest.thumbnail}
                        alt={quest.title}
                        className="w-full h-32 object-cover opacity-30"
                      />
                      <div className="absolute inset-0 bg-linear-to-b from-black/60 to-black/90" />
                    </div>
                  )}

                  <div className="relative z-10 p-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{quest.title}</h3>
                        <p className="text-sm text-white/70 line-clamp-2">{quest.description}</p>
                      </div>
                      <div
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 rounded-full",
                          config.bgColor,
                          config.borderColor,
                          "border"
                        )}
                      >
                        <StatusIcon className={cn("w-4 h-4", config.color)} />
                        <span className={cn("text-xs font-medium", config.color)}>
                          {config.label}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 text-xs text-white/50">
                      <div className="flex items-center gap-4">
                        <span>도전일: {formatDate(quest.acceptedAt)}</span>
                        {quest.completedAt && (
                          <span>완료일: {formatDate(quest.completedAt)}</span>
                        )}
                      </div>
                      <span>✓ {quest.completedCount}명 완료</span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

