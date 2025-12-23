"use client";

import { useSignupStepNavigation } from "@/(protected)/signin/lib/hooks/use-signup-step-navigation";
import { AnimationContainer } from "@/(protected)/signin/components/signin-content/animation-container";
import { Button } from "@/components/ui/button";
import { useSigninDataStore } from "@/(protected)/signin/lib/stores/use-signin-data-store";

export const GenderStep = () => {
  const { nextStep } = useSignupStepNavigation();
  const { setData: setSigninData } = useSigninDataStore();

  const handleGenderSelect = (gender: "male" | "female") => {
    setSigninData({ gender });
    nextStep();
  };

  return (
    <AnimationContainer key="gender" className="flex flex-col gap-8 w-full px-4 h-full justify-center">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">성별이 어떻게 되시나요?</h1>
        <p className="text-white/70 text-sm leading-relaxed">더 나은 매칭을 위해 필요해요.</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
        <Button onClick={() => handleGenderSelect("male")} size="lg">
          <span className="text-2xl">♂</span>
          <span>남자</span>
        </Button>
        <Button variant="warn" onClick={() => handleGenderSelect("female")} size="lg">
          <span className="text-2xl">♀</span>
          <span>여자</span>
        </Button>
      </div>
    </AnimationContainer>
  );
};
