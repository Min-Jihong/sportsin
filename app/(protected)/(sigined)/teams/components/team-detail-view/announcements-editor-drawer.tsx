"use client";

import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { usePostAnnouncements } from "@/hooks/use-post-announcements";
import { useUpdateAnnouncement } from "@/hooks/use-update-announcement";
import { useQueryClient } from "@tanstack/react-query";
import { isEmpty } from "es-toolkit/compat";
import { useEffect, useState } from "react";
import { Announcement } from "@/lib/types/team";

interface AnnouncementsEditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  teamId?: string;
  announcement?: Announcement;
}

export const AnnouncementsEditorDrawer = ({
  isOpen,
  onClose,
  teamId,
  announcement,
}: AnnouncementsEditorDrawerProps) => {
  const [message, setMessage] = useState<string>("");
  const { mutate: postAnnouncement } = usePostAnnouncements();
  const { mutate: updateAnnouncement } = useUpdateAnnouncement();
  const queryClient = useQueryClient();
  const isEditMode = !!announcement;

  useEffect(() => {
    if (announcement) {
      setMessage(announcement.message);
    } else {
      setMessage("");
    }
  }, [announcement, isOpen]);

  const handleSubmit = () => {
    if (isEmpty(message)) return;

    if (isEditMode && announcement) {
      updateAnnouncement(
        { uuid: announcement.uuid, message, senderTeamId: teamId! },
        {
          onSuccess: () => {
            setTimeout(() => {
              queryClient.invalidateQueries({ queryKey: ["team", teamId] });
              setMessage("");
              onClose();
            }, 300);
          },
        }
      );
    } else {
      postAnnouncement(
        { senderTeamId: teamId!, message },
        {
          onSuccess: () => {
            setTimeout(() => {
              queryClient.invalidateQueries({ queryKey: ["team", teamId] });
              setMessage("");
              onClose();
            }, 300);
          },
        }
      );
    }
  };

  return (
    <Drawer title={isEditMode ? "공지 사항 수정" : "공지 사항 등록"} isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Textarea
          placeholder="공지 사항을 입력해주세요."
          className="h-40"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex flex-col gap-0.5">
          <Button className="w-full" disabled={isEmpty(message)} onClick={handleSubmit}>
            {isEditMode ? "수정" : "등록"}
          </Button>
          <Button className="w-full" variant="ghost" onClick={onClose}>
            취소
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
