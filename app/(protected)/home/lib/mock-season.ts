export interface Season {
  id: string;
  name: string;
  number: number;
  startDate: number;
  endDate: number;
  description: string;
  totalQuests: number;
  completedQuests: number;
  reward?: string;
}

export const mockCurrentSeason: Season = {
  id: "season-1",
  name: "겨울 시즌",
  number: 1,
  startDate: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7일 전 시작
  endDate: Date.now() + 23 * 24 * 60 * 60 * 1000, // 23일 후 종료
  description: "추운 겨울에도 뜨거운 축구 열정을!",
  totalQuests: 10,
  completedQuests: 3,
  reward: "시즌 한정 배지",
};

export const getDaysRemaining = (endDate: number): number => {
  const diff = endDate - Date.now();
  return Math.ceil(diff / (24 * 60 * 60 * 1000));
};

export const getSeasonProgress = (season: Season): number => {
  return Math.round((season.completedQuests / season.totalQuests) * 100);
};

