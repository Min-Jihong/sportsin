"use client";

import { useRouter } from "next/navigation";
import { SeasonHeader } from "./components/season-header";
import { LiveCompletions, type LiveCompletion } from "./components/live-completions";
import { QuestList } from "./components/quest-list";
import { QuestDetailModal } from "./components/quest-detail-modal";
import { mockCurrentSeason } from "./lib/mock-season";
import { mockLiveCompletions } from "./lib/mock-live-completions";
import { mockQuests } from "./lib/mock-quests";
import { mockCompletions } from "./lib/mock-quests";
import type { Quest } from "./components/quest-card";
import type { QuestCompletion } from "./components/quest-detail-modal";
import { useState } from "react";

const HomePage = () => {
  const router = useRouter();
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);

  const handleQuestClick = (quest: Quest) => {
    router.push(`/quests/${quest.id}`);
  };

  const handleLiveCompletionClick = (completion: LiveCompletion) => {
    // 실시간 완료 아이템 클릭 시 해당 퀘스트 상세 모달 열기
    const quest = mockQuests.find((q) => q.title.includes(completion.questTitle.split(" ")[0]));
    if (quest) {
      setSelectedQuest(quest);
      setIsQuestModalOpen(true);
    }
  };

  const getQuestCompletions = (questId: string): QuestCompletion[] => {
    // TODO: API 호출로 퀘스트 완료 목록 가져오기
    return mockCompletions[questId] || [];
  };

  return (
    <div className="h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* 메인 콘텐츠 - 스크롤 가능 */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="w-full">
          {/* 시즌 헤더 */}
          <SeasonHeader season={mockCurrentSeason} />

          {/* 실시간 완료 피드 */}
          <LiveCompletions completions={mockLiveCompletions} onCompletionClick={handleLiveCompletionClick} />

          {/* 시즌 퀘스트 목록 */}
          <QuestList quests={mockQuests} onQuestClick={handleQuestClick} />
        </div>
      </div>

      {/* 퀘스트 상세 모달 */}
      {selectedQuest && (
        <QuestDetailModal
          isOpen={isQuestModalOpen}
          onClose={() => {
            setIsQuestModalOpen(false);
            setSelectedQuest(null);
          }}
          quest={selectedQuest}
          completions={getQuestCompletions(selectedQuest.id)}
        />
      )}
    </div>
  );
};

export default HomePage;
