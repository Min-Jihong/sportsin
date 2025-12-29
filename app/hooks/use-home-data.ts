import { useQuery } from "@tanstack/react-query";
import { sportsinApi } from "@/lib/utils/api";
import { ENDPOINTS } from "@/constants/end-points";
import { HomeResponse } from "@/lib/types/home";

export const useHomeData = (events?: string, seasonId?: string) => {
  return useQuery({
    queryKey: ["home", events, seasonId],
    queryFn: async () => {
      const data = await sportsinApi.get<HomeResponse>(ENDPOINTS.v1.home, {
        params: { events, seasonId },
      });
      return data;
    },
    staleTime: 60000, // 1 minute
  });
};
