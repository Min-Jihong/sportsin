import { useMutation } from "@tanstack/react-query";

import { clientApi } from "@/lib/utils/api";
import { ENDPOINTS } from "@/constants/end-points";

export interface LoginParams {
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
    mutationFn: async (params: LoginParams) => clientApi.post<UserToken>(ENDPOINTS.login, params),
  });
};

// code를 access_token으로 교환하는 훅 (더 안전한 방법)
export const useExchangeCode = () => {
  return useMutation<UserToken, Error, ExchangeCodeParams>({
    mutationFn: async (params: ExchangeCodeParams) => clientApi.post<UserToken>(ENDPOINTS.exchangeCode, params),
  });
};
