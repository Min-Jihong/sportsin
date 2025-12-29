import { Button } from "@/components/ui/button";
import { PATHS } from "@/constants/paths";
import { EmptyState } from "@/lib/assets";
import { useRouter } from "next/navigation";

export const EmptyTeamsView = () => {
  const router = useRouter();
  return (
    <div className="px-10 flex flex-col gap-8 w-full">
      <p className="text-center text-gray-300 text-xl font-bold">
        현재 가입된 팀 목록이 없습니다.
        <br />
        새로운 팀을 생성해보세요.
      </p>
      <EmptyState className="w-full h-[200px]" />
      <Button
        variant="default"
        size="lg"
        className="w-full rounded-full"
        onClick={() => router.push(PATHS.teamsCreate)}
      >
        팀 생성하기
      </Button>
    </div>
  );
};
