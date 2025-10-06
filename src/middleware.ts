import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /root to home page with CTF hash
  if (pathname === '/root') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.hash = '#ctf';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/root'],
};
