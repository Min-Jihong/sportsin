import { create } from "zustand";

interface SignupStepStore {
  type: "prev" | "next";
  setType: (type: "prev" | "next") => void;
}

export const useSignupStepStore = create<SignupStepStore>((set) => ({
  type: "next",
  setType: (type) => set({ type }),
}));
