"use client";

import { PATHS } from "@/constants/paths";
import { Bell, House, Icon, MagnifyingGlass, Users } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomNavigation = () => {
  const pathname = usePathname();
  const paths = `/${pathname.split("/")[1]}`;
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center px-8 py-5 border-t border-gray-800 bg-black">
      <BottomNavigationItem href={PATHS.home} iconSlot={House} isActive={paths === PATHS.home} />
      <BottomNavigationItem href={PATHS.teams} iconSlot={Users} isActive={paths === PATHS.teams} />
      <BottomNavigationItem href={PATHS.search} iconSlot={MagnifyingGlass} isActive={paths === PATHS.search} />
      <BottomNavigationItem href={PATHS.notifications} iconSlot={Bell} isActive={paths === PATHS.notifications} />
    </div>
  );
};

const BottomNavigationItem = ({
  href,
  iconSlot: Slot,
  isActive,
}: {
  href: string;
  iconSlot: Icon;
  isActive: boolean;
}) => {
  return (
    <Link href={href}>
      <motion.div
        animate={{
          scale: isActive ? 1.1 : 1,
          y: isActive ? -2 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        whileTap={{ scale: 0.9 }}
      >
        <Slot weight={isActive ? "fill" : "regular"} className="size-5 transition-colors duration-200" />
      </motion.div>
    </Link>
  );
};
