"use client"

import { useSession } from "next-auth/react"
import { Bell } from "lucide-react"

export function Topbar() {
  const { data: session } = useSession()

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-[#ebe9e2] flex items-center justify-between px-10 sticky top-0 z-10">
      <div className="font-serif text-xl font-medium text-[#2d2a26]">
        Welcome back, {session?.user?.name || 'Planner'}
      </div>
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-[#b1a796] hover:text-[#cea360] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#d6617c] rounded-full border border-white"></span>
        </button>
        <div className="w-10 h-10 bg-[#f7f3e8] text-[#cea360] rounded-full flex items-center justify-center font-medium text-sm border border-[#e4d1aa] shadow-sm">
          {session?.user?.name?.[0] || 'U'}
        </div>
      </div>
    </header>
  )
}
