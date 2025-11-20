import { useQueryStates } from "nuqs";
import { searchParams } from "../search-params";
import { SIGNUP_STEPS } from "../constants";
import { getTypedKeys } from "@/lib/utils/get-typed-keys";
import type { SignupStep } from "../types";
import { useSignupStepStore } from "../stores/use-signup-step-store";

export const useSignupStepNavigation = () => {
  const [query, setQuery] = useQueryStates(searchParams);
  const setType = useSignupStepStore((state) => state.setType);

  const nextStep = () => {
    setType("next");
    const steps = getTypedKeys(SIGNUP_STEPS);
    const currentIndex = steps.indexOf(query.step);
    if (currentIndex < steps.length - 1) {
      setQuery((prev) => ({ ...prev, step: steps[currentIndex + 1] }));
    }
  };

  const prevStep = () => {
    setType("prev");
    const steps = getTypedKeys(SIGNUP_STEPS);
    const currentIndex = steps.indexOf(query.step);
    if (currentIndex > 0) {
      setQuery((prev) => ({ ...prev, step: steps[currentIndex - 1] }));
    }
  };

  const goToStep = (step: SignupStep) => {
    setType("next");
    setQuery((prev) => ({ ...prev, step }));
  };

  return {
    currentStep: query.step,
    nextStep,
    prevStep,
    goToStep,
  };
};
