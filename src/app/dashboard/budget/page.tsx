import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { format } from "date-fns"
import { addBudgetItem, deleteBudgetItem } from "@/app/lib/actions/budget"
import { Trash2, Plus, DollarSign } from "lucide-react"

export default async function BudgetPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const wedding = await prisma.wedding.findFirst({
    where: { userId: session.user.id },
    include: { budgetItems: { include: { payments: true } } }
  })

  if (!wedding) redirect("/dashboard")

  const items = wedding.budgetItems

  // Group by category
  const categories = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, typeof items>)

  const totalEstimated = items.reduce((acc, item) => acc + item.estimatedCost, 0)
  const totalActual = items.reduce((acc, item) => acc + item.actualCost, 0)
  const totalPaid = items.reduce((acc, item) => acc + item.payments.reduce((sum, p) => sum + p.amount, 0), 0)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Budget Management</h1>
          <p className="text-slate-500">Track your estimated and actual expenses.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-slate-50 text-slate-600 rounded-2xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Estimated Total</div>
            <div className="text-2xl font-bold text-slate-900">${totalEstimated.toLocaleString()}</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Actual Cost</div>
            <div className="text-2xl font-bold text-slate-900">${totalActual.toLocaleString()}</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Total Paid</div>
            <div className="text-2xl font-bold text-slate-900">${totalPaid.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Item Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
            <h3 className="font-semibold text-slate-900 text-lg mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-500" />
              Add Budget Item
            </h3>
            <form action={addBudgetItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <input type="text" name="category" required placeholder="e.g. Venue, Catering" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Item Name</label>
                <input type="text" name="itemName" required placeholder="e.g. Grand Hall" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Estimated $</label>
                  <input type="number" step="0.01" name="estimatedCost" required className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Actual $</label>
                  <input type="number" step="0.01" name="actualCost" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Paid $</label>
                  <input type="number" step="0.01" name="amountPaid" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                  <input type="date" name="dueDate" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50 text-sm" />
                </div>
              </div>
              <button type="submit" className="w-full py-3 mt-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                Add Item
              </button>
            </form>
          </div>
        </div>

        {/* Budget Items List Grouped by Category */}
        <div className="lg:col-span-2 space-y-6">
          {Object.entries(categories).map(([category, categoryItems]) => (
            <div key={category} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-semibold text-slate-800">{category}</h3>
                <div className="text-sm font-medium text-slate-500">
                  ${categoryItems.reduce((sum, item) => sum + item.estimatedCost, 0).toLocaleString()}
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {categoryItems.map(item => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">{item.itemName}</h4>
                      {item.dueDate && (
                        <p className="text-xs text-slate-500 mt-1">Due: {format(new Date(item.dueDate), 'MMM do, yyyy')}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-8 text-sm">
                      <div className="text-right">
                        <div className="text-slate-500 text-xs mb-1">Estimated</div>
                        <div className="font-medium">${item.estimatedCost.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-slate-500 text-xs mb-1">Actual</div>
                        <div className="font-medium">${item.actualCost.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-slate-500 text-xs mb-1">Paid</div>
                        <div className={`font-medium ${item.payments.reduce((sum, p) => sum + p.amount, 0) >= item.actualCost && item.actualCost > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                          ${item.payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                        </div>
                      </div>
                      <form action={async () => {
                        "use server"
                        await deleteBudgetItem(item.id)
                      }}>
                        <button type="submit" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Delete item">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {Object.keys(categories).length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-sm text-slate-500">
              No budget items yet. Add one to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
