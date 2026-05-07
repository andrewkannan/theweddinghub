import { 
  Heart, 
  Wallet, 
  Users, 
  Calendar as CalendarIcon, 
  CheckSquare, 
  ArrowUpRight,
  Sparkles,
  Clock
} from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  // Mock data for UI demonstration
  const weddingDate = new Date()
  weddingDate.setMonth(weddingDate.getMonth() + 6)
  
  const daysRemaining = Math.floor((weddingDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  
  const budget = { total: 35000, spent: 12450 }
  const budgetPercent = (budget.spent / budget.total) * 100

  const guests = { total: 150, attending: 85, pending: 65 }
  const rsvpPercent = (guests.attending / guests.total) * 100

  return (
    <div className="max-w-6xl animate-fade-in pb-12">
      
      {/* Top Section: Health Score & AI Insight */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-2/3 bg-[#cea360] rounded-3xl p-8 text-white relative overflow-hidden shadow-lg shadow-[#cea360]/20">
          <div className="absolute top-[-50%] right-[-10%] w-64 h-64 rounded-full bg-white opacity-10 blur-2xl" />
          <h1 className="text-3xl font-serif font-bold mb-2">You're getting married in {daysRemaining} days!</h1>
          <p className="text-white/80 mb-6 max-w-md text-sm leading-relaxed">
            Your planning is on track. You have 3 pending tasks this week.
          </p>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl font-medium text-sm border border-white/20">
              Wedding Health: 92% (Excellent)
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3 bg-white rounded-3xl p-6 border border-[#ebe9e2] shadow-sm flex flex-col justify-between group cursor-pointer hover:border-[#cea360] transition-colors">
          <div>
            <div className="flex items-center gap-2 text-[#d6617c] font-medium mb-3">
              <Sparkles className="w-5 h-5" />
              AI Insight
            </div>
            <p className="text-[#2d2a26] font-serif leading-snug">
              Based on similar weddings, booking your florist now could save you up to 15%.
            </p>
          </div>
          <div className="flex justify-end mt-4 text-[#cea360]">
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Main Widgets Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Budget Widget */}
        <div className="bg-white rounded-3xl p-6 border border-[#ebe9e2] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#fcfaf5] text-[#cea360] rounded-xl flex items-center justify-center border border-[#e4d1aa]">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-[#2d2a26]">Budget</h3>
            </div>
            <Link href="/dashboard/budget" className="text-[#b1a796] hover:text-[#cea360] transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="mb-2 flex justify-between items-end">
            <span className="text-2xl font-bold text-[#2d2a26]">${budget.spent.toLocaleString()}</span>
            <span className="text-sm text-[#a26e38]">/ ${budget.total.toLocaleString()}</span>
          </div>
          
          <div className="h-3 w-full bg-[#f5f4f1] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#cea360] rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${budgetPercent}%` }}
            />
          </div>
          <p className="text-xs text-[#b1a796] mt-3 mt-auto">You've utilized {Math.round(budgetPercent)}% of your budget.</p>
        </div>

        {/* RSVP Widget */}
        <div className="bg-white rounded-3xl p-6 border border-[#ebe9e2] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#fdf5f6] text-[#d6617c] rounded-xl flex items-center justify-center border border-[#fae8eb]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-[#2d2a26]">RSVPs</h3>
            </div>
            <Link href="/dashboard/guests" className="text-[#b1a796] hover:text-[#d6617c] transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="flex gap-4 mb-4">
            <div>
              <div className="text-2xl font-bold text-[#2d2a26]">{guests.attending}</div>
              <div className="text-xs text-[#a26e38]">Attending</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#b1a796]">{guests.pending}</div>
              <div className="text-xs text-[#b1a796]">Pending</div>
            </div>
          </div>
          
          <div className="flex gap-1 h-3 w-full rounded-full overflow-hidden mt-auto">
            <div className="h-full bg-[#d6617c] transition-all duration-1000" style={{ width: `${rsvpPercent}%` }} />
            <div className="h-full bg-[#f5f4f1] flex-1" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#2d2a26] rounded-3xl p-6 text-white shadow-md">
          <h3 className="font-semibold mb-4 text-[#fdfbf7]">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#3d3934] hover:bg-[#4d4842] rounded-xl transition-colors text-sm font-medium">
              <Wallet className="w-4 h-4 text-[#cea360]" /> Add Expense
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#3d3934] hover:bg-[#4d4842] rounded-xl transition-colors text-sm font-medium">
              <Users className="w-4 h-4 text-[#d6617c]" /> Add Guest
            </button>
            <Link href="/dashboard/moodboards" className="w-full flex items-center gap-3 px-4 py-3 bg-[#3d3934] hover:bg-[#4d4842] rounded-xl transition-colors text-sm font-medium">
              <Heart className="w-4 h-4 text-white" /> View Moodboard
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section: Timeline & Tasks */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-[#ebe9e2] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif font-bold text-lg text-[#2d2a26]">Upcoming Appointments</h3>
            <Link href="/dashboard/schedule" className="text-sm text-[#cea360] font-medium hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {[
              { title: "Cake Tasting at Sweet Layers", time: "Tomorrow, 2:00 PM", type: "vendor" },
              { title: "Venue Final Walkthrough", time: "Friday, 10:00 AM", type: "venue" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start p-4 rounded-2xl bg-[#fcfaf5] border border-[#ebe9e2]">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm text-[#a26e38]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#2d2a26] text-sm">{item.title}</h4>
                  <p className="text-xs text-[#855933] mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#ebe9e2] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif font-bold text-lg text-[#2d2a26]">High Priority Tasks</h3>
            <Link href="/dashboard/tasks" className="text-sm text-[#cea360] font-medium hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {[
              "Finalize catering menu selection",
              "Send out remaining digital invitations",
              "Pay photographer deposit"
            ].map((task, i) => (
              <label key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#fcfaf5] transition-colors cursor-pointer border border-transparent hover:border-[#ebe9e2]">
                <input type="checkbox" className="w-5 h-5 rounded border-[#c5beb1] text-[#cea360] focus:ring-[#cea360]" />
                <span className="text-sm font-medium text-[#2d2a26]">{task}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  )
}
