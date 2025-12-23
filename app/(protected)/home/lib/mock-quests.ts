import type { Quest } from "../components/quest-card";
import type { QuestCompletion } from "../components/quest-detail-modal";

export const mockQuests: Quest[] = [
  {
    id: "1",
    title: "골키퍼 세이브 챌린지",
    description: "경기 중 멋진 세이브를 기록하고 인증샷을 올려보세요!",
    thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    completedCount: 42,
  },
  {
    id: "2",
    title: "프리킥 골 넣기",
    description: "프리킥 상황에서 골을 넣고 영상을 공유하세요",
    completedCount: 28,
  },
  {
    id: "3",
    title: "팀워크 어시스트",
    description: "팀원과의 완벽한 패스 플레이를 보여주세요",
    completedCount: 35,
  },
  {
    id: "4",
    title: "드리블 스킬 쇼케이스",
    description: "상대를 제치고 나가는 멋진 드리블을 기록하세요",
    completedCount: 51,
  },
  {
    id: "5",
    title: "헤딩 골 넣기",
    description: "코너킥에서 헤딩으로 골을 넣어보세요",
    completedCount: 19,
  },
];

export const mockCompletions: Record<string, QuestCompletion[]> = {
  "1": [
    {
      id: "c1",
      playerId: "u1",
      playerName: "김철수",
      playerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      mediaType: "image",
      completedAt: Date.now() - 86400000,
    },
    {
      id: "c2",
      playerId: "u2",
      playerName: "이영희",
      playerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      mediaType: "video",
      completedAt: Date.now() - 172800000,
    },
    {
      id: "c3",
      playerId: "u3",
      playerName: "박민수",
      playerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      mediaType: "image",
      completedAt: Date.now() - 259200000,
    },
  ],
  "2": [
    {
      id: "c4",
      playerId: "u4",
      playerName: "최지영",
      playerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      mediaType: "image",
      completedAt: Date.now() - 43200000,
    },
  ],
  "3": [
    {
      id: "c5",
      playerId: "u5",
      playerName: "정대현",
      playerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      mediaType: "video",
      completedAt: Date.now() - 86400000,
    },
  ],
  "4": [
    {
      id: "c6",
      playerId: "u6",
      playerName: "한소영",
      playerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      mediaType: "image",
      completedAt: Date.now() - 129600000,
    },
  ],
  "5": [
    {
      id: "c7",
      playerId: "u7",
      playerName: "강민호",
      playerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      mediaType: "image",
      completedAt: Date.now() - 216000000,
    },
  ],
};
