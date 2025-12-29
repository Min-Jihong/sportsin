import { Separator } from "@/components/ui/separator";
import { match } from "ts-pattern";

export const SummarySection = ({ matches, grade, league }: { matches?: number; grade?: number; league?: string }) => {
  return (
    <div className="flex items-center gap-2 border-b border-border mb-4 h-15">
      <SummaryItem label="경기 횟수" value={matches} />
      <Separator orientation="vertical" />
      <SummaryItem label="평점" value={grade} />
      <Separator orientation="vertical" />
      <SummaryItem
        label="팀 등급"
        value={match(league)
          .with("amateur", () => "아마추어")
          .otherwise(() => "미분류")}
      />
    </div>
  );
};

const SummaryItem = ({ label, value }: { label: string; value?: string | number }) => {
  return (
    <div className="flex flex-col gap-0.5 min-w-20 px-2 py-1 items-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold text-gray-300">{value}</p>
    </div>
  );
};
