import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SigninData {
  imageUrl?: string;
  nickname?: string;
  name?: string;
  userId?: string;
  birth?: number; // yyyyMMdd 형태 (예: 20240101)
  gender?: "male" | "female" | "none";
  introduce?: string;
  positions?: Record<string, string[]>; // { "football": ["골키퍼", "수비수"] }
  city?: string;
  gu?: string;
  tall?: number;
  weight?: number;
}

interface SigninDataStore {
  data: SigninData;
  setData: (data: Partial<SigninData>) => void;
  clearData: () => void;
}

const initialData: SigninData = {
  imageUrl: undefined,
  nickname: undefined,
  name: undefined,
  userId: undefined,
  birth: undefined,
  gender: undefined,
  introduce: undefined,
  positions: undefined,
  city: undefined,
  gu: undefined,
  tall: undefined,
  weight: undefined,
};

export const useSigninDataStore = create<SigninDataStore>()(
  persist(
    (set) => ({
      data: initialData,
      setData: (newData) =>
        set((state) => ({
          data: { ...state.data, ...newData },
        })),
      clearData: () => set({ data: initialData }),
    }),
    {
      name: "signin-data-storage",
    }
  )
);
