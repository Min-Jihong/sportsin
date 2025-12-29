"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  extended?: boolean;
  label?: string;
  isOpen?: boolean;
}

const FAB = forwardRef<HTMLButtonElement, FABProps>(
  (
    {
      icon,
      size = "md",
      position = "bottom-right",
      extended = false,
      label,
      isOpen = false,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "fixed z-50 inline-flex items-center justify-center font-semibold shadow-lg backdrop-blur-sm";

    const sizeStyles = {
      sm: "w-12 h-12 rounded-xl",
      md: "w-14 h-14 rounded-2xl",
      lg: "w-16 h-16 rounded-2xl",
    };

    const extendedStyles = {
      sm: "px-4 py-3 rounded-xl gap-2",
      md: "px-5 py-3.5 rounded-2xl gap-2",
      lg: "px-6 py-4 rounded-2xl gap-2.5",
    };

    const positionStyles = {
      "bottom-right": "bottom-20 right-4",
      "bottom-left": "bottom-20 left-4",
      "bottom-center": "bottom-20 left-1/2 -translate-x-1/2",
    };

    const defaultIcon = isOpen ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />;

    return (
      <motion.button
        ref={ref}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: isOpen ? 45 : 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          baseStyles,
          extended && label ? extendedStyles[size] : sizeStyles[size],
          positionStyles[position],
          "bg-white hover:bg-gray-100 active:bg-gray-200 text-black",
          className
        )}
        {...(props as any)}
      >
        {icon || defaultIcon}
        {extended && label && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </motion.button>
    );
  }
);

FAB.displayName = "FAB";

export { FAB };
