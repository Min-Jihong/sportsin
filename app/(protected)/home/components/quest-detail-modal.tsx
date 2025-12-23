"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Quest } from "./quest-card";

export interface QuestCompletion {
  id: string;
  playerId?: string;
  playerName: string;
  playerImage?: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  completedAt: number;
}

interface QuestDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  quest: Quest | null;
  completions: QuestCompletion[];
}

export const QuestDetailModal = ({ isOpen, onClose, quest, completions }: QuestDetailModalProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // 모달이 열릴 때 body 스크롤 막기 및 포지셔닝
  useEffect(() => {
    if (isOpen) {
      // body 스크롤 막기
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
    } else {
      // 원래대로 복원
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, [isOpen]);

  if (!quest) return null;

  const currentCompletion = completions[currentIndex];
  const hasNext = currentIndex < completions.length - 1;
  const hasPrev = currentIndex > 0;

  const handleNext = () => {
    if (hasNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (hasPrev) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            className="fixed inset-0 bg-black/90 z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 모달 컨텐츠 - 화면 전체를 꽉 채움 */}
          <motion.div
            className="fixed inset-0 z-[10000] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <div
              className="absolute inset-0 w-screen h-screen bg-black overflow-hidden"
              style={{ position: "absolute" }}
            >
              {/* 헤더 */}
              <div className="absolute top-0 left-0 right-0 z-10 bg-linear-to-b from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">{quest.title}</h2>
                    <p className="text-sm text-gray-400 mt-1">
                      {currentIndex + 1} / {completions.length}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* 미디어 컨텐츠 */}
              <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {currentCompletion && (
                    <motion.div
                      key={currentCompletion.id}
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentCompletion.mediaType === "image" ? (
                        <img
                          src={currentCompletion.mediaUrl}
                          alt={`${currentCompletion.playerName}의 완료`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={currentCompletion.mediaUrl}
                          controls
                          autoPlay
                          className="w-full h-full object-cover"
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 이전 버튼 */}
                {hasPrev && (
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                )}

                {/* 다음 버튼 */}
                {hasNext && (
                  <button
                    onClick={handleNext}
                    className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                )}
              </div>

              {/* 플레이어 정보 */}
              {currentCompletion && (
                <div className="absolute bottom-0 left-0 right-0 z-10 bg-linear-to-t from-black/80 to-transparent p-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (currentCompletion.playerId) {
                        router.push(`/profile/${currentCompletion.playerId}`);
                        onClose();
                      }
                    }}
                    className="w-full flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    {currentCompletion.playerImage && (
                      <img
                        src={currentCompletion.playerImage}
                        alt={currentCompletion.playerName}
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                    )}
                    <div className="flex-1 text-left">
                      <p className="text-white font-semibold">{currentCompletion.playerName}</p>
                      <p className="text-gray-400 text-sm">
                        {new Date(currentCompletion.completedAt).toLocaleDateString("ko-KR")}
                      </p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
