"use client";

import { useGetProfilesPlayers } from "@/hooks/use-get-profiles-players";
import { ProfileSection } from "../componets/profile-section";

const Page = () => {
  const { data: profile } = useGetProfilesPlayers();
  return (
    <div>
      <ProfileSection
        backgroundImageUrl={profile?.backgroundImageUrl || ""}
        playerImageUrl={profile?.playerImageUrl || ""}
      />
    </div>
  );
};

export default Page;
