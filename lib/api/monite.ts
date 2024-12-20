'use client';

import { MoniteSDK } from '@monite/sdk-api';
import { MONITE_CONFIG } from '../config/monite';

let moniteInstance: MoniteSDK | null = null;

export function getMoniteSDK(): MoniteSDK {
  if (!moniteInstance) {
    moniteInstance = new MoniteSDK({
      apiUrl: MONITE_CONFIG.apiUrl,
      entityId: MONITE_CONFIG.entityId,
      token: MONITE_CONFIG.token,
    });
  }
  return moniteInstance;
}