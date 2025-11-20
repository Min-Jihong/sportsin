"use client";

import { Calendar } from "lucide-react";
import { useRef, useState } from "react";
import { AnimationContainer } from "./animation-container";
import { ShimmerText } from "@/components/shimmer-text";
import { format } from "date-fns";

export const BirthDateStep = () => {
  const [date, setDate] = useState<string>("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
  };

  const handleCalendarClick = () => {
    const input = dateInputRef.current;
    if (input) {
      // 최신 브라우저에서는 showPicker() 사용
      if (typeof (input as any).showPicker === "function") {
        (input as any).showPicker();
      } else {
        // fallback: click() 사용
        input.click();
      }
    }
  };

  // 오늘 날짜와 최소 날짜 (1900-01-01) 계산
  const today = new Date().toISOString().split("T")[0];
  const minDate = "1900-01-01";

  return (
    <AnimationContainer className="flex flex-col items-center gap-8 w-full px-4 h-full justify-center">
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-bold text-white">생년월일을 알려주세요</h1>
        <p className="text-white/70 text-sm leading-relaxed">고객님의 생년월일을 알려주세요</p>
      </div>

      {/* 생년월일 일러스트 */}
      <div className="relative size-40 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 blur-xl" />
        <div
          className="relative size-40 rounded-full bg-white/5 border-2 border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/10 hover:border-blue-400/50 transition-all active:scale-95"
          onClick={handleCalendarClick}
        >
          <Calendar className="size-12 text-blue-400" />
          {date && (
            <div className="text-center">
              <ShimmerText>{format(date, "yyyy-MM-dd")}</ShimmerText>
            </div>
          )}
          {!date && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <div className="w-2 h-2 rounded-full bg-pink-400" />
            </div>
          )}
        </div>
      </div>

      <input
        ref={dateInputRef}
        type="date"
        value={date}
        onChange={handleDateChange}
        max={today}
        min={minDate}
        className="absolute opacity-0 pointer-events-none"
        style={{ width: "1px", height: "1px" }}
      />
    </AnimationContainer>
  );
};
