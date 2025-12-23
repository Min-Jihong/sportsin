"use client";

import { Clock, TrendingUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchSuggestionsOverlayProps {
  recentSearches: string[];
  popularSearches: string[];
  onSearchClick: (query: string) => void;
  onRemoveRecent?: (query: string) => void;
  isVisible: boolean;
}

export const SearchSuggestionsOverlay = ({
  recentSearches,
  popularSearches,
  onSearchClick,
  onRemoveRecent,
  isVisible,
}: SearchSuggestionsOverlayProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 bg-black border-b border-white/10 z-50 max-h-[60vh] overflow-y-auto"
        >
          <div className="px-4 py-4 space-y-4">
            {/* 최근 검색어 */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-white/50" />
                  <h3 className="text-sm font-semibold text-white/70">최근 검색</h3>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((query) => (
                    <button
                      key={query}
                      onClick={() => onSearchClick(query)}
                      className="w-full flex items-center justify-between px-2 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                    >
                      <span className="text-sm text-white">{query}</span>
                      {onRemoveRecent && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveRecent(query);
                          }}
                          className="p-1 rounded-full hover:bg-white/10"
                        >
                          <X className="w-4 h-4 text-white/50" />
                        </button>
                      )}
                    </button>
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
                <div className="space-y-1">
                  {popularSearches.map((query) => (
                    <button
                      key={query}
                      onClick={() => onSearchClick(query)}
                      className="w-full flex items-center px-2 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                    >
                      <span className="text-sm text-white">{query}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

