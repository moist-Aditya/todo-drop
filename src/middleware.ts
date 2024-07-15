import { auth } from "@/lib/auth"

export default auth((req) => {
  const protectedRoutes = ["/dashboard", "/admin-panel"]

  if (!req.auth && protectedRoutes.includes(req.nextUrl.pathname)) {
    const loginUrl = new URL("/login", req.nextUrl.origin)
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)

    return Response.redirect(loginUrl)
  }

  if (
    req.auth &&
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")
  ) {
    const newUrl = new URL("/dashboard", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
