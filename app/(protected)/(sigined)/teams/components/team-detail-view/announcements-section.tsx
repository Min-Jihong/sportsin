import { Button } from "@/components/ui/button";
import { Announcement } from "@/lib/types/team";
import { Plus } from "@phosphor-icons/react";
import { isEmpty } from "es-toolkit/compat";

interface AnnouncementsSectionProps {
  announcements?: Announcement[];
  isStaff: boolean;
  onDrawerOpen: (type: "team-selector" | "announcement-editor" | "announcement-list") => void;
}

export const AnnouncementsSection = ({ announcements, isStaff, onDrawerOpen }: AnnouncementsSectionProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">공지 사항</p>
        {isStaff && (
          <Button variant="ghost" size="icon" onClick={() => onDrawerOpen("announcement-editor")}>
            <Plus />
          </Button>
        )}
      </div>
      {isEmpty(announcements) && (
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-sm text-gray-400">등록된 공지 사항이 없습니다.</p>
        </div>
      )}
      {!isEmpty(announcements) && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            {announcements?.slice(0, 3).map((announcement, index) => (
              <div
                key={`announcement-${index}`}
                className="flex items-center justify-between p-2 not-last:border-b border-gray-700"
              >
                <p className="text-sm text-gray-300">{announcement.message}</p>
                <span className="text-xs text-gray-500">{new Date(announcement.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
          {announcements && announcements.length > 3 && (
            <Button variant="outline" size="sm" onClick={() => onDrawerOpen("announcement-list")}>
              더보기
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
