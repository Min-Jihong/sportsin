import { useQuery } from "@tanstack/react-query";
import { sportsinApi } from "@/lib/utils/api";
import { ENDPOINTS } from "@/constants/end-points";
import { PlayerProfile } from "@/lib/types/player";

export const useMyPlayerProfile = () => {
  return useQuery({
    queryKey: ["player", "me"],
    queryFn: async () => {
      const data = await sportsinApi.get<PlayerProfile>(ENDPOINTS.v1.profiles.players.me);
      return data;
    },
    staleTime: 300000, // 5 minutes
  });
};
