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
  Settings,
  Image as ImageIcon,
  Armchair,
  LogOut,
  Heart
} from "lucide-react"
import { signOut } from "next-auth/react"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Budget", href: "/dashboard/budget", icon: Wallet },
  { name: "Timeline", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "Vendors", href: "/dashboard/vendors", icon: Store },
  { name: "Guests", href: "/dashboard/guests", icon: Users },
  { name: "Seating", href: "/dashboard/seating", icon: Armchair },
  { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
  { name: "Moodboards", href: "/dashboard/moodboards", icon: ImageIcon },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-72 bg-[#fdfbf7] border-r border-[#ebe9e2] text-[#2d2a26]">
      <div className="flex items-center h-20 px-8 gap-3 border-b border-[#ebe9e2]">
        <div className="w-10 h-10 bg-[#cea360] rounded-xl flex items-center justify-center shadow-sm">
          <Heart className="w-5 h-5 text-white fill-current" />
        </div>
        <span className="font-serif font-bold text-xl tracking-tight text-[#2d2a26]">WeddingOS</span>
      </div>
      
      <div className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto no-scrollbar">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                isActive 
                  ? "bg-[#f7f3e8] text-[#a26e38] font-semibold shadow-sm" 
                  : "text-[#b1a796] hover:bg-[#fcfaf5] hover:text-[#6c492b]"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#cea360]' : ''}`} />
              <span className="text-sm">{item.name}</span>
            </Link>
          )
        })}
      </div>

      <div className="p-6 border-t border-[#ebe9e2]">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-2xl transition-colors hover:bg-rose-50 hover:text-rose-600 text-[#b1a796]"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Sign out</span>
        </button>
      </div>
    </div>
  )
}
