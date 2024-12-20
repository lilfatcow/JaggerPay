import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_MONITE_API_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-monite-version': process.env.NEXT_PUBLIC_MONITE_VERSION!,
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: process.env.NEXT_PUBLIC_MONITE_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_MONITE_CLIENT_SECRET,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to obtain Monite access token');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in Monite token endpoint:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
