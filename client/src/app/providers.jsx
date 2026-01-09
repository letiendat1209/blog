"use client";

import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/client/theme-provider";
import { Toaster } from "@/components/ui/sonner";
// import { authBootstrap } from "@/lib/authBootstrap";

const queryClient = new QueryClient();

export default function Providers({ children }) {
  // useEffect(() => {
  //   authBootstrap();
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <Toaster position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
