"use client";

import { useState } from "react";
import { AnimationContainer } from "./animation-container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const IntroductionStep = () => {
  const [nickname, setNickname] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");

  return (
    <AnimationContainer className="flex flex-col gap-6 w-full h-full">
      <div className="text-center space-y-2 shrink-0">
        <h1 className="text-2xl font-bold text-white">닉네임과 자기소개를 작성해주세요</h1>
        <p className="text-white/70 text-sm leading-relaxed">
          다른 사람들이 당신을 알아볼 수 있도록
          <br />
          자기소개를 작성해주세요.
        </p>
      </div>
      <div className="w-full flex flex-col gap-2 px-5">
        <div className="space-y-2 shrink-0">
          <Input
            type="text"
            value={nickname}
            className="w-full"
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요."
            maxLength={10}
          />
          <p className="text-sm text-white/50 text-end">{nickname.length}/10</p>
        </div>
        <div className="space-y-2 flex flex-col flex-1 min-h-0 overflow-hidden">
          <Textarea
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="자기소개를 입력해주세요."
            rows={10}
            className="w-full flex-1 resize-none min-h-[300px]"
          />
          <p className="text-sm text-white/50 text-end shrink-0">{introduction.length}/1,000</p>
        </div>
      </div>
    </AnimationContainer>
  );
};
