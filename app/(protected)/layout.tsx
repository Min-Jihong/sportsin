"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/utils/auth";
import { PATHS } from "@/constants/paths";
import { BottomNavigation } from "./home/components/bottom-navigation";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push(PATHS.login);
    }
  }, [router]);

  return (
    <>
      {children}
      {pathname !== PATHS.signin && <BottomNavigation />}
    </>
  );
}
