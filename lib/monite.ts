'use client';

import { MoniteSDK } from '@monite/sdk-api';
import { MONITE_CONFIG } from './config/monite';
import { getAccessToken } from './api/auth';
import { validateConfig } from './api/validation';

// Validate configuration before creating SDK instance
validateConfig();

// Create and export Monite SDK instance
export const monite = new MoniteSDK({
  apiUrl: MONITE_CONFIG.apiUrl!,
  entityId: MONITE_CONFIG.entityId!,
  fetchToken: getAccessToken,
});