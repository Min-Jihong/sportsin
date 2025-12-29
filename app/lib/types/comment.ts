export interface Comment {
  uuid: string;
  cardUuid: string;
  cardType: string;
  comment: string;
  playerId?: string;
  playerName?: string;
  playerImageUrl?: string;
  childComments?: ChildComment[];
  parentCommentUuid?: string;
  createdAt: number;
}

export interface ChildComment {
  uuid: string;
  comment: string;
  playerId?: string;
  playerName?: string;
  playerImageUrl?: string;
  createdAt: number;
}

export interface CreateCommentRequest {
  cardUuid: string;
  cardType: string;
  comment: string;
  parentCommentUuid?: string;
}

export interface CommentFilters {
  cardUuid: string;
  cardType: string;
}
