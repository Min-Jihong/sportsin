"use client";

import { useState } from "react";
import { FeedHeader } from "./components/feed-header";
import { StoryList } from "./components/story-list";
import { FeedList } from "./components/feed-list";
import { StoryUploadModal } from "./components/story-upload-modal";
import { mockStories, mockFeedItems } from "./lib/mock-data";
import type { StoryItemProps } from "./components/story-item";

const HomePage = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleMyStoryClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleStoryClick = (story: StoryItemProps) => {
    // TODO: 스토리 뷰어 열기
    console.log("스토리 보기:", story.username);
  };

  const handleStorySave = (imageUrl: string) => {
    // TODO: 스토리 저장 로직
    console.log("스토리 저장:", imageUrl);
  };

  return (
    <div className="min-h-screen bg-black">
      <FeedHeader />
      <StoryList stories={mockStories} onMyStoryClick={handleMyStoryClick} onStoryClick={handleStoryClick} />
      <main className="pb-20">
        <FeedList items={mockFeedItems} />
      </main>
      <StoryUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSave={handleStorySave}
      />
    </div>
  );
};

export default HomePage;
