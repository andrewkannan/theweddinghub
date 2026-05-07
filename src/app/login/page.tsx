"use client"

import { useActionState } from "react"
import { authenticate } from "@/app/lib/actions"
import { Heart } from "lucide-react"

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-teal-50">
      <div className="max-w-md w-full p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-800">Welcome to The Wedding Hub</h1>
          <p className="text-slate-500 mt-2 text-sm">Sign in to manage your special day</p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all bg-white/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all bg-white/50"
            />
          </div>
          
          {errorMessage && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-xl">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 px-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-slate-500">
          Demo Account: demo@unionplanner.com / AML!Task12
        </div>
      </div>
    </div>
  )
}
