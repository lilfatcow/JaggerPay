'use client';

import { useEffect, useState } from 'react';
import { MoniteSDK } from '@monite/sdk-api';
import { MONITE_CONFIG } from '../config/monite';
import { getAccessToken } from '../api/auth';

export function useMonite() {
  const [monite, setMonite] = useState<MoniteSDK | null>(null);

  useEffect(() => {
    const sdk = new MoniteSDK({
      apiUrl: MONITE_CONFIG.apiUrl,
      entityId: MONITE_CONFIG.entityId,
      fetchToken: getAccessToken,
    });

    setMonite(sdk);
  }, []);

  return monite;
}