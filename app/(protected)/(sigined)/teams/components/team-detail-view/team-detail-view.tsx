"use client";

import { Team } from "@/lib/types/team";
import { ProfileSection } from "../../../componets/profile-section";
import { SummarySection } from "./summary-section";
import { CaretDown } from "@phosphor-icons/react";
import { Carousel } from "@/components/ui/carousel";
import { ProfileImage } from "@/(protected)/(sigined)/componets/image";
import { isEmpty } from "es-toolkit/compat";
import { AnnouncementsSection } from "./announcements-section";

interface TeamDetailViewProps {
  teamDetail?: Team;
  teams?: Team[];
  isStaff: boolean;
  onDrawerOpen: (type: "team-selector" | "announcement-editor" | "announcement-list") => void;
}

export const TeamDetailView = ({ teamDetail, teams, isStaff, onDrawerOpen = () => {} }: TeamDetailViewProps) => {
  return (
    <div className="w-full h-full overflow-y-auto">
      <ProfileSection backgroundImageUrl={teamDetail?.backgroundImageUrl} playerImageUrl={teamDetail?.logoImageUrl} />
      <div className="flex flex-col gap-4 px-4">
        <button
          className="flex items-center gap-2 w-fit hover:opacity-80 transition-opacity"
          onClick={() => onDrawerOpen("team-selector")}
        >
          <h1 className="text-2xl font-bold">{teamDetail?.name}</h1>
          {teams && teams.length > 1 && <CaretDown className="size-5 text-gray-400" />}
        </button>
        <SummarySection matches={teamDetail?.matches} grade={teamDetail?.grade} league={teamDetail?.league} />
        <AnnouncementsSection announcements={teamDetail?.announcements} isStaff={isStaff} onDrawerOpen={onDrawerOpen} />
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">선수 목록</p>
          {!isEmpty(teamDetail?.squads) && (
            <Carousel
              className="w-full"
              itemClassName="w-[calc(33.333%-11px)] min-w-[calc(33.333%-11px)]"
              gap={16}
              showArrows={teamDetail!.squads!.length > 3}
            >
              {teamDetail!.squads!.map((squad) => (
                <div key={squad.playerId} className="flex flex-col items-center gap-2 p-3 rounded-lg">
                  <ProfileImage
                    imageUrl={squad.playerImageUrl}
                    className="size-20 rounded-full object-cover border-2 border-gray-400"
                  />
                  <p className="text-sm text-white font-medium text-center">{squad.playerName}</p>
                </div>
              ))}
            </Carousel>
          )}
          {isEmpty(teamDetail?.squads) && <p className="text-sm text-gray-400">등록된 선수가 없습니다.</p>}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">리뷰 목록</p>
          <div className="flex flex-col gap-2">
            {teamDetail?.reviews?.map((review) => (
              <div
                key={review.reviewCategoryUuid}
                className="flex items-center justify-between p-2 rounded-lg border border-gray-700 bg-gray-800"
              >
                <p className="text-sm text-gray-300">{review.reviewCategoryPhrase}</p>
                <p className="text-sm text-blue-500 font-bold">{review.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
