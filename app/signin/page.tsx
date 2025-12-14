"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SigninContent } from "./components/signin-content";
import { SigninFooter } from "./components/signin-footer";
import { SigninHeader } from "./components/signin-header";
import { isAuthenticated } from "@/lib/utils/auth";
import { PATHS } from "@/constants/paths";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // accessToken이 없으면 로그인 페이지로 리다이렉트
    if (!isAuthenticated()) {
      router.push(PATHS.login);
    }
  }, [router]);

  // accessToken이 없으면 아무것도 렌더링하지 않음
  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="flex flex-col h-dvh bg-black relative overflow-hidden">
      <SigninHeader />
      <SigninContent />
      <SigninFooter />
    </div>
  );
};

export default Page;
