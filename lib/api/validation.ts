'use client';

import { MONITE_CONFIG } from '../config/monite';

export function validateConfig() {
  const required = {
    entityId: MONITE_CONFIG.entityId,
    apiUrl: MONITE_CONFIG.apiUrl,
    clientId: MONITE_CONFIG.clientId,
    clientSecret: MONITE_CONFIG.clientSecret,
  };

  Object.entries(required).forEach(([key, value]) => {
    if (!value) {
      throw new Error(`NEXT_PUBLIC_MONITE_${key.toUpperCase()} is required`);
    }
  });
}