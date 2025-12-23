"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PropsWithChildren, useState } from "react";
import { queryClientConfig } from "@/lib/utils/react-query";
import { Toaster } from "./components/ui/sonner";

export const Provider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        {children}
        <Toaster />
      </NuqsAdapter>
    </QueryClientProvider>
  );
};
