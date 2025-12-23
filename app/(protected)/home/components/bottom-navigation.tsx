"use client";

import { Home, Search, Bell, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PATHS } from "@/constants/paths";

const navigationItems = [
  { icon: Home, label: "홈", path: PATHS.home },
  { icon: Search, label: "검색", path: "/search" },
  { icon: Bell, label: "알림", path: "/notifications" },
  { icon: User, label: "프로필", path: PATHS.profile },
];

export const BottomNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-white/10">
      <div className="flex items-center justify-around h-16 px-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 flex-1 h-full",
                "transition-colors duration-200",
                isActive ? "text-white" : "text-white/60 active:text-white"
              )}
            >
              <Icon className={cn("w-6 h-6 transition-transform", isActive && "scale-110")} />
              <span className={cn("text-[10px] font-medium", isActive ? "text-white" : "text-white/60")}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
