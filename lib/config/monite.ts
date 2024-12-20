export const MONITE_CONFIG = {
  apiUrl: process.env.NEXT_PUBLIC_MONITE_API_URL || 'https://api.sandbox.monite.com/v1',
  clientId: process.env.NEXT_PUBLIC_MONITE_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_MONITE_CLIENT_SECRET,
  entityId: process.env.NEXT_PUBLIC_MONITE_ENTITY_ID,
  version: process.env.NEXT_PUBLIC_MONITE_VERSION || '2024-01-31',
  audience: process.env.NEXT_PUBLIC_MONITE_AUDIENCE || 'https://api.sandbox.monite.com/v1',
} as const;