import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { format } from "date-fns"
import { addTask, updateTaskStatus, deleteTask } from "@/app/lib/actions/tasks"
import { Plus, Trash2, ArrowRight, ArrowLeft } from "lucide-react"

export default async function TasksPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const wedding = await prisma.wedding.findFirst({
    where: { userId: session.user.id },
    include: { tasks: { orderBy: { createdAt: 'desc' } } }
  })

  if (!wedding) redirect("/dashboard")

  const tasks = wedding.tasks

  const columns = [
    { id: "todo", title: "To Do", bg: "bg-slate-50", border: "border-slate-200" },
    { id: "in_progress", title: "In Progress", bg: "bg-blue-50", border: "border-blue-200" },
    { id: "done", title: "Done", bg: "bg-emerald-50", border: "border-emerald-200" }
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Task Management</h1>
          <p className="text-slate-500">Keep track of what needs to be done.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-indigo-500" />
          Add New Task
        </h3>
        <form action={addTask} className="flex flex-col md:flex-row gap-4">
          <input type="text" name="title" required placeholder="Task title..." className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50" />
          <select name="priority" className="px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50">
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <input type="date" name="deadline" className="px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 text-sm text-slate-600" />
          <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap">
            Add Task
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-[500px]">
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col.id)
          return (
            <div key={col.id} className={`${col.bg} border ${col.border} rounded-3xl p-4 flex flex-col`}>
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-semibold text-slate-800">{col.title}</h3>
                <span className="text-xs font-medium bg-white px-2 py-1 rounded-full text-slate-500 border border-slate-200 shadow-sm">{colTasks.length}</span>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto">
                {colTasks.map(task => (
                  <div key={task.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-slate-900 text-sm leading-snug">{task.title}</h4>
                      <form action={async () => {
                        "use server"
                        await deleteTask(task.id)
                      }}>
                        <button className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          task.priority === 'high' ? 'bg-rose-100 text-rose-700' :
                          task.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {task.priority}
                        </span>
                        {task.deadline && (
                          <span className="text-xs text-slate-500 font-medium">
                            {format(new Date(task.deadline), 'MMM d')}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-1">
                        {col.id !== 'todo' && (
                          <form action={async () => {
                            "use server"
                            await updateTaskStatus(task.id, col.id === 'done' ? 'in_progress' : 'todo')
                          }}>
                            <button className="p-1.5 bg-slate-50 text-slate-500 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors" title="Move Back">
                              <ArrowLeft className="w-3.5 h-3.5" />
                            </button>
                          </form>
                        )}
                        {col.id !== 'done' && (
                          <form action={async () => {
                            "use server"
                            await updateTaskStatus(task.id, col.id === 'todo' ? 'in_progress' : 'done')
                          }}>
                            <button className="p-1.5 bg-slate-50 text-slate-500 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors" title="Move Forward">
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {colTasks.length === 0 && (
                  <div className="h-24 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-sm text-slate-400">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
