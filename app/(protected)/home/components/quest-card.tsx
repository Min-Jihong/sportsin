"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, useAnimation, MotionValue } from "framer-motion";
import { X, Check, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Quest {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  completedCount: number;
}

interface QuestCardProps {
  quest: Quest;
  onSwipe: (direction: "left" | "right") => void;
  onTap: () => void;
  index: number;
  total: number;
}

const SWIPE_THRESHOLD = 100;

interface SwipeIndicatorProps {
  x: MotionValue<number>;
  threshold: number;
  direction: "left" | "right";
  label: string;
  icon: LucideIcon;
  className: string;
}

const SwipeIndicator = ({ x, threshold, direction, label, icon: Icon, className }: SwipeIndicatorProps) => {
  const opacity = useTransform(
    x,
    direction === "left" ? [-threshold, 0] : [0, threshold],
    direction === "left" ? [1, 0] : [0, 1]
  );

  return (
    <motion.div
      className={cn("text-white px-4 py-2 rounded-full flex items-center gap-2", className)}
      style={{ opacity }}
    >
      <Icon className="w-5 h-5" />
      <span className="font-semibold">{label}</span>
    </motion.div>
  );
};

export const QuestCard = ({ quest, onSwipe, onTap, index, total }: QuestCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD, 200], [0, 1, 1, 1, 0]);
  const scale = useTransform(x, [-200, 0, 200], [0.95, 1, 0.95]);
  const controls = useAnimation();

  const handleDragEnd = async (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(offset) > SWIPE_THRESHOLD || Math.abs(velocity) > 500) {
      const direction = offset > 0 ? "right" : "left";

      await controls.start({
        x: direction === "right" ? 1000 : -1000,
        opacity: 0,
        transition: { duration: 0.3 },
      });

      onSwipe(direction);
    } else {
      controls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      });
    }
    setIsDragging(false);
  };

  const cardStyle = {
    x,
    rotate,
    opacity,
    scale,
    zIndex: total - index,
  };

  return (
    <motion.div
      className={cn("absolute inset-0 flex items-center justify-center", index > 0 && "pointer-events-none")}
      style={cardStyle}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      animate={controls}
      onClick={!isDragging ? onTap : undefined}
    >
      <motion.div
        className={cn(
          "relative w-[90%] max-w-md h-[500px] rounded-2xl overflow-hidden",
          "backdrop-blur-xl bg-white/5 border border-white/10",
          "shadow-2xl",
          "cursor-grab active:cursor-grabbing"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* 배경 이미지 */}
        {quest.thumbnail && (
          <div className="absolute inset-0">
            <img src={quest.thumbnail} alt={quest.title} className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        )}

        {/* 스와이프 방향 표시 */}
        <SwipeIndicator
          x={x}
          threshold={SWIPE_THRESHOLD}
          direction="left"
          label="스킵"
          icon={X}
          className="absolute top-4 left-4 bg-red-500/80"
        />

        <SwipeIndicator
          x={x}
          threshold={SWIPE_THRESHOLD}
          direction="right"
          label="도전"
          icon={Check}
          className="absolute top-4 right-4 bg-green-500/80"
        />

        {/* 콘텐츠 */}
        <div className="relative h-full flex flex-col justify-end p-6 text-white">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold">{quest.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{quest.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>✓ {quest.completedCount}명 완료</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
