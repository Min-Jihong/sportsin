export const PATHS = {
  root: "/",
  login: "/login",
  login_callback: "/login/callback",
  signin: "/signin",

  // Main navigation
  home: "/home",
  matches: "/matches",
  schedule: "/schedule",
  teams: "/teams",
  notifications: "/notifications",
  profile: "/profile",

  // Matches & Schedule
  matchDetail: (matchId: string) => `/matches/${matchId}`,
  scheduleDetail: (matchId: string) => `/schedule/${matchId}`,

  // Teams
  teamsCreate: "/teams/create",
  teamDetail: (teamId: string) => `/teams/${teamId}`,
  teamRoster: (teamId: string) => `/teams/${teamId}/roster`,
  teamRecruits: (teamId: string) => `/teams/${teamId}/recruits`,
  teamSettings: (teamId: string) => `/teams/${teamId}/settings`,

  // Recruits
  recruitsCreate: "/recruits/create",
  recruitDetail: (recruitId: string) => `/recruits/${recruitId}`,
  mercenaryRecruit: "/recruits/mercenary",
  mercenaryRecruitCreate: "/recruits/mercenary/create",
  mercenaryRecruitDetail: (recruitId: string) => `/recruits/mercenary/${recruitId}`,

  // Invitations
  invitations: "/invitations",
  invitationsCreate: "/invitations/create",
  invitationDetail: (invitationId: string) => `/invitations/${invitationId}`,

  // Announcements
  announcements: "/announcements",

  // Feed/Post
  feedPost: "/home/post",

  // Quests
  quests: "/quests",
  questDetail: (questId: string) => `/quests/${questId}`,

  // Profile
  profileEdit: "/profile/edit",
  playerProfile: (playerId: string) => `/profile/${playerId}`,

  // Other
  search: "/search",
  settings: "/settings",

  // Deprecated (keep for backward compatibility)
  myQuests: "/quests",
  stats: "/profile",
};
