"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "./components/search-bar";
import { SearchTabs } from "./components/search-tabs";
import { UserSearchResults } from "./components/user-search-results";
import { MediaSearchResults } from "./components/media-search-results";
import { SearchSuggestionsOverlay } from "./components/search-suggestions-overlay";
import {
  mockSearchUsers,
  mockSearchMedia,
  mockRecentSearches,
  mockPopularSearches,
  type SearchUser,
  type SearchMedia,
} from "./lib/mock-search-data";

// 랜덤 미디어 생성 함수
const getRandomMedia = (count: number = 30): SearchMedia[] => {
  const shuffled = [...mockSearchMedia].sort(() => Math.random() - 0.5);
  // 더 많은 미디어를 위해 배열을 반복
  const repeated = [];
  while (repeated.length < count) {
    repeated.push(...shuffled);
  }
  return repeated.slice(0, count);
};

const SearchPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "media">("users");
  const [recentSearches, setRecentSearches] = useState<string[]>(mockRecentSearches);
  const [randomMedia, setRandomMedia] = useState<SearchMedia[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // 랜덤 미디어 초기화
  useEffect(() => {
    setRandomMedia(getRandomMedia(30));
  }, []);

  // 검색 필터링
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return mockSearchUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.username?.toLowerCase().includes(query) ||
        user.bio?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const filteredMedia = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return mockSearchMedia.filter(
      (media) => media.playerName.toLowerCase().includes(query) || media.questTitle?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearchFocused(false);
    // 최근 검색어에 추가 (중복 제거)
    setRecentSearches((prev) => {
      const filtered = prev.filter((q) => q !== query);
      return [query, ...filtered].slice(0, 10);
    });
  };

  const handleRemoveRecent = (query: string) => {
    setRecentSearches((prev) => prev.filter((q) => q !== query));
  };

  const handleUserClick = (user: SearchUser) => {
    // TODO: 사용자 프로필 페이지로 이동
    router.push(`/profile/${user.id}`);
  };

  const handleMediaClick = (media: SearchMedia) => {
    // TODO: 미디어 상세 페이지로 이동
    console.log("미디어 클릭:", media);
  };

  const handleFollow = (userId: string) => {
    // TODO: 팔로우/언팔로우 API 호출
    console.log("팔로우:", userId);
  };

  const hasSearchQuery = searchQuery.trim().length > 0;
  const showSuggestions = isSearchFocused && !hasSearchQuery;
  const showTabs = hasSearchQuery;

  return (
    <div className="h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* 검색 바 - 상단 고정 */}
      <div className="relative shrink-0 px-4 py-3 border-b border-white/10">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="검색..."
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => {
            // 약간의 지연을 두어 클릭 이벤트가 먼저 처리되도록
            setTimeout(() => setIsSearchFocused(false), 200);
          }}
        />
        {/* 검색 추천 오버레이 */}
        <SearchSuggestionsOverlay
          recentSearches={recentSearches}
          popularSearches={mockPopularSearches}
          onSearchClick={handleSearch}
          onRemoveRecent={handleRemoveRecent}
          isVisible={showSuggestions}
        />
      </div>

      {/* 탭 - 검색어가 있을 때만 표시 */}
      {showTabs && (
        <div className="shrink-0">
          <SearchTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      )}

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto pb-20">
        {hasSearchQuery ? (
          // 검색어가 있을 때: 필터링된 결과 표시
          <>
            {activeTab === "users" ? (
              <UserSearchResults users={filteredUsers} onUserClick={handleUserClick} onFollow={handleFollow} />
            ) : (
              <MediaSearchResults media={filteredMedia} onMediaClick={handleMediaClick} />
            )}
          </>
        ) : (
          // 검색어가 없을 때: 항상 미디어 그리드 표시
          <MediaSearchResults media={randomMedia} onMediaClick={handleMediaClick} />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
