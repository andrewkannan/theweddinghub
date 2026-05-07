"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Wallet, 
  CheckSquare, 
  Store, 
  Users, 
  Calendar, 
  AlertCircle,
  LogOut,
  Heart
} from "lucide-react"
import { signOut } from "next-auth/react"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Budget", href: "/dashboard/budget", icon: Wallet },
  { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "Vendors", href: "/dashboard/vendors", icon: Store },
  { name: "Guests", href: "/dashboard/guests", icon: Users },
  { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
  { name: "Issues", href: "/dashboard/issues", icon: AlertCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-slate-900 border-r border-slate-800 text-slate-300">
      <div className="flex items-center h-16 px-6 gap-2 text-white border-b border-slate-800">
        <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
          <Heart className="w-5 h-5 fill-current" />
        </div>
        <span className="font-semibold text-lg">The Wedding Hub</span>
      </div>
      
      <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                isActive 
                  ? "bg-rose-500 text-white" 
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          )
        })}
      </div>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-xl transition-colors hover:bg-slate-800 hover:text-white text-slate-400"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Sign out</span>
        </button>
      </div>
    </div>
  )
}
