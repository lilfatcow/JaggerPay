'use client';

import { AuthProvider } from "@/contexts/auth-context";
import { MoniteAppProvider } from "@/providers/monite-provider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <MoniteAppProvider>
        {children}
        <Toaster />
      </MoniteAppProvider>
    </AuthProvider>
  );
}
