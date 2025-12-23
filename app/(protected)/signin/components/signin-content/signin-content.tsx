import { searchParams } from "@/(protected)/signin/lib/search-params";
import { match } from "ts-pattern";
import { useQueryStates } from "nuqs";
import { UploadProfileStep } from "./upload-profile-step";
import { BirthDateStep } from "./birth-date-step";
import { GenderStep } from "./gender-step";
import { IntroductionStep } from "./introduction-step";
import { LocationStep } from "./location-step";
import { CompleteStep } from "./complete-step";
import { AnimatePresence } from "framer-motion";

export const SigninContent = () => {
  const [query] = useQueryStates(searchParams);

  return (
    <div className="flex flex-1 items-center justify-center py-8 w-full h-full">
      <AnimatePresence mode="wait">
        {match(query.step)
          .with("profile", () => <UploadProfileStep />)
          .with("birthDate", () => <BirthDateStep />)
          .with("gender", () => <GenderStep />)
          .with("introduction", () => <IntroductionStep />)
          .with("location", () => <LocationStep />)
          // .with("position", () => <PositionStep />)
          .with("complete", () => <CompleteStep />)
          .exhaustive()}
      </AnimatePresence>
    </div>
  );
};
