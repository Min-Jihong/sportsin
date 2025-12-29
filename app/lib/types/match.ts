import { CustomPageComment } from "./api";

export interface Match {
  uuid: string;
  title: string;
  description: string;
  hostTeamId: string;
  hostTeamName: string;
  hostTeamLogoImageUrl?: string;
  castingTeamId: string;
  castingTeamName: string;
  castingTeamLogoImageUrl?: string;
  activityArea: string;
  startTime: number;
  endTime: number;
  events: string;
  stadiumLocation: string;
  playMode: string;
  comments?: CustomPageComment;
  exposingButton: {
    title: string;
    isActivation: boolean;
  };
  cardOwnerTeamId?: string;
  createdAt: number;
}

export interface CreateMatchRequest {
  title: string;
  description: string;
  hostTeamId: string;
  castingTeamId: string;
  activityArea: string;
  startTime: number;
  endTime: number;
  events: string;
  stadiumLocation: string;
  playMode: string;
}

export interface MatchFilters {
  events?: string;
  activityArea?: string;
  startTime?: number;
  endTime?: number;
  playMode?: string;
}
