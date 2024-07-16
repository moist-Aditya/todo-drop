import { auth } from "@/lib/auth"

export default auth((req) => {
  const adminRoutes = ["/admin-panel"]
  const protectedRoutes = ["/dashboard", ...adminRoutes]

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

  if (
    req.auth &&
    adminRoutes.includes(req.nextUrl.pathname) &&
    req.auth.user.role !== "ADMIN"
  ) {
    console.log("NOT AN ADMIN")

    return Response.redirect(new URL("/dashboard", req.nextUrl.origin))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
