import { useQuery, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { sportsinApi } from "@/lib/utils/api";
import { ENDPOINTS } from "@/constants/end-points";
import { Team, CreateTeamRequest, UpdateTeamRequest, MyTeamProfilesResponse } from "@/lib/types/team";
import { toast } from "sonner";

export const useMyTeamProfiles = () => {
  return useQuery({
    queryKey: ["teams", "me"],
    queryFn: async () => {
      const data = await sportsinApi.get<MyTeamProfilesResponse>(ENDPOINTS.v1.profiles.teams.me);
      return data;
    },
  });
};

export const useTeamDetail = (teamId: string) => {
  return useSuspenseQuery({
    queryKey: ["team", teamId],
    queryFn: async () => {
      if (!teamId) throw new Error("Team ID is required");
      const data = await sportsinApi.get<Team>(ENDPOINTS.v1.profiles.teams.detail(teamId));
      return data;
    },
    staleTime: 60000,
  });
};

export const useCreateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTeamRequest) => sportsinApi.post(ENDPOINTS.v1.profiles.teams.create, data),
    onSuccess: () => {
      toast.success("팀이 생성되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["teams", "me"] });
    },
    onError: () => {
      toast.error("팀 생성에 실패했습니다.");
    },
  });
};

export const useUpdateTeam = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTeamRequest) => sportsinApi.put(ENDPOINTS.v1.profiles.teams.update(teamId), data),
    onSuccess: () => {
      toast.success("팀 정보가 수정되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["team", teamId] });
      queryClient.invalidateQueries({ queryKey: ["teams", "me"] });
    },
    onError: () => {
      toast.error("팀 정보 수정에 실패했습니다.");
    },
  });
};
