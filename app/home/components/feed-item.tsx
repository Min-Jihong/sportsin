"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils/cn";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";

export interface FeedItemProps {
  id: string;
  author: {
    username: string;
    avatar?: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked?: boolean;
}

export function FeedItem({
  author,
  image,
  caption,
  likes,
  comments,
  timestamp,
  isLiked: initialIsLiked = false,
}: FeedItemProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <article className="bg-black border-b border-border">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage src={author.avatar} alt={author.username} />
            <AvatarFallback>{author.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-foreground">{author.username}</span>
        </div>
        <button className="p-1 hover:opacity-70 transition-opacity">
          <MoreHorizontal className="size-5 text-foreground" />
        </button>
      </div>

      {/* 이미지 */}
      <div className="w-full aspect-square bg-muted relative overflow-hidden">
        <img src={image} alt={caption} className="w-full h-full object-cover" />
      </div>

      {/* 액션 버튼 */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className="p-1 hover:opacity-70 transition-opacity"
              aria-label={isLiked ? "좋아요 취소" : "좋아요"}
            >
              <Heart
                className={cn("size-6 transition-colors", isLiked ? "fill-red-500 text-red-500" : "text-foreground")}
              />
            </button>
            <button className="p-1 hover:opacity-70 transition-opacity" aria-label="댓글">
              <MessageCircle className="size-6 text-foreground" />
            </button>
            <button className="p-1 hover:opacity-70 transition-opacity" aria-label="공유">
              <Share2 className="size-6 text-foreground" />
            </button>
          </div>
          <button className="p-1 hover:opacity-70 transition-opacity" aria-label="저장">
            <Bookmark className="size-6 text-foreground" />
          </button>
        </div>

        {/* 좋아요 수 */}
        {likeCount > 0 && (
          <div className="mb-1">
            <span className="font-semibold text-foreground">{likeCount.toLocaleString()}명이 좋아합니다</span>
          </div>
        )}

        {/* 캡션 */}
        <div className="mb-1">
          <span className="font-semibold text-foreground mr-2">{author.username}</span>
          <span className="text-foreground">{caption}</span>
        </div>

        {/* 댓글 보기 */}
        {comments > 0 && (
          <button className="text-muted-foreground text-sm mb-1 hover:text-foreground transition-colors">
            댓글 {comments.toLocaleString()}개 모두 보기
          </button>
        )}

        {/* 타임스탬프 */}
        <div className="text-muted-foreground text-xs mt-2">{timestamp}</div>
      </div>
    </article>
  );
}
