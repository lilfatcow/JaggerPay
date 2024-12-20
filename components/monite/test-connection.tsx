'use client';

import { useMoniteContext } from '@monite/sdk-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function TestMoniteConnection() {
  const monite = useMoniteContext();
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    try {
      // Test the connection by fetching entity details
      const entity = await monite.api.entities.getEntity();
      toast.success('Successfully connected to Monite');
      console.log('Entity details:', entity);
    } catch (error) {
      console.error('Monite connection error:', error);
      toast.error('Failed to connect to Monite');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={testConnection} 
      disabled={isLoading}
      variant="outline"
    >
      Test Monite Connection
    </Button>
  );
}
