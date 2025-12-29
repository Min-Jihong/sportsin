import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sportsinApi } from "@/lib/utils/api";
import { ENDPOINTS } from "@/constants/end-points";
import { Recruit, CreateRecruitRequest, CreateMercenaryRecruitRequest, RecruitFilters } from "@/lib/types/recruit";
import { toast } from "sonner";

// Note: API에 모집글 전체 목록 조회 엔드포인트가 없음
// 대신 팀별 조회를 사용하거나 용병 모집글 조회 사용
export const useRecruits = (teamId?: string, events?: string) => {
  return useQuery({
    queryKey: ["recruits", teamId, events],
    queryFn: async () => {
      if (!teamId || !events) throw new Error("TeamId and events are required");
      const data = await sportsinApi.get<Recruit>(ENDPOINTS.v1.recruits.team(teamId), {
        params: { events },
      });
      return data ? [data] : [];
    },
    enabled: !!teamId && !!events,
    staleTime: 60000,
  });
};

export const useTeamRecruits = (teamId?: string, events?: string) => {
  return useQuery({
    queryKey: ["recruits", "team", teamId],
    queryFn: async () => {
      if (!teamId || !events) throw new Error("Team ID and events are required");
      const data = await sportsinApi.get<Recruit>(ENDPOINTS.v1.recruits.team(teamId), {
        params: { events },
      });
      return data ? [data] : [];
    },
    enabled: !!teamId && !!events,
    staleTime: 60000,
  });
};

export const useCreateRecruit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRecruitRequest) => sportsinApi.post(ENDPOINTS.v1.recruits.create, data),
    onSuccess: () => {
      toast.success("모집글이 작성되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["recruits"] });
    },
    onError: () => {
      toast.error("모집글 작성에 실패했습니다.");
    },
  });
};

export const useCreateMercenaryRecruit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMercenaryRecruitRequest) =>
      sportsinApi.post(ENDPOINTS.v1.recruits.mercenary.create, data),
    onSuccess: () => {
      toast.success("용병 모집글이 작성되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["recruits"] });
    },
    onError: () => {
      toast.error("용병 모집글 작성에 실패했습니다.");
    },
  });
};

// 용병 모집글 목록 조회
export const useMercenaryRecruits = (events?: string, filters?: { matchCardUuid?: string; stadiumLocation?: string }) => {
  return useQuery({
    queryKey: ["recruits", "mercenary", events, filters],
    queryFn: async () => {
      if (!events) throw new Error("Events are required");
      const data = await sportsinApi.get<{ items: any[]; lastEvaluatedKey?: string }>(
        ENDPOINTS.v1.recruits.mercenary.retrieve,
        {
          params: { events, ...filters },
        }
      );
      return data.items || [];
    },
    enabled: !!events,
    staleTime: 60000,
  });
};
