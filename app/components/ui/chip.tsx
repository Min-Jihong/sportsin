"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  selected?: boolean;
  onRemove?: () => void;
  removable?: boolean;
  icon?: React.ReactNode;
}

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      label,
      variant = "default",
      size = "md",
      selected = false,
      onRemove,
      removable = false,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all";

    const variantStyles = {
      default: selected
        ? "bg-gray-700 text-white border-2 border-gray-500"
        : "bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50",
      primary: selected
        ? "bg-blue-600 text-white border-2 border-blue-500"
        : "bg-blue-900/30 text-blue-400 border border-blue-800/50 hover:bg-blue-900/50",
      secondary: selected
        ? "bg-gray-600 text-white border-2 border-gray-500"
        : "bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50",
      success: selected
        ? "bg-green-600 text-white border-2 border-green-500"
        : "bg-green-900/30 text-green-400 border border-green-800/50 hover:bg-green-900/50",
      warning: selected
        ? "bg-yellow-600 text-white border-2 border-yellow-500"
        : "bg-yellow-900/30 text-yellow-400 border border-yellow-800/50 hover:bg-yellow-900/50",
      error: selected
        ? "bg-red-600 text-white border-2 border-red-500"
        : "bg-red-900/30 text-red-400 border border-red-800/50 hover:bg-red-900/50",
    };

    const sizeStyles = {
      sm: "text-xs px-2 py-1 gap-1",
      md: "text-sm px-3 py-1.5 gap-1.5",
      lg: "text-base px-4 py-2 gap-2",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...(props as any)}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{label}</span>
        {removable && onRemove && (
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="ml-1 shrink-0 hover:opacity-70 transition-opacity"
          >
            <X className="w-3 h-3" />
          </motion.button>
        )}
      </motion.button>
    );
  }
);

Chip.displayName = "Chip";

export { Chip };
