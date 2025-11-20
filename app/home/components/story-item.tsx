"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface StoryItemProps {
  id: string;
  username: string;
  avatar?: string;
  image?: string;
  isMyStory?: boolean;
  hasNewStory?: boolean;
}

interface StoryItemComponentProps {
  story: StoryItemProps;
  onClick?: () => void;
}

export function StoryItem({ story, onClick }: StoryItemComponentProps) {
  const { username, avatar, image, isMyStory, hasNewStory } = story;

  if (isMyStory) {
    return (
      <button
        onClick={onClick}
        className="flex flex-col items-center gap-2 min-w-[70px] group"
        aria-label="내 스토리 추가"
      >
        <div className="relative">
          <Avatar className="size-16 border-2 border-border">
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback className="bg-muted text-muted-foreground">
              {username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-background">
            <Plus className="size-4 text-white" />
          </div>
        </div>
        <span className="text-xs text-foreground truncate max-w-[70px]">내 스토리</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 min-w-[70px] group"
      aria-label={`${username}의 스토리 보기`}
    >
      <div className="relative">
        <div
          className={cn(
            "rounded-full p-0.5",
            hasNewStory
              ? "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500"
              : "bg-border"
          )}
        >
          <Avatar className="size-16 border-2 border-background">
            <AvatarImage src={image || avatar} alt={username} />
            <AvatarFallback className="bg-muted text-muted-foreground">
              {username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <span className="text-xs text-foreground truncate max-w-[70px]">{username}</span>
    </button>
  );
}

