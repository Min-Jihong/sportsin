import { useMutation } from "@tanstack/react-query";

import { commonApi } from "@/lib/utils/api";
import { ENDPOINTS } from "@/constants/end-points";

export interface LoginParams {
  providerId: string;
  appId: string;
  accessToken: string;
}

export interface ExchangeCodeParams {
  appId: string;
  code: string;
}

export interface UserToken {
  userId: string;
  name?: string;
  nickname?: string;
  imageUrl?: string;
  roles?: string[];
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  expiresAt: number;
}

export const usePostLogin = () => {
  return useMutation<UserToken, Error, LoginParams>({
    mutationFn: async ({ providerId, appId, accessToken }: LoginParams) =>
      commonApi.post<UserToken>(ENDPOINTS.v1.oauth.detail(providerId), { appId, accessToken }),
  });
};
