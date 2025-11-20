"use client";

import { SigninContent } from "./components/signin-content";
import { SigninFooter } from "./components/signin-footer";
import { SigninHeader } from "./components/signin-header";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black relative overflow-hidden">
      <SigninHeader />
      <SigninContent />
      <SigninFooter />
    </div>
  );
};

export default Page;
