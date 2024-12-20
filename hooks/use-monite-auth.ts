'use client';

import { useSession } from 'next-auth/react';
import { useMoniteContext } from '@monite/sdk-react';
import { useEffect, useState } from 'react';

export function useMoniteAuth() {
  const { data: session, status: sessionStatus } = useSession();
  const monite = useMoniteContext();
  const [isMoniteReady, setIsMoniteReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function initializeMonite() {
      if (sessionStatus === 'authenticated' && monite) {
        try {
          await monite.auth.getToken();
          setIsMoniteReady(true);
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Failed to initialize Monite'));
          setIsMoniteReady(false);
        }
      }
    }

    initializeMonite();
  }, [sessionStatus, monite]);

  return {
    isAuthenticated: sessionStatus === 'authenticated',
    isMoniteReady,
    error,
    isLoading: sessionStatus === 'loading' || (sessionStatus === 'authenticated' && !isMoniteReady),
  };
}
