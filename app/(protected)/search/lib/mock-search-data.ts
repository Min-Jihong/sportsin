export interface SearchUser {
  id: string;
  name: string;
  username?: string;
  imageUrl?: string;
  bio?: string;
  isFollowing?: boolean;
  questsCompleted?: number;
}

export interface SearchMedia {
  id: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  playerName: string;
  playerImage?: string;
  questTitle?: string;
  likes: number;
  comments: number;
  uploadedAt: number;
}

export const mockSearchUsers: SearchUser[] = [
  {
    id: "u1",
    name: "김철수",
    username: "kim_chul",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    bio: "축구를 사랑하는 골키퍼",
    isFollowing: false,
    questsCompleted: 12,
  },
  {
    id: "u2",
    name: "이영희",
    username: "lee_young",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    bio: "프리킥 전문가",
    isFollowing: true,
    questsCompleted: 28,
  },
  {
    id: "u3",
    name: "박민수",
    username: "park_min",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    bio: "드리블 마스터",
    isFollowing: false,
    questsCompleted: 35,
  },
  {
    id: "u4",
    name: "최지영",
    username: "choi_ji",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    bio: "팀워크의 달인",
    isFollowing: false,
    questsCompleted: 19,
  },
];

export const mockSearchMedia: SearchMedia[] = [
  {
    id: "m1",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "image",
    playerName: "김철수",
    playerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    questTitle: "골키퍼 세이브",
    likes: 42,
    comments: 8,
    uploadedAt: Date.now() - 3600000,
  },
  {
    id: "m2",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "video",
    playerName: "이영희",
    playerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    questTitle: "프리킥 골",
    likes: 128,
    comments: 23,
    uploadedAt: Date.now() - 7200000,
  },
  {
    id: "m3",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "image",
    playerName: "박민수",
    playerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    questTitle: "드리블 스킬",
    likes: 89,
    comments: 15,
    uploadedAt: Date.now() - 10800000,
  },
  {
    id: "m4",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "image",
    playerName: "최지영",
    playerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    questTitle: "팀워크 어시스트",
    likes: 67,
    comments: 12,
    uploadedAt: Date.now() - 14400000,
  },
  {
    id: "m5",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "video",
    playerName: "정대현",
    playerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    questTitle: "헤딩 골",
    likes: 156,
    comments: 31,
    uploadedAt: Date.now() - 18000000,
  },
  {
    id: "m6",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "image",
    playerName: "한소영",
    playerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    questTitle: "골키퍼 세이브",
    likes: 92,
    comments: 18,
    uploadedAt: Date.now() - 21600000,
  },
  {
    id: "m7",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "image",
    playerName: "강민호",
    playerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    questTitle: "프리킥 골",
    likes: 73,
    comments: 14,
    uploadedAt: Date.now() - 25200000,
  },
  {
    id: "m8",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "video",
    playerName: "윤서연",
    playerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    questTitle: "드리블 스킬",
    likes: 145,
    comments: 27,
    uploadedAt: Date.now() - 28800000,
  },
  {
    id: "m9",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    mediaType: "image",
    playerName: "조현우",
    playerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    questTitle: "팀워크 어시스트",
    likes: 58,
    comments: 9,
    uploadedAt: Date.now() - 32400000,
  },
];

export const mockRecentSearches = ["골키퍼", "프리킥", "드리블", "팀워크"];
export const mockPopularSearches = ["골키퍼 세이브", "프리킥 골", "드리블 스킬", "헤딩 골"];

