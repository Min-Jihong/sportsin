import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sportsinApi } from "@/lib/utils/api";
import { ENDPOINTS } from "@/constants/end-points";
import { Match, MatchFilters, CreateMatchRequest } from "@/lib/types/match";
import { toast } from "sonner";

export const useMatches = (filters?: MatchFilters & { events: string }) => {
  return useQuery({
    queryKey: ["matches", filters],
    queryFn: async () => {
      const data = await sportsinApi.get<{ items: Match[]; lastEvaluatedKey?: string }>(
        ENDPOINTS.v1.matches.retrieve,
        {
          params: filters,
        }
      );
      return data.items || [];
    },
    enabled: !!filters?.events, // events는 필수 파라미터
    staleTime: 30000,
  });
};

// Note: API에 개별 매치 조회 엔드포인트가 없으므로 retrieve로 필터링
export const useMatchDetail = (uuid?: string, events?: string) => {
  return useQuery({
    queryKey: ["match", uuid],
    queryFn: async () => {
      if (!uuid || !events) throw new Error("Match UUID and events are required");
      const data = await sportsinApi.get<{ items: Match[] }>(ENDPOINTS.v1.matches.retrieve, {
        params: { events },
      });
      return data.items.find((m) => m.uuid === uuid);
    },
    enabled: !!uuid && !!events,
    staleTime: 30000,
  });
};

export const useCreateMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMatchRequest) => sportsinApi.post(ENDPOINTS.v1.matches.create, data),
    onSuccess: () => {
      toast.success("매치가 생성되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
    onError: () => {
      toast.error("매치 생성에 실패했습니다.");
    },
  });
};

export const useDeleteMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uuid, hostTeamId }: { uuid: string; hostTeamId: string }) =>
      sportsinApi.delete(ENDPOINTS.v1.matches.delete(uuid), {
        params: { hostTeamId },
      }),
    onSuccess: () => {
      toast.success("매치가 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
    onError: () => {
      toast.error("매치 삭제에 실패했습니다.");
    },
  });
};
