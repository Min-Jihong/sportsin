import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sportsinApi } from "@/lib/utils/api";
import { ENDPOINTS } from "@/constants/end-points";
import { CreateInvitationRequest, CreateJoinRequest, CreateCastingRequest, Invitation } from "@/lib/types/invitation";
import { toast } from "sonner";

// 초대 목록 조회
export const useInvitations = (params: { events: string; area?: string; teamId?: string }) => {
  return useQuery({
    queryKey: ["invitations", params],
    queryFn: async () => {
      const data = await sportsinApi.get<{ items: Invitation[]; lastEvaluatedKey?: string }>(
        ENDPOINTS.v1.invitations.retrieve,
        {
          params,
        }
      );
      return data.items || [];
    },
    enabled: !!params.events,
    staleTime: 60000,
  });
};

// 특정 초대 조회
export const useInvitationDetail = (uuid?: string, teamId?: string) => {
  return useQuery({
    queryKey: ["invitation", uuid, teamId],
    queryFn: async () => {
      if (!uuid || !teamId) throw new Error("UUID and teamId are required");
      const data = await sportsinApi.get<Invitation>(ENDPOINTS.v1.invitations.detail(uuid, teamId));
      return data;
    },
    enabled: !!uuid && !!teamId,
    staleTime: 60000,
  });
};

// 초대 보내기
export const useSendInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInvitationRequest) => sportsinApi.post(ENDPOINTS.v1.invitations.create, data),
    onSuccess: () => {
      toast.success("초대를 보냈습니다!");
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
    },
    onError: () => {
      toast.error("초대를 보내지 못했습니다.");
    },
  });
};

// 초대 수정
export const useUpdateInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Invitation) => sportsinApi.put(ENDPOINTS.v1.invitations.update, data),
    onSuccess: () => {
      toast.success("초대가 수정되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
    },
    onError: () => {
      toast.error("초대 수정에 실패했습니다.");
    },
  });
};

// 초대 삭제
export const useDeleteInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uuid, teamId }: { uuid: string; teamId: string }) =>
      sportsinApi.delete(ENDPOINTS.v1.invitations.delete(uuid), {
        params: { teamId },
      }),
    onSuccess: () => {
      toast.success("초대가 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
    },
    onError: () => {
      toast.error("초대 삭제에 실패했습니다.");
    },
  });
};

// 가입 요청 보내기
export const useSendJoinRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateJoinRequest) => sportsinApi.post(ENDPOINTS.v1.joins.create, data),
    onSuccess: () => {
      toast.success("가입 요청을 보냈습니다!");
      queryClient.invalidateQueries({ queryKey: ["joins"] });
    },
    onError: () => {
      toast.error("가입 요청을 보내지 못했습니다.");
    },
  });
};

// 가입 요청 수락
export const useAcceptJoinRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => sportsinApi.put(ENDPOINTS.v1.joins.update, data),
    onSuccess: () => {
      toast.success("가입 요청을 수락했습니다!");
      queryClient.invalidateQueries({ queryKey: ["joins"] });
    },
    onError: () => {
      toast.error("가입 요청 수락에 실패했습니다.");
    },
  });
};

// 가입 요청 삭제
export const useDeleteJoinRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teamId, playerId }: { teamId: string; playerId: string }) =>
      sportsinApi.delete(ENDPOINTS.v1.joins.delete, {
        params: { teamId, playerId },
      }),
    onSuccess: () => {
      toast.success("가입 요청이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["joins"] });
    },
    onError: () => {
      toast.error("가입 요청 삭제에 실패했습니다.");
    },
  });
};

// 캐스팅 목록 조회
export const useCastings = (params: {
  events: string;
  invitationCardUuid?: string;
  hostTeamId?: string;
  castingTeamId?: string;
}) => {
  return useQuery({
    queryKey: ["castings", params],
    queryFn: async () => {
      const data = await sportsinApi.get<{ items: any[]; lastEvaluatedKey?: string }>(
        ENDPOINTS.v1.castings.retrieve,
        {
          params,
        }
      );
      return data.items || [];
    },
    enabled: !!params.events,
    staleTime: 60000,
  });
};

// 캐스팅 요청 보내기
export const useSendCasting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCastingRequest) => sportsinApi.post(ENDPOINTS.v1.castings.create, data),
    onSuccess: () => {
      toast.success("캐스팅 요청을 보냈습니다!");
      queryClient.invalidateQueries({ queryKey: ["castings"] });
    },
    onError: () => {
      toast.error("캐스팅 요청을 보내지 못했습니다.");
    },
  });
};
