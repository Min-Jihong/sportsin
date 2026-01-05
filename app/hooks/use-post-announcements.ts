import { ENDPOINTS } from "@/constants/end-points";
import { sportsinApi } from "@/lib/utils/api";
import { useMutation } from "@tanstack/react-query";

export const usePostAnnouncements = () => {
  return useMutation({
    mutationFn: async (data: { senderTeamId: string; message: string }) => {
      return sportsinApi.post(ENDPOINTS.v1.announcements.create, data);
    },
  });
};
