import { ENDPOINTS } from "@/constants/end-points";
import { sportsinApi } from "@/lib/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ uuid, message, senderTeamId }: { uuid: string; message: string; senderTeamId: string }) => {
      return sportsinApi.put(ENDPOINTS.v1.announcements.update(uuid), { message, senderTeamId });
    },
    onSuccess: (_, variables) => {
      toast.success("공지 사항이 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["team"] });
    },
    onError: () => {
      toast.error("공지 사항 수정에 실패했습니다.");
    },
  });
};
