"use client";

import { StoryItem, type StoryItemProps } from "./story-item";

interface StoryListProps {
  stories: StoryItemProps[];
  onMyStoryClick?: () => void;
  onStoryClick?: (story: StoryItemProps) => void;
}

export function StoryList({ stories, onMyStoryClick, onStoryClick }: StoryListProps) {
  return (
    <div className="w-full bg-black border-b border-border py-4">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex items-start gap-4 px-4">
          {stories.map((story) => (
            <StoryItem
              key={story.id}
              story={story}
              onClick={() => {
                if (story.isMyStory && onMyStoryClick) {
                  onMyStoryClick();
                } else if (onStoryClick) {
                  onStoryClick(story);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
