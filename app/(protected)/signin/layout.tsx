"use client";

import { PATHS } from "@/constants/paths";
import { useGetProfilesPlayers } from "@/hooks/use-get-profiles-players";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";

const SigninLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: profile, isLoading } = useGetProfilesPlayers();
  const router = useRouter();

  useEffect(() => {
    if (profile && profile.gender) {
      router.push(PATHS.home);
    }
  }, [profile, router]);

  return isLoading || profile?.gender ? <Fragment /> : children;
};

export default SigninLayout;
