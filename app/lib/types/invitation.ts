export interface Invitation {
  uuid?: string;
  teamId: string;
  teamName?: string;
  teamLogoImageUrl?: string;
  playerId?: string;
  playerName?: string;
  playerImageUrl?: string;
  events: string;
  title?: string;
  description?: string;
  startTime: number;
  endTime: number;
  stadiumLocation: string;
  playMode: string;
  entryFee?: number;
  status?: "pending" | "accepted" | "declined" | "expired";
  createdAt?: number;
}

export interface CreateInvitationRequest {
  teamId: string;
  playerId?: string;
  events: string;
  title?: string;
  description?: string;
  startTime: number;
  endTime: number;
  stadiumLocation: string;
  playMode: string;
  entryFee?: number;
}

export interface JoinRequest {
  uuid?: string;
  playerId: string;
  playerName?: string;
  playerImageUrl?: string;
  teamId: string;
  teamName?: string;
  message?: string;
  status?: "pending" | "accepted" | "declined";
  createdAt?: number;
}

export interface CreateJoinRequest {
  teamId: string;
  playerId?: string;
  message?: string;
}

export interface UpdateJoinRequestStatus {
  uuid: string;
  status: "accepted" | "declined";
}

export interface Casting {
  uuid?: string;
  teamId: string;
  teamName?: string;
  playerId: string;
  playerName?: string;
  message?: string;
  status?: "pending" | "accepted" | "declined";
  createdAt?: number;
}

export interface CreateCastingRequest {
  teamId: string;
  playerId: string;
  message?: string;
}
