import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { auth } from "./auth";


const protectedRoutes = {
  '/productManagement': true,
  '/cart': true,
  '/profile': true,
  '/orders': true,
};

export default async function middlewareAuth(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  if (pathname === '/signIn') return NextResponse.next();

  for (const [route, isProtected] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route) && isProtected) {
      if (!session?.jwt) {
        return NextResponse.redirect(new URL('/signIn', req.url));
      }
      break;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};