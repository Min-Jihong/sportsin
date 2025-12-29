import { useQuery } from "@tanstack/react-query";
import { sportsinApi } from "@/lib/utils/api";
import { ENDPOINTS } from "@/constants/end-points";
import { Notification, NotificationsResponse, NotificationFilters } from "@/lib/types/notification";

export const useNotifications = (filters?: NotificationFilters) => {
  return useQuery({
    queryKey: ["notifications", filters],
    queryFn: async () => {
      const data = await sportsinApi.get<Notification>(ENDPOINTS.v1.notifications.list, {
        params: filters,
      });
      return data;
    },
    staleTime: 30000,
    refetchInterval: 60000, // Refetch every minute
  });
};

export const useTopNotifications = () => {
  return useQuery({
    queryKey: ["notifications", "top"],
    queryFn: async () => {
      const data = await sportsinApi.get<NotificationsResponse>(ENDPOINTS.v1.notifications.top);
      return data;
    },
    staleTime: 30000,
    refetchInterval: 60000,
  });
};
