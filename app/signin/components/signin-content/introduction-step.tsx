"use client";

import { useState, useEffect } from "react";
import { AnimationContainer } from "./animation-container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSigninDataStore } from "@/signin/lib/stores/use-signin-data-store";

export const IntroductionStep = () => {
  const { data: signinData, setData: setSigninData } = useSigninDataStore();
  const [nickname, setNickname] = useState<string>(signinData.nickname || "");
  const [introduction, setIntroduction] = useState<string>(signinData.introduce || "");

  // store의 nickname이 변경되면 로컬 state 업데이트
  useEffect(() => {
    if (signinData.nickname) {
      setNickname(signinData.nickname);
    }
    if (signinData.introduce) {
      setIntroduction(signinData.introduce);
    }
  }, [signinData.nickname, signinData.introduce]);

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
      <div className="size-full flex flex-col gap-2 px-5">
        <div className="space-y-2 shrink-0">
          <Input
            type="text"
            value={nickname}
            className="w-full"
            onChange={(e) => {
              const newNickname = e.target.value;
              setNickname(newNickname);
              // store에도 저장
              setSigninData({ nickname: newNickname });
            }}
            placeholder="닉네임을 입력해주세요."
            maxLength={10}
          />
          <p className="text-sm text-white/50 text-end">{nickname.length}/10</p>
        </div>
        <div className="space-y-2 flex flex-col flex-1 min-h-0 overflow-hidden">
          <Textarea
            value={introduction}
            onChange={(e) => {
              const newIntroduction = e.target.value;
              setIntroduction(newIntroduction);
              // store에도 저장
              setSigninData({ introduce: newIntroduction });
            }}
            placeholder="자기소개를 입력해주세요."
            className="w-full flex-1 resize-none h-full"
            maxLength={1000}
          />
          <p className="text-sm text-white/50 text-end shrink-0">{introduction.length}/1,000</p>
        </div>
      </div>
    </AnimationContainer>
  );
};
