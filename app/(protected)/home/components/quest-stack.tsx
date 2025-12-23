"use client";

import { useState } from "react";
import { QuestCard, type Quest } from "./quest-card";
import { QuestDetailModal, type QuestCompletion } from "./quest-detail-modal";

interface QuestStackProps {
  quests: Quest[];
  onQuestAccept: (questId: string) => void;
  onQuestSkip: (questId: string) => void;
  getQuestCompletions: (questId: string) => QuestCompletion[];
}

export const QuestStack = ({ quests, onQuestAccept, onQuestSkip, getQuestCompletions }: QuestStackProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentQuest = quests[currentIndex];
  const visibleQuests = quests.slice(currentIndex, currentIndex + 3);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      // 도전
      onQuestAccept(currentQuest.id);
    } else {
      // 스킵
      onQuestSkip(currentQuest.id);
    }

    // 다음 퀘스트로 이동
    if (currentIndex < quests.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleTap = () => {
    if (currentQuest) {
      setSelectedQuest(currentQuest);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuest(null);
  };

  if (quests.length === 0) {
    return (
      <div className="flex items-center justify-center h-[600px] text-gray-400">
        <p>더 이상 퀘스트가 없습니다</p>
      </div>
    );
  }

  const completions = selectedQuest ? getQuestCompletions(selectedQuest.id) : [];

  return (
    <>
      <div className="relative w-full h-[600px] flex items-center justify-center">
        {visibleQuests.map((quest, index) => (
          <QuestCard
            key={quest.id}
            quest={quest}
            onSwipe={index === 0 ? handleSwipe : () => {}}
            onTap={index === 0 ? handleTap : () => {}}
            index={index}
            total={visibleQuests.length}
          />
        ))}
      </div>

      <QuestDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        quest={selectedQuest}
        completions={completions}
      />
    </>
  );
};
