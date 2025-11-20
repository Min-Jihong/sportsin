import { FeedItemProps } from "../components/feed-item";
import { StoryItemProps } from "../components/story-item";

export const mockStories: StoryItemProps[] = [
  {
    id: "my-story",
    username: "me",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=me",
    isMyStory: true,
  },
  {
    id: "story-1",
    username: "soccer_lover",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=soccer",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop",
    hasNewStory: true,
  },
  {
    id: "story-2",
    username: "basketball_pro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=basketball",
    image: "https://images.unsplash.com/photo-1519869325930-281384150012?w=400&h=400&fit=crop",
    hasNewStory: true,
  },
  {
    id: "story-3",
    username: "tennis_master",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tennis",
    image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=400&h=400&fit=crop",
    hasNewStory: false,
  },
  {
    id: "story-4",
    username: "swimming_champ",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=swimming",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=400&fit=crop",
    hasNewStory: true,
  },
  {
    id: "story-5",
    username: "running_enthusiast",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=running",
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=400&fit=crop",
    hasNewStory: false,
  },
  {
    id: "story-6",
    username: "volleyball_team",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=volleyball",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&h=400&fit=crop",
    hasNewStory: true,
  },
];

export const mockFeedItems: FeedItemProps[] = [
  {
    id: "1",
    author: {
      username: "soccer_lover",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=soccer",
    },
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=800&fit=crop",
    caption: "오늘 경기 너무 재밌었어요! 🏆 #축구 #스포츠",
    likes: 124,
    comments: 23,
    timestamp: "2시간 전",
    isLiked: false,
  },
  {
    id: "2",
    author: {
      username: "basketball_pro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=basketball",
    },
    image: "https://images.unsplash.com/photo-1519869325930-281384150012?w=800&h=800&fit=crop",
    caption: "새로운 농구화를 신어봤어요! 점프력이 올라간 것 같아요 🏀",
    likes: 89,
    comments: 15,
    timestamp: "5시간 전",
    isLiked: true,
  },
  {
    id: "3",
    author: {
      username: "tennis_master",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tennis",
    },
    image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&h=800&fit=crop",
    caption: "테니스 코트에서의 하루 🌞 #테니스 #운동",
    likes: 156,
    comments: 31,
    timestamp: "8시간 전",
    isLiked: false,
  },
  {
    id: "4",
    author: {
      username: "swimming_champ",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=swimming",
    },
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=800&fit=crop",
    caption: "수영장에서의 아침 운동 💪 물이 너무 시원해요!",
    likes: 203,
    comments: 42,
    timestamp: "12시간 전",
    isLiked: true,
  },
  {
    id: "5",
    author: {
      username: "running_enthusiast",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=running",
    },
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&h=800&fit=crop",
    caption: "오늘 10km 완주! 🏃‍♂️ 다음 목표는 하프 마라톤이에요",
    likes: 178,
    comments: 28,
    timestamp: "1일 전",
    isLiked: false,
  },
  {
    id: "6",
    author: {
      username: "volleyball_team",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=volleyball",
    },
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=800&fit=crop",
    caption: "팀 연습 후 단체 사진! 모두 수고하셨어요 🏐",
    likes: 267,
    comments: 56,
    timestamp: "2일 전",
    isLiked: true,
  },
];
