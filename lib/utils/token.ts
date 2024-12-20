'use client';

export async function getMoniteToken(): Promise<string> {
  const token = process.env.NEXT_PUBLIC_MONITE_TOKEN;
  if (!token) {
    throw new Error('Monite token is not configured');
  }
  return token;
}