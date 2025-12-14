import { useQueryStates } from "nuqs";
import { searchParams } from "../lib/search-params";
import { match } from "ts-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSignupStepNavigation } from "../lib/hooks/use-signup-step-navigation";
import { useSigninDataStore } from "../lib/stores/use-signin-data-store";
import { usePutProfilesPlayers } from "@/hooks/use-put-profiles-players";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/paths";

export const SigninFooter = () => {
  const [query] = useQueryStates(searchParams);
  const { nextStep, goToStep } = useSignupStepNavigation();
  const { data: signinData } = useSigninDataStore();
  const { mutate: putProfile, isPending } = usePutProfilesPlayers();
  const router = useRouter();
  const isUsingSkip = match(query.step)
    .with("profile", "gender", () => true)
    .otherwise(() => false);

  const handleComplete = () => {
    // 필수 필드 검증
    if (!signinData.userId) {
      alert("사용자 정보를 불러올 수 없습니다. 다시 로그인해주세요.");
      router.push(PATHS.login);
      return;
    }

    // name이 없으면 nickname을 name으로 사용
    const name = signinData.name || signinData.nickname;
    if (!name) {
      alert("이름을 입력해주세요.");
      return;
    }

    if (!signinData.gender) {
      alert("성별을 선택해주세요.");
      goToStep("gender");
      return;
    }

    if (!signinData.birth) {
      alert("생년월일을 입력해주세요.");
      goToStep("birthDate");
      return;
    }

    // 프로필 데이터 구성 (optional 필드는 값이 있을 때만 포함)
    const profile: {
      name: string;
      gender: "male" | "female" | "none";
      birth: number;
      events: string[];
      weight?: number;
      tall?: number;
      city?: string;
      gu?: string;
      introduce?: string;
      playerImageUrl?: string;
      positions?: Record<string, string[]>;
    } = {
      name: name,
      gender: signinData.gender,
      birth: signinData.birth,
      events: ["football"],
    };

    // optional 필드는 값이 있을 때만 추가
    if (signinData.weight) profile.weight = signinData.weight;
    if (signinData.tall) profile.tall = signinData.tall;
    if (signinData.city) profile.city = signinData.city;
    if (signinData.gu) profile.gu = signinData.gu;
    if (signinData.introduce) profile.introduce = signinData.introduce;
    if (signinData.imageUrl) profile.playerImageUrl = signinData.imageUrl;
    if (signinData.positions) profile.positions = signinData.positions;

    const authorizedPortalUser = {
      id: signinData.userId,
      appId: "SPORTSIN",
      authProvider: "kakao" as const,
      expiresAt: Date.now() + 86400000, // 24시간 후
    };

    putProfile(
      { profile, authorizedPortalUser },
      {
        onSuccess: () => {
          // 성공 시 complete step으로 이동
          goToStep("complete");
        },
        onError: (error) => {
          console.error("프로필 등록 실패:", error);
          alert(error instanceof Error ? error.message : "프로필 등록에 실패했습니다.");
        },
      }
    );
  };

  const handleButtonClick = () => {
    if (query.step === "introduction") {
      handleComplete();
    } else {
      nextStep();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2 items-center px-4 py-5 mt-auto min-h-[136px]",
        (query.step === "gender" || query.step === "complete") && "opacity-0"
      )}
    >
      <Button variant="default" size="lg" onClick={handleButtonClick} className="w-full" disabled={isPending}>
        {isPending ? "처리 중..." : query.step === "introduction" ? "완료" : "다음"}
      </Button>
      {isUsingSkip && (
        <Button variant="ghost" size="lg" onClick={nextStep} className="w-full" disabled={isPending}>
          건너뛰기
        </Button>
      )}
    </div>
  );
};
