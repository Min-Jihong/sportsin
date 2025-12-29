"use client";

import { Team } from "@/lib/types/team";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Drawer } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

interface TeamDetailData extends Team {
  activityArea?: string;
  matches?: number;
  reviews?: Array<{
    reviewCategoryUuid: string;
    reviewCategoryPhrase: string;
    count: number;
  }>;
}

interface TeamSelectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  teams?: TeamDetailData[];
  selectedTeamId?: string;
  onSelectTeam: (teamId: string) => void;
}

export const TeamSelectorDrawer = ({
  isOpen,
  onClose,
  teams,
  selectedTeamId,
  onSelectTeam,
}: TeamSelectorDrawerProps) => {
  const handleSelectTeam = (teamId: string) => {
    onSelectTeam(teamId);
    onClose();
  };

  return (
    <Drawer title="팀 선택" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-2">
        {teams?.map((team) => {
          const isSelected = team.teamId === selectedTeamId;
          return (
            <button
              key={team.teamId}
              onClick={() => handleSelectTeam(team.teamId!)}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl hover:bg-gray-800 transition-colors text-left w-full",
                isSelected && "bg-gray-800"
              )}
            >
              <Avatar className="size-12 shrink-0">
                {team.logoImageUrl ? (
                  <AvatarImage src={team.logoImageUrl} alt={team.name} />
                ) : (
                  <AvatarFallback className="bg-gray-700 text-white">
                    {team.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{team.name}</p>
                {team.activityArea && (
                  <p className="text-sm text-gray-400 truncate">{team.activityArea.split("#").join(" ")}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </Drawer>
  );
};
