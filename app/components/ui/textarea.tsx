import * as React from "react";

import { cn } from "@/lib/utils/index";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "py-4 px-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
