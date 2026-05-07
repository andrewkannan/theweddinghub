import type { NextAuthConfig } from "next-auth"

export default {
  providers: [],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAuthRoute = nextUrl.pathname === "/login" || nextUrl.pathname === "/register"
      
      // Allow root page (landing page) without auth
      if (nextUrl.pathname === "/") {
        return true;
      }

      if (isAuthRoute) {
        if (isLoggedIn) return Response.redirect(new URL("/dashboard", nextUrl))
        return true
      }

      if (!isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl))
      }
      return true
    },
  },
} satisfies NextAuthConfig
