'use client';

import { MoniteProvider } from '@monite/sdk-react';
import { useAuth } from '@/contexts/auth-context';
import { useEffect, useState } from 'react';
import { moniteService } from '@/lib/monite';
import { MoniteSDK } from '@monite/sdk-api';
import { toast } from 'sonner';

export function MoniteAppProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [sdk, setSdk] = useState<MoniteSDK | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMonite = async () => {
      try {
        setError(null);
        
        if (!user) {
          console.log('No user, skipping Monite initialization');
          setSdk(null);
          return;
        }

        console.log('Initializing Monite for user:', user.email);
        await moniteService.initialize();
        const moniteSDK = moniteService.getSDK();
        
        if (!moniteSDK) {
          throw new Error('Failed to initialize Monite SDK');
        }
        
        console.log('Monite SDK initialized successfully');
        setSdk(moniteSDK);
      } catch (error: any) {
        console.error('Failed to initialize Monite:', error);
        setError(error.message || 'Failed to initialize Monite');
        toast.error(error.message || 'Failed to initialize Monite');
      } finally {
        setLoading(false);
      }
    };

    initializeMonite();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading Monite...</h2>
          <p className="text-muted-foreground">Please wait while we set up your account.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2 text-red-600">Monite Error</h2>
          <p className="text-muted-foreground">{error}</p>
          <p className="mt-4 text-sm">Check the console for more details.</p>
        </div>
      </div>
    );
  }

  if (!sdk) {
    return <>{children}</>;
  }

  return (
    <MoniteProvider monite={sdk}>
      {children}
    </MoniteProvider>
  );
}
