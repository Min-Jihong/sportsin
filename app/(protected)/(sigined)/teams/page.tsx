"use client";

import { useMyTeamProfiles } from "@/hooks/use-team-profiles";
import { isEmpty } from "es-toolkit/compat";
import { EmptyTeamsView } from "./components/empty-teams-view";
import { useEffect, useState } from "react";
import { TeamDetailView } from "./components/team-detail-view";
import { TeamSelectorDrawer } from "./components/team-detail-view/team-selector-drawer";
import { TeamDetailSkeleton } from "./components/team-detail-view/team-detail-skeleton";

const Page = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: teams, isLoading: isTeamsLoading } = useMyTeamProfiles();
  const [selectedTeamId, setSelectedTeamId] = useState<string | undefined>();

  useEffect(() => {
    if (!isEmpty(teams?.myTeamProfiles)) {
      setSelectedTeamId(teams?.myTeamProfiles?.[0].teamId);
    }
  }, [teams]);

  if (isTeamsLoading) {
    return (
      <div className="relative h-full flex items-center justify-center">
        <TeamDetailSkeleton />
      </div>
    );
  }

  return (
    <div className="relative h-full flex items-center justify-center">
      {isEmpty(teams?.myTeamProfiles) && <EmptyTeamsView />}
      {selectedTeamId && (
        <TeamDetailView
          teamId={selectedTeamId}
          teams={teams?.myTeamProfiles}
          onDrawerOpen={() => setIsDrawerOpen(true)}
        />
      )}
      {!isEmpty(teams?.myTeamProfiles) && (
        <TeamSelectorDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          teams={teams?.myTeamProfiles}
          selectedTeamId={selectedTeamId}
          onSelectTeam={(teamId) => setSelectedTeamId(teamId)}
        />
      )}
    </div>
  );
};

export default Page;
