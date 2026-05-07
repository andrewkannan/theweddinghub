import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { addScheduleItem, deleteScheduleItem } from "@/app/lib/actions/schedule"
import { Plus } from "lucide-react"
import { ScheduleTimeline } from "@/components/dashboard/ScheduleTimeline"

export default async function SchedulePage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const wedding = await prisma.wedding.findFirst({
    where: { userId: session.user.id },
    include: { schedules: { orderBy: { startTime: 'asc' } } }
  })

  if (!wedding) redirect("/dashboard")

  const schedules = wedding.schedules

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Schedule Planner</h1>
          <p className="text-slate-500">Plan your wedding day timeline.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Event Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
            <h3 className="font-semibold text-slate-900 text-lg mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-500" />
              Add Event
            </h3>
            <form action={addScheduleItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Event Title</label>
                <input type="text" name="title" required placeholder="e.g. Ceremony" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Start Time</label>
                  <input type="datetime-local" name="startTime" required className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">End Time</label>
                  <input type="datetime-local" name="endTime" required className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <input type="text" name="location" placeholder="e.g. Grand Hall" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea name="description" placeholder="Any important details..." className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50 h-24 resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-3 mt-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                Add Event
              </button>
            </form>
          </div>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-2 py-4">
          <ScheduleTimeline initialItems={schedules} deleteAction={deleteScheduleItem} />
        </div>
      </div>
    </div>
  )
}
