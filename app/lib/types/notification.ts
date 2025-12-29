export interface Notification {
  playerId: string;
  message: string;
  createdAt: number;
}

export interface NotificationsResponse {
  new: Notification[];
  earlier: Notification[];
}

export interface NotificationFilters {
  type?: "invitation" | "join_request" | "casting" | "quest" | "match" | "comment" | "follow";
  isRead?: boolean;
}
