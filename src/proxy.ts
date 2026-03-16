import { auth } from '@/auth'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isClipIQ = req.nextUrl.pathname.startsWith('/clipiq')
  const isLoginPage = req.nextUrl.pathname === '/clipiq/login'

  if (isClipIQ && !isLoginPage && !isLoggedIn) {
    return Response.redirect(new URL('/clipiq/login', req.nextUrl))
  }
})

export const config = {
  matcher: ['/clipiq/:path*'],
}
