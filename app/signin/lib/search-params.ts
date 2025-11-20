import { parseAsStringEnum } from "nuqs/server";
import { SignupStep } from "./types";
import { SIGNUP_STEPS } from "./constants";
import { getTypedKeys } from "@/lib/utils/get-typed-keys";

export const searchParams = {
  step: parseAsStringEnum<SignupStep>(getTypedKeys(SIGNUP_STEPS)).withDefault("profile"),
};
