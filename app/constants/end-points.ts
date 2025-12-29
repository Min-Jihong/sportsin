export const ENDPOINTS = {
  login: "/oauth/kakao",
  exchangeCode: "/oauth/kakao/exchange",
  v1: {
    // OAuth
    oauth: {
      detail: (providerId: string) => `/v1/oauth/${providerId}`,
    },

    // URLs
    urls: {
      channels: {
        images: (channelId: string) => `/v1/urls/channels/${channelId}/images`,
        videos: (channelId: string) => `/v1/urls/channels/${channelId}/videos`,
      },
    },

    // Home
    home: "/v1/home",

    // Matches
    matches: {
      retrieve: "/v1/matches/retrieve", // GET - 매치 목록 조회
      create: "/v1/matches", // POST - 매치 생성
      delete: (uuid: string) => `/v1/matches/${uuid}`, // DELETE - 매치 취소
    },

    // Recruits
    recruits: {
      create: "/v1/recruits", // POST - 모집글 작성
      team: (teamId: string) => `/v1/recruits/teams/${teamId}`, // GET - 팀별 모집글 조회
      delete: (events: string) => `/v1/recruits/${events}`, // DELETE - 모집글 삭제
      mercenary: {
        create: "/v1/recruits/mercenary", // POST - 용병 모집글 작성
        retrieve: "/v1/recruits/mercenary/retrieve", // GET - 용병 모집글 목록
        detail: (uuid: string) => `/v1/recruits/mercenary/${uuid}`, // GET - 용병 모집글 상세
        delete: (uuid: string) => `/v1/recruits/mercenary/${uuid}`, // DELETE
      },
    },

    // Invitations
    invitations: {
      retrieve: "/v1/invitations/retrieve", // GET - 초대 목록
      detail: (uuid: string, teamId: string) => `/v1/invitations/${uuid}/teams/${teamId}`, // GET - 초대 상세
      create: "/v1/invitations", // POST - 초대 생성
      update: "/v1/invitations", // PUT - 초대 수정
      delete: (uuid: string) => `/v1/invitations/${uuid}`, // DELETE - 초대 삭제
    },

    // Join Requests
    joins: {
      create: "/v1/joins",
      update: "/v1/joins",
      delete: "/v1/joins",
    },

    // Castings
    castings: {
      retrieve: "/v1/castings/retrieve", // GET - 캐스팅 목록
      detail: (uuid: string, teamId: string) => `/v1/castings/${uuid}/teams/${teamId}`, // GET - 캐스팅 상세
      create: "/v1/castings", // POST - 캐스팅 요청
      accept: (uuid: string) => `/v1/castings/${uuid}/accept`, // PUT - 캐스팅 수락
      cancel: (uuid: string) => `/v1/castings/${uuid}/cancel`, // PUT - 캐스팅 취소
      delete: (uuid: string) => `/v1/castings/${uuid}`, // DELETE - 캐스팅 삭제
    },

    // Feeds
    feeds: {
      list: "/v1/feeds",
      me: "/v1/feeds/me",
      events: "/v1/feeds/events",
      eventCards: (events: string, cardType: string) => `/v1/feeds/events/${events}/cards/${cardType}`,
    },

    // Profiles
    profiles: {
      players: {
        list: "/v1/profiles/players",
        me: "/v1/profiles/players/me",
        retrieve: "/v1/profiles/players/retrieve",
        create: "/v1/profiles/players",
        update: "/v1/profiles/players",
      },
      teams: {
        list: "/v1/profiles/teams",
        me: "/v1/profiles/teams/me",
        retrieve: "/v1/profiles/teams/retrieve",
        create: "/v1/profiles/teams",
        detail: (teamId: string) => `/v1/profiles/teams/${teamId}`,
        update: (teamId: string) => `/v1/profiles/teams/${teamId}`,
      },
    },

    // Quests
    quests: {
      list: "/v1/quests",
      skills: "/v1/quests/skills/me",
      progress: "/v1/quests/progress/me",
      submit: (questId: string) => `/v1/quests/${questId}/submit`,
      claim: (questId: string) => `/v1/quests/${questId}/claim`,
    },

    // Comments
    comments: {
      list: (contentType: string, contentUuid: string) => `/v1/comments/contents/${contentType}/${contentUuid}`,
      create: "/v1/comments",
      delete: (uuid: string) => `/v1/comments/${uuid}`,
    },

    // Social
    follows: {
      create: "/v1/follows",
      delete: (targetPlayerId: string) => `/v1/follows/${targetPlayerId}`,
    },
    blocks: {
      create: "/v1/blocks",
      delete: (targetPlayerId: string) => `/v1/blocks/${targetPlayerId}`,
    },

    // Notifications
    notifications: {
      list: "/v1/notifications",
      top: "/v1/notifications/top",
    },
  },

  // Admin endpoints (if needed)
  admin: {
    quests: {
      list: "/admin/quests",
      seasons: "/admin/quests/seasons",
      seasonStatus: (seasonId: string) => `/admin/quests/seasons/${seasonId}/status`,
    },
  },
};
