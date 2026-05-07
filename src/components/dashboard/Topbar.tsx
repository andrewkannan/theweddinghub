"use client"

import { useSession } from "next-auth/react"
import { Bell } from "lucide-react"

export function Topbar() {
  const { data: session } = useSession()

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="font-medium text-slate-800">
        Welcome back, {session?.user?.name || 'Planner'}
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
        </button>
        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-medium text-sm border border-indigo-200">
          {session?.user?.name?.[0] || 'U'}
        </div>
      </div>
    </header>
  )
}
