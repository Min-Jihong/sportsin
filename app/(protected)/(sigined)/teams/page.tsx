"use client";

import { useMyTeamProfiles, useTeamDetail } from "@/hooks/use-team-profiles";
import { isEmpty } from "es-toolkit/compat";
import { EmptyTeamsView } from "./components/empty-teams-view";
import { useEffect, useMemo, useState } from "react";
import { TeamDetailView } from "./components/team-detail-view";
import { TeamSelectorDrawer } from "./components/team-detail-view/team-selector-drawer";
import { TeamDetailSkeleton } from "./components/team-detail-view/team-detail-skeleton";
import { AnnouncementsEditorDrawer } from "./components/team-detail-view/announcements-editor-drawer";
import { AnnouncementsListDrawer } from "./components/team-detail-view/announcements-list-drawer";
import { useMyPlayerProfile } from "@/hooks/use-my-player-profile";

const Page = () => {
  const [isOpenDrawerType, setIsOpenDrawerType] = useState<
    "team-selector" | "announcement-editor" | "announcement-list" | undefined
  >(undefined);
  const { data: teams, isLoading: isTeamsLoading } = useMyTeamProfiles();
  const [selectedTeamId, setSelectedTeamId] = useState<string | undefined>();
  const { data: teamDetail, isLoading: isTeamDetailLoading } = useTeamDetail(selectedTeamId);
  const { data: playerProfile } = useMyPlayerProfile();
  const isStaff = useMemo(
    () => teamDetail?.staffs?.some((staff) => staff.playerId === playerProfile?.playerId) ?? false,
    [teamDetail, playerProfile]
  );

  useEffect(() => {
    if (!isEmpty(teams?.myTeamProfiles) && !selectedTeamId) {
      setSelectedTeamId(teams?.myTeamProfiles?.[0].teamId);
    }
  }, [teams]);

  if (isTeamsLoading || isTeamDetailLoading) {
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
          teamDetail={teamDetail}
          teams={teams?.myTeamProfiles}
          isStaff={isStaff}
          onDrawerOpen={(type: "team-selector" | "announcement-editor" | "announcement-list") =>
            setIsOpenDrawerType(type)
          }
        />
      )}
      {!isEmpty(teams?.myTeamProfiles) && (
        <TeamSelectorDrawer
          isOpen={isOpenDrawerType === "team-selector"}
          onClose={() => setIsOpenDrawerType(undefined)}
          teams={teams?.myTeamProfiles}
          selectedTeamId={selectedTeamId}
          onSelectTeam={(teamId) => setSelectedTeamId(teamId)}
        />
      )}
      <AnnouncementsEditorDrawer
        isOpen={isOpenDrawerType === "announcement-editor"}
        onClose={() => setIsOpenDrawerType(undefined)}
        teamId={selectedTeamId!}
      />
      <AnnouncementsListDrawer
        isOpen={isOpenDrawerType === "announcement-list"}
        onClose={() => setIsOpenDrawerType(undefined)}
        teamDetail={teamDetail}
        isStaff={isStaff}
      />
    </div>
  );
};

export default Page;
