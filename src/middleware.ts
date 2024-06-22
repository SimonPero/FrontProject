import { NextApiResponse } from "next";
import { auth } from "./auth";

export default async function middlewareAuth(req: any, res: NextApiResponse) {
  const session = await auth();
  const { nextUrl } = req;
  if (nextUrl.pathname === '/signIn') return;
  if (!session && nextUrl.pathname === '/productManagement') {
    return Response.redirect(new URL('/signIn', nextUrl));
  }
}

// Opcionalmente, no invoques Middleware en algunas rutas
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};