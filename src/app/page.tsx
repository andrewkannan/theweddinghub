import Link from "next/link"
import { Heart, Sparkles, Calendar, Users, Calculator } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between bg-white border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-rose-100 text-rose-500 rounded-xl flex items-center justify-center">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <span className="font-semibold text-xl text-slate-800">The Wedding Hub</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Log in
          </Link>
          <Link href="/login" className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
            Get Started
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-6 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>The easiest way to plan your perfect day</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8">
            Plan your wedding with <span className="text-rose-500">joy</span>, not stress.
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Everything you need to organize your wedding in one beautiful place. Track budgets, manage guests, and stay on top of your tasks.
          </p>
          <Link href="/login" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium bg-rose-500 text-white rounded-2xl hover:bg-rose-600 transition-all shadow-[0_8px_30px_rgb(244,63,94,0.3)] hover:shadow-[0_8px_30px_rgb(244,63,94,0.4)] hover:-translate-y-0.5">
            Start Planning Now
          </Link>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">Everything you need in one place</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">Budget Tracking</h3>
                <p className="text-slate-500 leading-relaxed">Keep your expenses in check. Track estimated vs actual costs and never lose sight of your budget.</p>
              </div>
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">Guest Management</h3>
                <p className="text-slate-500 leading-relaxed">Easily manage your guest list, track RSVPs, dietary requirements, and organize seating arrangements.</p>
              </div>
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">Task Scheduling</h3>
                <p className="text-slate-500 leading-relaxed">Stay on top of your to-dos with clear deadlines and priority tracking for every wedding milestone.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
