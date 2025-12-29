export interface FeedItem {
  uuid?: string;
  cardType: string;
  title?: string;
  description?: string;
  teamId?: string;
  teamName?: string;
  teamLogoImageUrl?: string;
  playerId?: string;
  playerName?: string;
  playerImageUrl?: string;
  events: string;
  activityArea?: string;
  startTime?: number;
  endTime?: number;
  createdAt?: number;
  likes?: number;
  comments?: number;
  mediaUrl?: string;
  mediaType?: "image" | "video";
}

export interface FeedFilters {
  events?: string;
  cardType?: string;
  playerId?: string;
  teamId?: string;
}

export type FeedCardType =
  | "match"
  | "recruit"
  | "quest_completion"
  | "team_created"
  | "player_joined"
  | "match_result";
