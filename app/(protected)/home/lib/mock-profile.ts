import type { Quest } from "../components/quest-card";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color: string;
  earnedAt: number;
}

export interface CompletedQuest extends Quest {
  completedAt: number;
  mediaUrl?: string;
}

export interface ProfileMedia {
  id: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  uploadedAt: number;
  likes: number;
  comments: number;
}

export const mockBadges: Badge[] = [
  {
    id: "b1",
    name: "첫 퀘스트",
    description: "첫 번째 퀘스트를 완료했습니다",
    color: "#fbbf24",
    earnedAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
  },
  {
    id: "b2",
    name: "연속 도전자",
    description: "7일 연속 퀘스트 완료",
    color: "#3b82f6",
    earnedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
  },
  {
    id: "b3",
    name: "골키퍼 마스터",
    description: "골키퍼 퀘스트 10개 완료",
    color: "#10b981",
    earnedAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
  },
  {
    id: "b4",
    name: "팀워크 전문가",
    description: "팀워크 퀘스트 5개 완료",
    color: "#8b5cf6",
    earnedAt: Date.now() - 21 * 24 * 60 * 60 * 1000,
  },
  {
    id: "b5",
    name: "시즌 챔피언",
    description: "현재 시즌 상위 10% 달성",
    color: "#ef4444",
    earnedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
  },
];

export const mockCompletedQuests: CompletedQuest[] = [
  {
    id: "1",
    title: "골키퍼 세이브 챌린지",
    description: "경기 중 멋진 세이브를 기록하고 인증샷을 올려보세요!",
    thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    completedCount: 42,
    completedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
  },
  {
    id: "2",
    title: "프리킥 골 넣기",
    description: "프리킥 상황에서 골을 넣고 영상을 공유하세요",
    completedCount: 28,
    completedAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
  },
  {
    id: "3",
    title: "팀워크 어시스트",
    description: "팀원과의 완벽한 패스 플레이를 보여주세요",
    completedCount: 35,
    completedAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
  },
  {
    id: "4",
    title: "드리블 스킬 쇼케이스",
    description: "상대를 제치고 나가는 멋진 드리블을 기록하세요",
    completedCount: 51,
    completedAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
  },
];

export const mockProfileMedia: ProfileMedia[] = [
  {
    id: "pm1",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "image",
    uploadedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    likes: 42,
    comments: 8,
  },
  {
    id: "pm2",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "video",
    uploadedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    likes: 128,
    comments: 23,
  },
  {
    id: "pm3",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "image",
    uploadedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    likes: 89,
    comments: 15,
  },
  {
    id: "pm4",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "image",
    uploadedAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
    likes: 67,
    comments: 12,
  },
  {
    id: "pm5",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "video",
    uploadedAt: Date.now() - 12 * 24 * 60 * 60 * 1000,
    likes: 156,
    comments: 31,
  },
  {
    id: "pm6",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "image",
    uploadedAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    likes: 92,
    comments: 18,
  },
  {
    id: "pm7",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "image",
    uploadedAt: Date.now() - 18 * 24 * 60 * 60 * 1000,
    likes: 73,
    comments: 14,
  },
  {
    id: "pm8",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "video",
    uploadedAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
    likes: 145,
    comments: 27,
  },
  {
    id: "pm9",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "image",
    uploadedAt: Date.now() - 22 * 24 * 60 * 60 * 1000,
    likes: 58,
    comments: 9,
  },
];
