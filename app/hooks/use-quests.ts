import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sportsinApi } from "@/lib/utils/api";
import { ENDPOINTS } from "@/constants/end-points";
import { Quest, QuestProgress, QuestFilters, SubmitQuestRequest, ClaimQuestRewardRequest, ProgressListResponse } from "@/lib/types/quest";
import { CustomPageResponse } from "@/lib/types/api";
import { toast } from "sonner";

export const useQuests = (filters?: QuestFilters) => {
  return useQuery({
    queryKey: ["quests", filters],
    queryFn: async () => {
      const data = await sportsinApi.get<CustomPageResponse<Quest>>(ENDPOINTS.v1.quests.list, {
        params: filters,
      });
      return data.items || [];
    },
    staleTime: 300000, // 5 minutes
  });
};

export const useQuestProgress = () => {
  return useQuery({
    queryKey: ["quests", "progress"],
    queryFn: async () => {
      const data = await sportsinApi.get<ProgressListResponse>(ENDPOINTS.v1.quests.progress);
      return data.items || [];
    },
    staleTime: 60000,
  });
};

export const useSubmitQuest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questId, ...data }: SubmitQuestRequest & { questId: string }) =>
      sportsinApi.post(ENDPOINTS.v1.quests.submit(questId), data),
    onSuccess: () => {
      toast.success("퀘스트를 제출했습니다!");
      queryClient.invalidateQueries({ queryKey: ["quests"] });
      queryClient.invalidateQueries({ queryKey: ["quests", "progress"] });
    },
    onError: () => {
      toast.error("퀘스트 제출에 실패했습니다.");
    },
  });
};

export const useClaimQuestReward = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questId: string) => sportsinApi.post(ENDPOINTS.v1.quests.claim(questId), {}),
    onSuccess: () => {
      toast.success("보상을 받았습니다!");
      queryClient.invalidateQueries({ queryKey: ["quests"] });
      queryClient.invalidateQueries({ queryKey: ["quests", "progress"] });
    },
    onError: () => {
      toast.error("보상 받기에 실패했습니다.");
    },
  });
};
