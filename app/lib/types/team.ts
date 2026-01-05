export interface Review {
  reviewCategoryUuid: string;
  reviewCategoryPhrase: string;
  count: number;
}

export interface Announcement {
  message: string;
  uuid: string;
  createdAt: number;
}

export interface Team {
  teamId: string;
  name: string;
  city: string;
  gu: string;
  events: string;
  league?: string;
  introduce?: string;
  career?: string[];
  backgroundImageUrl?: string;
  logoImageUrl?: string;
  points?: number;
  grade?: number;
  manner?: number;
  recruitmentStatus?: boolean;
  leaderId?: string;
  squads?: TeamMember[];
  staffs?: TeamMember[];
  createdAt?: number;
  matches?: number;
  reviews?: Review[];
  announcements?: Announcement[];
}

export interface TeamMember {
  playerId: string;
  playerName: string;
  playerImageUrl?: string;
  position?: string;
  joinedAt?: number;
  role?: "leader" | "member" | "staff";
}

export interface CreateTeamRequest {
  name: string;
  city: string;
  gu: string;
  events: string;
  league?: string;
  introduce?: string;
  career?: string[];
  backgroundImageUrl?: string;
  logoImageUrl?: string;
}

export interface UpdateTeamRequest {
  name?: string;
  city?: string;
  gu?: string;
  events?: string;
  league?: string;
  introduce?: string;
  career?: string[];
  backgroundImageUrl?: string;
  logoImageUrl?: string;
  recruitmentStatus?: boolean;
}

export interface MyTeamProfilesResponse {
  myTeamProfiles: Team[];
  myActivityAreaTeamProfiles: Team[];
}
