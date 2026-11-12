import { NextResponse, type NextRequest } from 'next/server';

const AUTH_COOKIE = 'streethub_auth_token';
const PUBLIC_PATHS = ['/', '/auth', '/auth/forgot'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(AUTH_COOKIE)?.value);
  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  const isAuthPath = pathname === '/auth' || pathname === '/auth/forgot';

  if (hasSession && isAuthPath) {
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  if (!hasSession && !isPublicPath) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
};
