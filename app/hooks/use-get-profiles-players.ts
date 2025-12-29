"use client";

import { ENDPOINTS } from "@/constants/end-points";
import { sportsinApi } from "@/lib/utils/api";
import { useQuery } from "@tanstack/react-query";

type Profile = {
  playerId: string;
  name: string;
  gender: "male" | "female";
  birth: number;
  age: number;
  activityArea: string;
  introduce: string;
  backgroundImageUrl: string;
  playerImageUrl: string;
  affiliations: {
    playerId: string;
    teamId: string;
    teamName: string;
    events: string;
  }[];
  matchCards: unknown[];
  showOffCards: {
    items: unknown[];
  };
  traits: {
    football: unknown[];
  };
  events: string[];
  createdAt: number;
};

export const useGetProfilesPlayers = () => {
  return useQuery({
    queryKey: ["profiles-players"],
    queryFn: () => sportsinApi.get<Profile>(ENDPOINTS.v1.profiles.players.me),
  });
};
