import { useQuery } from "@tanstack/react-query";
import { sportsinApi } from "@/lib/utils/api";
import { ENDPOINTS } from "@/constants/end-points";
import { FeedItem, FeedFilters } from "@/lib/types/feed";
import { CustomPageResponse } from "@/lib/types/api";

export const useFeeds = (filters?: FeedFilters) => {
  return useQuery({
    queryKey: ["feeds", filters],
    queryFn: async () => {
      const data = await sportsinApi.get<CustomPageResponse<FeedItem>>(ENDPOINTS.v1.feeds.list, {
        params: filters,
      });
      return data.items || [];
    },
    staleTime: 30000,
  });
};

export const useMyFeeds = () => {
  return useQuery({
    queryKey: ["feeds", "me"],
    queryFn: async () => {
      const data = await sportsinApi.get<CustomPageResponse<FeedItem>>(ENDPOINTS.v1.feeds.me);
      return data.items || [];
    },
    staleTime: 30000,
  });
};

export const useEventFeeds = (events?: string) => {
  return useQuery({
    queryKey: ["feeds", "events", events],
    queryFn: async () => {
      const data = await sportsinApi.get<CustomPageResponse<FeedItem>>(ENDPOINTS.v1.feeds.events, {
        params: { events },
      });
      return data.items || [];
    },
    enabled: !!events,
    staleTime: 30000,
  });
};
