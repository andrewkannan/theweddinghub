import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { addGuest, deleteGuest } from "@/app/lib/actions/guests"
import { Users, Trash2, Plus, UserCheck, UserX, Clock } from "lucide-react"

export default async function GuestsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const wedding = await prisma.wedding.findFirst({
    where: { userId: session.user.id },
    include: { guests: { orderBy: { name: 'asc' } } }
  })

  if (!wedding) redirect("/dashboard")

  const guests = wedding.guests

  const totalPax = guests.reduce((sum, g) => sum + g.paxCount, 0)
  const confirmedPax = guests.filter(g => g.rsvpStatus === 'confirmed').reduce((sum, g) => sum + g.paxCount, 0)
  const pendingPax = guests.filter(g => g.rsvpStatus === 'pending').reduce((sum, g) => sum + g.paxCount, 0)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Guest List</h1>
          <p className="text-slate-500">Manage your attendees, RSVPs, and seating.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Total Invited (Pax)</div>
            <div className="text-2xl font-bold text-slate-900">{totalPax}</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Confirmed (Pax)</div>
            <div className="text-2xl font-bold text-slate-900">{confirmedPax}</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Pending (Pax)</div>
            <div className="text-2xl font-bold text-slate-900">{pendingPax}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Add Guest Form */}
        <div className="xl:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
            <h3 className="font-semibold text-slate-900 text-lg mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-500" />
              Add Guest
            </h3>
            <form action={addGuest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name / Family Name</label>
                <input type="text" name="name" required placeholder="e.g. The Smith Family" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Side</label>
                  <select name="side" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50">
                    <option value="">None</option>
                    <option value="bride">Bride</option>
                    <option value="groom">Groom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pax Count</label>
                  <input type="number" name="paxCount" min="1" defaultValue="1" required className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">RSVP Status</label>
                  <select name="rsvpStatus" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50">
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Table Number</label>
                  <input type="text" name="tableNumber" placeholder="e.g. 5" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Dietary Notes</label>
                <input type="text" name="dietaryNotes" placeholder="e.g. Vegetarian, Nut Allergy" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50" />
              </div>
              <button type="submit" className="w-full py-3 mt-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                Add Guest
              </button>
            </form>
          </div>
        </div>

        {/* Guests List */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
                  <tr>
                    <th className="px-6 py-4">Guest Name</th>
                    <th className="px-6 py-4">RSVP Status</th>
                    <th className="px-6 py-4">Pax</th>
                    <th className="px-6 py-4">Side</th>
                    <th className="px-6 py-4">Table</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {guests.map(guest => (
                    <tr key={guest.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{guest.name}</div>
                        {guest.dietaryNotes && (
                          <div className="text-xs text-rose-500 mt-1 truncate max-w-[150px]" title={guest.dietaryNotes}>
                            {guest.dietaryNotes}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          guest.rsvpStatus === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                          guest.rsvpStatus === 'declined' ? 'bg-rose-100 text-rose-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {guest.rsvpStatus.charAt(0).toUpperCase() + guest.rsvpStatus.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium">
                        {guest.paxCount}
                      </td>
                      <td className="px-6 py-4 text-slate-500 capitalize">
                        {guest.side || '-'}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {guest.tableNumber ? `Table ${guest.tableNumber}` : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <form action={async () => {
                          "use server"
                          await deleteGuest(guest.id)
                        }}>
                          <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                  {guests.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                        No guests added yet. Start building your guest list!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
