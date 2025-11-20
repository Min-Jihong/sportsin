import * as React from "react";

import { cn } from "@/lib/utils/index";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "py-4 px-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg",
        className
      )}
      {...props}
    />
  );
}

export { Input };
