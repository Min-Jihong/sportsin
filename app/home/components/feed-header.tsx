"use client";

import { Logo } from "@/lib/assets";

export function FeedHeader() {
  return (
    <header className="sticky top-0 z-10 bg-black border-b border-border backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 h-14">
        <Logo className="h-8 w-auto" />
      </div>
    </header>
  );
}
