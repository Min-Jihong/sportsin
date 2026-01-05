"use client";

import { Drawer } from "@/components/ui/drawer";
import { RemoveAnnouncementsDrawer } from "@/(protected)/(sigined)/teams/components/team-detail-view/remove-announcements-drawer";
import { Team, Announcement } from "@/lib/types/team";
import { isEmpty } from "es-toolkit/compat";
import { useState } from "react";
import { MoreVertical, Megaphone } from "lucide-react";
import { useDeleteAnnouncement } from "@/hooks/use-delete-announcement";
import { AnnouncementsEditorDrawer } from "./announcements-editor-drawer";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface AnnouncementsListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  teamDetail?: Team;
  isStaff: boolean;
}

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "방금 전";
  }

  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  }

  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  }

  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일 전`;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export const AnnouncementsListDrawer = ({ isOpen, onClose, teamDetail, isStaff }: AnnouncementsListDrawerProps) => {
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | undefined>();
  const [deletingAnnouncement, setDeletingAnnouncement] = useState<Announcement | undefined>();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const { mutate: deleteAnnouncement } = useDeleteAnnouncement();

  const handleDelete = (announcement: Announcement) => {
    deleteAnnouncement({ uuid: announcement.uuid, teamId: teamDetail!.teamId });
  };

  return (
    <>
      <Drawer title="공지사항" isOpen={isOpen} onClose={onClose} fullScreen>
        {isEmpty(teamDetail?.announcements) ? (
          <div className="flex flex-col items-center justify-center h-full px-8 -mt-20">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6">
              <Megaphone className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-200 mb-2">공지사항이 없습니다</h3>
            <p className="text-sm text-gray-500 text-center leading-relaxed">아직 등록된 공지사항이 없어요</p>
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {teamDetail?.announcements?.map((announcement, index) => (
                <motion.div
                  key={announcement.uuid}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="relative group"
                >
                  <div className="flex items-start gap-4 py-5 border-b border-gray-800/50 active:bg-gray-900/30 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center shrink-0 mt-1">
                      <Megaphone className="w-5 h-5 text-blue-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] text-white font-medium leading-relaxed whitespace-pre-wrap mb-3">
                        {announcement.message}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-medium">{formatDate(announcement.createdAt)}</span>
                      </div>
                    </div>

                    {isStaff && (
                      <Popover
                        open={openMenuId === announcement.uuid}
                        onOpenChange={(open) => setOpenMenuId(open ? announcement.uuid : null)}
                      >
                        <PopoverTrigger asChild>
                          <button
                            className="p-2 -mr-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800/50 active:bg-gray-800 transition-all shrink-0"
                            aria-label="메뉴"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          align="end"
                          className="w-40 p-1 bg-gray-800 border border-gray-700 rounded-xl shadow-xl"
                        >
                          <button
                            onClick={() => {
                              setEditingAnnouncement(announcement);
                              setOpenMenuId(null);
                            }}
                            className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => {
                              setDeletingAnnouncement(announcement);
                              setOpenMenuId(null);
                            }}
                            className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            삭제
                          </button>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </Drawer>
      <AnnouncementsEditorDrawer
        isOpen={!!editingAnnouncement}
        onClose={() => setEditingAnnouncement(undefined)}
        teamId={teamDetail?.teamId}
        announcement={editingAnnouncement!}
      />
      <RemoveAnnouncementsDrawer
        isOpen={!!deletingAnnouncement}
        onClose={() => setDeletingAnnouncement(undefined)}
        onConfirm={() => handleDelete(deletingAnnouncement!)}
      />
    </>
  );
};
