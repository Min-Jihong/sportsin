import { ENDPOINTS } from "@/constants/end-points";
import { sportsinApi } from "@/lib/utils/api";
import { useMutation } from "@tanstack/react-query";

export interface AuthorizedPortalUser {
  id: string;
  appId: string;
  authProvider: "kakao" | "google" | "apple" | "naver";
  expiresAt: number;
}

export interface PlayerProfile {
  playerId?: string;
  name: string;
  gender: "male" | "female" | "none";
  birth: number; // yyyyMMdd 형태 (예: 20240101)
  weight?: number;
  tall?: number;
  city?: string;
  gu?: string;
  introduce?: string;
  career?: string[];
  positions?: Record<string, string[]>;
  backgroundImageUrl?: string;
  playerImageUrl?: string;
  events: string[];
}

export interface Profile {
  teamId: string;
  name: string;
  activityArea: string;
  events: string;
  league: string;
  introduce?: string;
  career?: string[];
  backgroundImageUrl?: string;
  logoImageUrl?: string;
  points: number;
  grade: number;
  manner: number;
  recruitmentStatus: boolean;
  leaderId: string;
  matches: number;
  squads?: Array<{
    playerId: string;
    playerName: string;
    playerImageUrl?: string;
  }>;
  matchCards?: unknown[];
  staffs?: Array<{
    playerId: string;
    playerName: string;
    playerImageUrl?: string;
  }>;
  notices?: unknown[];
  showOffCards?: unknown;
  joinRequestCards?: unknown[];
  reviews?: Array<{
    reviewCategoryUuid: string;
    reviewCategoryPhrase: string;
    count: number;
  }>;
  createdAt: number;
}

export const usePutProfilesPlayers = () => {
  return useMutation<Profile, Error, { profile: PlayerProfile; authorizedPortalUser: AuthorizedPortalUser }>({
    mutationFn: async ({ profile, authorizedPortalUser }) => {
      return sportsinApi.put<Profile>(ENDPOINTS.v1.profiles.players, profile, {
        params: {
          authorizedPortalUser: JSON.stringify(authorizedPortalUser),
        },
      });
    },
  });
};
