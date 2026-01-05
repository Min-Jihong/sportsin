"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
  fullScreen?: boolean;
}

export const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  className,
  fullScreen = false,
}: DrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={cn("fixed inset-0 z-50 flex", fullScreen ? "items-stretch" : "items-end justify-center")}>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={closeOnOverlayClick ? onClose : undefined}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 35,
                mass: 0.8,
              },
            }}
            exit={{
              y: "100%",
              transition: {
                type: "tween",
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }}
            className={cn(
              "relative w-full bg-gray-900 border-t border-gray-800 shadow-2xl overflow-hidden flex flex-col",
              fullScreen ? "h-full rounded-none" : "max-w-md rounded-t-2xl max-h-[90vh]",
              className
            )}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0">
                {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
                {showCloseButton && (
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </motion.button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
