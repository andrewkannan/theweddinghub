import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { addVendor, deleteVendor } from "@/app/lib/actions/vendors"
import { Store, Trash2, Plus, Mail, Phone, DollarSign } from "lucide-react"

export default async function VendorsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const wedding = await prisma.wedding.findFirst({
    where: { userId: session.user.id },
    include: { vendors: { include: { payments: true } } }
  })

  if (!wedding) redirect("/dashboard")

  const vendors = wedding.vendors

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vendors</h1>
          <p className="text-slate-500">Manage your wedding vendors and payments.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Vendor Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
            <h3 className="font-semibold text-slate-900 text-lg mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-500" />
              Add Vendor
            </h3>
            <form action={addVendor} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company / Name</label>
                <input type="text" name="name" required placeholder="e.g. Grand Hall Estate" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <input type="text" name="category" required placeholder="e.g. Venue, Catering, Photography" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contact Info</label>
                <input type="text" name="contactInfo" placeholder="Email or Phone number" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Quoted Price $</label>
                  <input type="number" step="0.01" name="quotedPrice" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Final Price $</label>
                  <input type="number" step="0.01" name="finalPrice" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50" />
                </div>
              </div>
              <button type="submit" className="w-full py-3 mt-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                Add Vendor
              </button>
            </form>
          </div>
        </div>

        {/* Vendors List */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vendors.map(vendor => {
              const totalPaid = vendor.payments.reduce((acc, payment) => acc + payment.amount, 0);
              const balance = (vendor.finalPrice || vendor.quotedPrice) - totalPaid;
              return (
                <div key={vendor.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center">
                        <Store className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{vendor.name}</h3>
                        <p className="text-xs font-medium text-indigo-600 bg-indigo-50 inline-block px-2 py-0.5 rounded-full mt-1">
                          {vendor.category}
                        </p>
                      </div>
                    </div>
                    <form action={async () => {
                      "use server"
                      await deleteVendor(vendor.id)
                    }}>
                      <button className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                  
                  {vendor.contactInfo && (
                    <div className="text-sm text-slate-500 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {vendor.contactInfo}
                    </div>
                  )}

                  <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div>
                      <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                        <DollarSign className="w-3 h-3" /> Total Cost
                      </div>
                      <div className="font-semibold text-slate-900">
                        ${(vendor.finalPrice || vendor.quotedPrice).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                        <DollarSign className="w-3 h-3" /> Balance Due
                      </div>
                      <div className={`font-semibold ${balance > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        ${Math.max(0, balance).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            {vendors.length === 0 && (
              <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-sm text-slate-500">
                No vendors added yet. Add one to keep track of your team!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
