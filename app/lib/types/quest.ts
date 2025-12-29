export interface Quest {
  questId: string;
  title?: string;
  description?: string;
  skillKey: string;
  seasonId: string;
  status: QuestStatus;
  events: string;
  points: number;
  mediaType?: "image" | "video";
  minDuration?: number;
  operatorChecklist?: string[];
  requiredCount?: number;
  currentCount?: number;
  progress?: number;
  isCompleted?: boolean;
  isClaimed?: boolean;
  completedAt?: number;
  claimedAt?: number;
}

export type QuestStatus = "active" | "completed" | "claimed" | "expired";

export interface QuestProgress {
  questId: string;
  playerId: string;
  currentCount: number;
  requiredCount: number;
  progress: number;
  isCompleted: boolean;
  isClaimed: boolean;
  completedAt?: number;
  claimedAt?: number;
}

export interface SubmitQuestRequest {
  questId: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  description?: string;
}

export interface ClaimQuestRewardRequest {
  questId: string;
}

export interface QuestFilters {
  events?: string;
  status?: QuestStatus;
  skillKey?: string;
}

export interface Season {
  seasonId: string;
  title: string;
  description?: string;
  startTime: number;
  endTime: number;
  status: "upcoming" | "active" | "ended";
}

export interface SeasonSummary {
  seasonId: string;
  name: string;
  endDate: number;
}

export interface SeasonProgressHistory {
  season: SeasonSummary;
  items: QuestProgress[];
}

export interface ProgressListResponse {
  items: QuestProgress[];
  season: SeasonSummary;
  history: SeasonProgressHistory[];
}
