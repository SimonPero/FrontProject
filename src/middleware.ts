import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "./auth";

export default async function middlewareAuth(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  if (pathname === "/signIn") return NextResponse.next();

  if (!session?.jwt) {
    return NextResponse.redirect(new URL("/signIn", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/productManagement", "/cart", "/products/:productId*"],
};