"use client";

import { Clock, TrendingUp, X } from "lucide-react";
import { motion } from "framer-motion";

interface SearchSuggestionsProps {
  recentSearches: string[];
  popularSearches: string[];
  onSearchClick: (query: string) => void;
  onRemoveRecent?: (query: string) => void;
}

export const SearchSuggestions = ({
  recentSearches,
  popularSearches,
  onSearchClick,
  onRemoveRecent,
}: SearchSuggestionsProps) => {
  return (
    <div className="w-full px-4 py-6 space-y-6">
      {/* 최근 검색어 */}
      {recentSearches.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-white/50" />
            <h3 className="text-sm font-semibold text-white/70">최근 검색</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((query, index) => (
              <motion.button
                key={query}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSearchClick(query)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <span>{query}</span>
                {onRemoveRecent && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveRecent(query);
                    }}
                    className="p-0.5 rounded-full hover:bg-white/10"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* 인기 검색어 */}
      {popularSearches.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-white/50" />
            <h3 className="text-sm font-semibold text-white/70">인기 검색</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((query, index) => (
              <motion.button
                key={query}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSearchClick(query)}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                {query}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

