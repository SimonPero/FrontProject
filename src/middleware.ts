import { auth } from "./auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  console.log(nextUrl)
  if (nextUrl.pathname == "/signIn") return ;
  if (!isLoggedIn && nextUrl.pathname === "/productManagement") {
    return Response.redirect(new URL("/signIn", nextUrl))
  }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}