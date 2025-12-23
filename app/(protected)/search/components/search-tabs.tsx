"use client";

import { Users, Grid3x3 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TabType = "users" | "media";

interface SearchTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const SearchTabs = ({ activeTab, onTabChange }: SearchTabsProps) => {
  return (
    <div className="flex items-center border-b border-white/10">
      <button
        onClick={() => onTabChange("users")}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-3 relative",
          "text-sm font-medium transition-colors",
          activeTab === "users" ? "text-white" : "text-white/50"
        )}
      >
        <Users className="w-4 h-4" />
        <span>사용자</span>
        {activeTab === "users" && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
            layoutId="activeTab"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </button>
      <button
        onClick={() => onTabChange("media")}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-3 relative",
          "text-sm font-medium transition-colors",
          activeTab === "media" ? "text-white" : "text-white/50"
        )}
      >
        <Grid3x3 className="w-4 h-4" />
        <span>미디어</span>
        {activeTab === "media" && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
            layoutId="activeTab"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </button>
    </div>
  );
};

