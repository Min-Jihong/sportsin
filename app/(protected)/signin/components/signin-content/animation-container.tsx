import { useSignupStepStore } from "@/(protected)/signin/lib/stores/use-signup-step-store";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

interface AnimationContainerProps extends PropsWithChildren {
  className?: string;
}

export const AnimationContainer = ({ children, className }: AnimationContainerProps) => {
  const type = useSignupStepStore((state) => state.type);

  return (
    <motion.div
      initial={{ opacity: 0, x: type === "prev" ? -200 : 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: type === "prev" ? 200 : -200 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
