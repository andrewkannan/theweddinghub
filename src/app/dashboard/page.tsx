import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { format, isAfter, isBefore, addDays } from "date-fns"
import { 
  Wallet, 
  CheckCircle2, 
  Users, 
  AlertTriangle,
  Clock
} from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const wedding = await prisma.wedding.findFirst({
    where: { userId: session.user.id },
    include: {
      budgetItems: true,
      tasks: true,
      guests: true,
      vendors: { include: { payments: true } }
    }
  })

  if (!wedding) {
    return (
      <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome to The Wedding Hub!</h2>
        <p className="text-slate-500 mb-6">You haven't set up a wedding yet. Let's get started by creating your first wedding project.</p>
        <button className="px-6 py-3 bg-rose-500 text-white rounded-xl font-medium hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/30">
          Create Wedding
        </button>
      </div>
    )
  }

  // Budget Calculations
  const totalBudget = wedding.budget
  const totalEstimated = wedding.budgetItems.reduce((acc, item) => acc + item.estimatedCost, 0)
  const totalActual = wedding.budgetItems.reduce((acc, item) => acc + item.actualCost, 0)
  const totalPaid = wedding.budgetItems.reduce((acc, item) => acc + item.amountPaid, 0)
  const remainingBudget = totalBudget - totalPaid

  // Guest Calculations
  const totalGuests = wedding.guests.reduce((acc, guest) => acc + guest.paxCount, 0)
  const confirmedGuests = wedding.guests.filter(g => g.rsvpStatus === "confirmed").reduce((acc, guest) => acc + guest.paxCount, 0)
  const pendingGuests = wedding.guests.filter(g => g.rsvpStatus === "pending").reduce((acc, guest) => acc + guest.paxCount, 0)

  // Task Calculations
  const totalTasks = wedding.tasks.length
  const completedTasks = wedding.tasks.filter(t => t.status === "done").length
  const taskProgress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)
  
  const now = new Date()
  const sevenDaysFromNow = addDays(now, 7)
  
  const overdueTasks = wedding.tasks.filter(t => t.status !== "done" && t.deadline && isBefore(new Date(t.deadline), now))
  const upcomingTasks = wedding.tasks.filter(t => t.status !== "done" && t.deadline && isAfter(new Date(t.deadline), now) && isBefore(new Date(t.deadline), sevenDaysFromNow))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{wedding.name}</h1>
        <p className="text-slate-500">
          {wedding.date ? format(new Date(wedding.date), 'MMMM do, yyyy') : "Date not set"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-emerald-600">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="font-semibold text-sm">Remaining Budget</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">
            ${remainingBudget.toLocaleString()}
          </div>
          <div className="text-sm text-slate-500">
            out of ${totalBudget.toLocaleString()}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-blue-600">
            <div className="p-2 bg-blue-50 rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="font-semibold text-sm">Task Progress</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">
            {taskProgress}%
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${taskProgress}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-purple-600">
            <div className="p-2 bg-purple-50 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
            <span className="font-semibold text-sm">Confirmed Guests</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">
            {confirmedGuests}
          </div>
          <div className="text-sm text-slate-500">
            {pendingGuests} pending out of {totalGuests} total
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-rose-600">
            <div className="p-2 bg-rose-50 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="font-semibold text-sm">Action Needed</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">
            {overdueTasks.length}
          </div>
          <div className="text-sm text-slate-500">
            overdue tasks
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Tasks */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-900 text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              Upcoming Deadlines
            </h3>
          </div>
          <div className="space-y-4">
            {upcomingTasks.length === 0 ? (
              <p className="text-slate-500 text-sm">No upcoming tasks in the next 7 days.</p>
            ) : (
              upcomingTasks.map(task => (
                <div key={task.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <h4 className="font-medium text-slate-800">{task.title}</h4>
                    <p className="text-sm text-slate-500">{task.deadline ? format(new Date(task.deadline), 'MMM do, yyyy') : ''}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'high' ? 'bg-red-100 text-red-700' :
                    task.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-200 text-slate-700'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Overdue Items & Alerts */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-900 text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              Alerts
            </h3>
          </div>
          <div className="space-y-4">
            {overdueTasks.length === 0 ? (
              <p className="text-slate-500 text-sm">No alerts. You're all caught up!</p>
            ) : (
              overdueTasks.map(task => (
                <div key={task.id} className="flex items-start gap-4 p-4 rounded-2xl bg-rose-50 border border-rose-100">
                  <div className="mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-rose-900">Overdue Task: {task.title}</h4>
                    <p className="text-sm text-rose-700 mt-1">Was due on {task.deadline ? format(new Date(task.deadline), 'MMM do, yyyy') : ''}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
