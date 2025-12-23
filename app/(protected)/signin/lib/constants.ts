import { SignupStep } from "./types";

export const SIGNUP_STEPS: Record<SignupStep, string> = {
  profile: "프로필 사진",
  birthDate: "생년월일",
  gender: "성별",
  location: "위치",
  introduction: "자기소개",
  // position: "선호 포지션",
  complete: "완료",
};
