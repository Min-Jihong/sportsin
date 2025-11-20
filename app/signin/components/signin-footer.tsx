import { useQueryStates } from "nuqs";
import { searchParams } from "../lib/search-params";
import { match } from "ts-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSignupStepNavigation } from "../lib/hooks/use-signup-step-navigation";

export const SigninFooter = () => {
  const [query] = useQueryStates(searchParams);
  const { nextStep } = useSignupStepNavigation();
  const isUsingSkip = match(query.step)
    .with("profile", "gender", "introduction", () => true)
    .otherwise(() => false);

  return (
    <div
      className={cn(
        "flex flex-col gap-2items-center px-4 py-5 mt-auto min-h-[136px]",
        (query.step === "gender" || query.step === "complete") && "hidden"
      )}
    >
      <Button variant="default" size="lg" onClick={nextStep} className="w-full">
        {query.step === "position" ? "완료" : "다음"}
      </Button>
      {isUsingSkip && (
        <Button variant="ghost" size="lg" onClick={nextStep} className="w-full">
          건너뛰기
        </Button>
      )}
    </div>
  );
};
