import { ENDPOINTS } from "@/constants/end-points";
import { sportsinApi } from "@/lib/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ uuid, teamId }: { uuid: string; teamId: string }) => {
      return sportsinApi.delete(ENDPOINTS.v1.announcements.delete(uuid, teamId));
    },
    onSuccess: () => {
      toast.success("공지 사항이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["team"] });
    },
    onError: () => {
      toast.error("공지 사항 삭제에 실패했습니다.");
    },
  });
};
