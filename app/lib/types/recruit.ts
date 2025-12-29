export interface Recruit {
  recruitId?: string;
  teamId: string;
  teamName?: string;
  teamLogoUrl?: string;
  events: string;
  title?: string;
  description?: string;
  positions?: string[];
  requirements?: string[];
  applicantCount?: number;
  status?: "open" | "closed";
  createdAt?: number;
  expiresAt?: number;
}

export interface CreateRecruitRequest {
  teamId: string;
  events: string;
  title?: string;
  description?: string;
  positions?: string[];
  requirements?: string[];
}

export interface CreateMercenaryRecruitRequest {
  teamId: string;
  events: string;
  title?: string;
  description?: string;
  startTime: number;
  endTime: number;
  stadiumLocation: string;
  playMode: string;
  entryFee?: number;
}

export interface RecruitFilters {
  events?: string;
  positions?: string[];
  status?: "open" | "closed";
}
