import { SIGNUP_STEPS } from "../lib/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useSignupStepNavigation } from "../lib/hooks/use-signup-step-navigation";
import { searchParams } from "../lib/search-params";
import { useQueryStates } from "nuqs";

export const SigninHeader = () => {
  const [query] = useQueryStates(searchParams);
  const { prevStep } = useSignupStepNavigation();

  const stepNumber = Object.keys(SIGNUP_STEPS).indexOf(query.step) + 1;
  const totalSteps = Object.keys(SIGNUP_STEPS).length;

  return (
    <div className="w-full min-h-20">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 h-full px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevStep}
            disabled={query.step === "profile" || query.step === "complete"}
          >
            <ArrowLeftIcon className="size-5" />
          </Button>
          <h1 className="text-base font-semibold text-gray-100">프로필 설정</h1>
        </div>
        <Progress value={(stepNumber / totalSteps) * 100} className="h-1" />
      </div>
    </div>
  );
};
