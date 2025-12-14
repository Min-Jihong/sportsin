export const ENDPOINTS = {
  login: "/oauth/kakao",
  exchangeCode: "/oauth/kakao/exchange",
  v1: {
    oauth: {
      detail: (providerId: string) => `/v1/oauth/${providerId}`,
    },
    urls: {
      channels: {
        images: (channelId: string) => `/v1/urls/channels/${channelId}/images`,
        videos: (channelId: string) => `/v1/urls/channels/${channelId}/videos`,
      },
    },
    profiles: {
      players: "/v1/profiles/players",
    },
  },
};
