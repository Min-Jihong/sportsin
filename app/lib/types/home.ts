import { Quest, QuestProgress, SeasonSummary } from "./quest";

// Placeholder type - should be replaced with actual Profile type
export interface Profile {
  profileId: string;
  name: string;
  [key: string]: any;
}

export interface QuestSkillPreview {
  skillKey: string;
  level: number;
  progress: number;
}

export interface ShowOff {
  id: string;
  playerId: string;
  questId: string;
  mediaUrl: string;
  createdAt: number;
}

export interface QuestSection {
  hero: SeasonSummary;
  recommendedQuests: Quest[];
  inProgress: QuestProgress[];
  recentResults: QuestProgress[];
  skillPreview: QuestSkillPreview;
  recentApprovedShowOffs: ShowOff[];
  offSeasonBannerUrl?: string;
  history: {
    season: SeasonSummary;
    items: QuestProgress[];
  }[];
}

export interface RecommendationSection {
  playerRecommendations?: any[];
  teamRecommendations?: any[];
}

export interface TeamLeadStats {
  totalMembers: number;
  activeMembers: number;
  recentMatches: number;
}

export interface TeamLeadItem {
  team: Profile;
  recommendations: RecommendationSection;
  stats: TeamLeadStats;
}

export interface TeamLeadSection {
  teams: TeamLeadItem[];
}

export interface HomeResponse {
  mode: string;
  quest: QuestSection;
  teamLead: TeamLeadSection;
}
