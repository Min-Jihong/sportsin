// Base API response types

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
}

// SportsIn API pagination types
export interface CustomPageResponse<T> {
  items: T[];
  lastEvaluatedKey?: string;
}

export interface CustomPageComment {
  content: any[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

// Common types
export type Gender = "male" | "female" | "none";
export type AuthProvider = "kakao" | "google" | "apple" | "naver";

export interface Location {
  city: string;
  gu: string;
}

export interface AuthorizedPortalUser {
  id: string;
  appId: string;
  authProvider: AuthProvider;
  expiresAt: number;
}
