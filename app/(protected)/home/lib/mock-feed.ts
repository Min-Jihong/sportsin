import type { FeedItem } from "../components/user-feed";

export const mockFeedItems: FeedItem[] = [
  {
    id: "f1",
    playerName: "김철수",
    playerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "image",
    questTitle: "골키퍼 세이브 챌린지",
    likes: 42,
    comments: 8,
    uploadedAt: Date.now() - 3600000, // 1시간 전
  },
  {
    id: "f2",
    playerName: "이영희",
    playerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "video",
    questTitle: "프리킥 골 넣기",
    likes: 128,
    comments: 23,
    uploadedAt: Date.now() - 7200000, // 2시간 전
  },
  {
    id: "f3",
    playerName: "박민수",
    playerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "image",
    questTitle: "드리블 스킬 쇼케이스",
    likes: 89,
    comments: 15,
    uploadedAt: Date.now() - 10800000, // 3시간 전
  },
  {
    id: "f4",
    playerName: "최지영",
    playerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "image",
    questTitle: "팀워크 어시스트",
    likes: 67,
    comments: 12,
    uploadedAt: Date.now() - 14400000, // 4시간 전
  },
  {
    id: "f5",
    playerName: "정대현",
    playerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "video",
    questTitle: "헤딩 골 넣기",
    likes: 156,
    comments: 31,
    uploadedAt: Date.now() - 18000000, // 5시간 전
  },
];

