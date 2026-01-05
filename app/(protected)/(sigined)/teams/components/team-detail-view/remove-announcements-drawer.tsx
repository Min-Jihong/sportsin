"use client";

import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export interface RemoveAnnouncementsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const RemoveAnnouncementsDrawer = ({ isOpen, onClose, onConfirm }: RemoveAnnouncementsDrawerProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Drawer title={"확인"} isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <div className="flex flex-col gap-4">
        <div className="flex min-h-20 items-center">
          <p className="text-base text-gray-300">
            정말로 해당 공지 사항을 삭제하시겠습니까?
            <br />
            삭제된 공지 사항은 복구할 수 없습니다.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button className="w-full" variant="destructive" onClick={handleConfirm}>
            삭제
          </Button>
          <Button className="w-full" variant="ghost" onClick={onClose}>
            취소
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
