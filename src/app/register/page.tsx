"use client"

import { useActionState } from "react"
import { register } from "@/app/lib/actions"
import { Heart } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    register,
    undefined
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#f6d2d9] opacity-30 blur-[100px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#efe5ce] opacity-40 blur-[120px]" />
      </div>

      <div className="max-w-md w-full p-8 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-xl shadow-[#855933]/5 border border-[#ebe9e2] z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#cea360] text-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#2d2a26]">Create an Account</h1>
          <p className="text-[#a26e38] mt-2 text-sm">Start planning your perfect wedding</p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#6c492b] mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#e4d1aa] focus:outline-none focus:ring-2 focus:ring-[#cea360] focus:border-transparent transition-all bg-[#fcfaf5] text-[#2d2a26]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6c492b] mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#e4d1aa] focus:outline-none focus:ring-2 focus:ring-[#cea360] focus:border-transparent transition-all bg-[#fcfaf5] text-[#2d2a26]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6c492b] mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#e4d1aa] focus:outline-none focus:ring-2 focus:ring-[#cea360] focus:border-transparent transition-all bg-[#fcfaf5] text-[#2d2a26]"
            />
          </div>
          
          {errorMessage && (
            <div className="p-3 text-sm text-[#d6617c] bg-[#fdf5f6] rounded-xl border border-[#fae8eb]">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 px-4 bg-[#2d2a26] text-white rounded-full font-medium hover:bg-[#1a1816] transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0 mt-6 hover:-translate-y-0.5"
          >
            {isPending ? "Creating account..." : "Sign up"}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-[#a26e38]">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[#cea360] hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
