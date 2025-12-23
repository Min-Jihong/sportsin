import type { LiveCompletion } from "../components/live-completions";

export const mockLiveCompletions: LiveCompletion[] = [
  {
    id: "lc1",
    playerName: "김철수",
    playerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    questTitle: "골키퍼 세이브",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "image",
    completedAt: Date.now() - 30000, // 30초 전
  },
  {
    id: "lc2",
    playerName: "이영희",
    playerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    questTitle: "프리킥 골",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "video",
    completedAt: Date.now() - 120000, // 2분 전
  },
  {
    id: "lc3",
    playerName: "박민수",
    playerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    questTitle: "드리블 스킬",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "image",
    completedAt: Date.now() - 180000, // 3분 전
  },
  {
    id: "lc4",
    playerName: "최지영",
    playerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    questTitle: "팀워크 어시스트",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "image",
    completedAt: Date.now() - 240000, // 4분 전
  },
  {
    id: "lc5",
    playerName: "정대현",
    playerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    questTitle: "헤딩 골",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "video",
    completedAt: Date.now() - 300000, // 5분 전
  },
];

