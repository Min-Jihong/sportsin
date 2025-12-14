"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/lib/assets";
import { motion } from "framer-motion";
import { isAuthenticated } from "@/lib/utils/auth";
import { PATHS } from "@/constants/paths";
import { delay } from "es-toolkit";

export default function Home() {
  const router = useRouter();

  const handleRedirect = async () => {
    await delay(1000);
    const isLogined = isAuthenticated();
    router.push(isLogined ? PATHS.signin : PATHS.login);
  };

  useEffect(() => {
    handleRedirect();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <motion.div
        layoutId="shared-logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Logo className="w-[212px] h-[72px]" />
      </motion.div>
    </div>
  );
}
