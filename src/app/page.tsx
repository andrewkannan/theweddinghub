import Link from "next/link"
import { Heart, Sparkles, Calendar, Users, Calculator, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col font-sans">
      {/* Premium Header */}
      <header className="px-8 py-6 flex items-center justify-between absolute w-full top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#cea360] rounded-xl flex items-center justify-center shadow-md">
            <Heart className="w-5 h-5 text-white fill-current" />
          </div>
          <span className="font-serif font-bold text-2xl text-[#2d2a26] tracking-tight">WeddingOS</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium text-[#855933] hover:text-[#cea360] transition-colors">
            Sign In
          </Link>
          <Link href="/login" className="px-6 py-2.5 text-sm font-medium bg-[#2d2a26] text-[#fdfbf7] rounded-full hover:bg-[#4a453f] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Start Planning
          </Link>
        </div>
      </header>

      <main className="flex-1 relative">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#f6d2d9] opacity-30 blur-[100px]" />
          <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#efe5ce] opacity-40 blur-[120px]" />
        </div>

        {/* Hero Section */}
        <section className="relative pt-40 pb-32 px-6 text-center max-w-5xl mx-auto z-10 flex flex-col items-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fdf5f6] border border-[#f6d2d9] text-[#d6617c] text-sm font-medium mb-10 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>The intelligent operating system for couples</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#2d2a26] tracking-tight mb-8 leading-[1.1]">
            Plan your perfect day with <span className="italic text-[#cea360]">elegance.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#b1a796] max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Replace chaotic spreadsheets with a centralized, AI-powered workspace. Manage budgets, guests, tasks, and vendors in one beautiful place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/login" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium bg-[#cea360] text-white rounded-full hover:bg-[#c28b46] transition-all shadow-[0_8px_30px_rgba(206,163,96,0.4)] hover:-translate-y-1">
              Create your project <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#features" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium bg-white text-[#855933] border border-[#ebe9e2] rounded-full hover:bg-[#f5f4f1] transition-colors shadow-sm">
              Explore features
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 bg-white relative z-10 border-t border-[#ebe9e2]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2d2a26] mb-6">Everything you need, nothing you don't.</h2>
              <p className="text-[#a26e38] text-lg max-w-2xl mx-auto">A suite of powerful tools designed specifically for the modern couple.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-10 rounded-[2rem] bg-[#fcfaf5] border border-[#ebe9e2] hover:shadow-xl transition-shadow group">
                <div className="w-14 h-14 bg-[#f7f3e8] text-[#cea360] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Calculator className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-[#2d2a26]">Smart Budgets</h3>
                <p className="text-[#855933] leading-relaxed">Keep your finances elegant. Track estimated vs actual costs, manage vendor payments, and visualize your spending instantly.</p>
              </div>
              
              {/* Feature 2 */}
              <div className="p-10 rounded-[2rem] bg-[#fdf5f6] border border-[#fae8eb] hover:shadow-xl transition-shadow group">
                <div className="w-14 h-14 bg-white text-[#d6617c] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-[#2d2a26]">Guest Experience</h3>
                <p className="text-[#855933] leading-relaxed">Effortlessly manage your guest list, track RSVPs, dietary requirements, and organize complex seating arrangements visually.</p>
              </div>
              
              {/* Feature 3 */}
              <div className="p-10 rounded-[2rem] bg-[#f5f4f1] border border-[#ebe9e2] hover:shadow-xl transition-shadow group">
                <div className="w-14 h-14 bg-white text-[#2d2a26] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                  <Calendar className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-[#2d2a26]">Flawless Timelines</h3>
                <p className="text-[#855933] leading-relaxed">Stay perfectly on schedule with Kanban boards, automated reminders, and a comprehensive wedding day itinerary.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-12 bg-[#2d2a26] text-[#b1a796] text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Heart className="w-5 h-5 text-[#cea360] fill-current" />
          <span className="font-serif font-bold text-xl text-white">WeddingOS</span>
        </div>
        <p>© {new Date().getFullYear()} WeddingOS. All rights reserved.</p>
      </footer>
    </div>
  )
}
