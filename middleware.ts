import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of paths that don't require authentication
const publicPaths = ['/', '/auth', '/inquire'];

export function middleware(request: NextRequest) {
  // Check if the path is public
  if (publicPaths.some(path => request.nextUrl.pathname === path)) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  const token = request.cookies.get('auth_token');
  
  if (!token) {
    // Redirect to login if not authenticated
    const loginUrl = new URL('/auth', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};
