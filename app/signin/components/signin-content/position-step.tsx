"use client";

import { useState } from "react";
import { AnimationContainer } from "./animation-container";

type Position = "골키퍼" | "수비수" | "미드필더" | "공격수";

const POSITIONS: Position[] = ["골키퍼", "수비수", "미드필더", "공격수"];

const POSITION_IMAGES: Record<Position, string> = {
  골키퍼: "🧤",
  수비수: "🛡️",
  미드필더: "🎯",
  공격수: "⚽",
};

export const PositionStep = () => {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  return (
    <AnimationContainer className="flex flex-col gap-8 w-full px-4 h-full justify-center">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">선호하는 포지션을 선택해주세요</h1>
        <p className="text-white/70 text-sm leading-relaxed">주로 플레이하는 포지션을 알려주세요</p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs mx-auto">
        {POSITIONS.map((position) => (
          <button
            key={position}
            onClick={() => setSelectedPosition(position)}
            className={`py-8 px-6 rounded-2xl font-semibold text-lg transition-all flex flex-col items-center gap-3 ${
              selectedPosition === position
                ? "bg-blue-500 text-white shadow-lg scale-[1.02]"
                : "bg-white/5 border-2 border-white/10 hover:border-blue-400 hover:bg-white/10 text-white"
            }`}
          >
            <span className="text-5xl">{POSITION_IMAGES[position]}</span>
            <span>{position}</span>
          </button>
        ))}
      </div>
    </AnimationContainer>
  );
};
