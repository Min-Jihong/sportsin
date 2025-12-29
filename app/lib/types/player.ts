import { Gender } from "./api";

export interface PlayerProfile {
  playerId?: string;
  name: string;
  gender: Gender;
  birth?: number;
  weight?: number;
  tall?: number;
  city: string;
  gu: string;
  introduce?: string;
  career?: string[];
  positions?: Record<string, string[]>;
  backgroundImageUrl?: string;
  playerImageUrl?: string;
  events?: string[];
}

export interface PlayerStats {
  shooting?: number;
  passing?: number;
  dribbling?: number;
  defense?: number;
  stamina?: number;
  speed?: number;
  goalkeeper?: number;
  teamwork?: number;
}

export interface CreatePlayerProfileRequest {
  name: string;
  gender: Gender;
  birth?: number;
  weight?: number;
  tall?: number;
  city: string;
  gu: string;
  introduce?: string;
  career?: string[];
  positions?: Record<string, string[]>;
  backgroundImageUrl?: string;
  playerImageUrl?: string;
  events?: string[];
}

export interface UpdatePlayerProfileRequest {
  name?: string;
  gender?: Gender;
  birth?: number;
  weight?: number;
  tall?: number;
  city?: string;
  gu?: string;
  introduce?: string;
  career?: string[];
  positions?: Record<string, string[]>;
  backgroundImageUrl?: string;
  playerImageUrl?: string;
  events?: string[];
}
