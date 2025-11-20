import { cn } from "@/lib/utils";

interface ShimmerTextProps {
  children: string;
  className?: string;
}

export const ShimmerText = ({ children, className }: ShimmerTextProps) => {
  return (
    <div className="relative flex justify-start items-center">
      <div
        className={cn(
          "justify-start text-transparent text-base font-bold relative z-10 bg-white/90",
          "animate-shimmer bg-clip-text bg-no-repeat bg-size-[200%_100%]",
          "bg-linear-to-r from-transparent via-violet-500 via-50% to-transparent",
          className
        )}
      >
        {children}
      </div>
      <div className={cn("absolute top-0 left-0 w-full h-full text-base font-bold z-0 text-stone-900", className)}>
        {children}
      </div>
    </div>
  );
};
