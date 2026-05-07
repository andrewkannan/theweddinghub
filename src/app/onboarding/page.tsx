"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"

export default function Onboarding() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  
  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }
  
  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleComplete = async () => {
    setLoading(true)
    // Mock save delay
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#f6d2d9] opacity-30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#efe5ce] opacity-40 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        <div className="flex justify-center mb-10">
          <div className="w-12 h-12 bg-[#cea360] rounded-2xl flex items-center justify-center shadow-lg shadow-[#cea360]/20">
            <Heart className="w-6 h-6 text-white fill-current" />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-[#ebe9e2] rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-[#855933]/5">
          
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#f5f4f1] rounded-full -z-10" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#cea360] rounded-full -z-10 transition-all duration-500 ease-out" 
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
            
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  step >= i 
                    ? "bg-[#cea360] text-white shadow-md shadow-[#cea360]/30 scale-110" 
                    : "bg-white text-[#b1a796] border border-[#ebe9e2]"
                }`}
              >
                {step > i ? <CheckCircle2 className="w-5 h-5" /> : i}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="min-h-[300px]">
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-serif font-bold text-[#2d2a26] mb-2">Let's start with the basics</h2>
                <p className="text-[#a26e38] mb-8">What should we call your beautiful project?</p>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#6c492b] mb-2">Wedding Project Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. The Smith Wedding" 
                      className="w-full px-5 py-4 rounded-2xl bg-[#fcfaf5] border border-[#e4d1aa] text-[#2d2a26] focus:outline-none focus:ring-2 focus:ring-[#cea360] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-serif font-bold text-[#2d2a26] mb-2">When and Where?</h2>
                <p className="text-[#a26e38] mb-8">It's okay if you don't have exact details yet.</p>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#6c492b] mb-2">Estimated Date</label>
                    <input 
                      type="date" 
                      className="w-full px-5 py-4 rounded-2xl bg-[#fcfaf5] border border-[#e4d1aa] text-[#2d2a26] focus:outline-none focus:ring-2 focus:ring-[#cea360] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6c492b] mb-2">Location/City</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Tuscany, Italy" 
                      className="w-full px-5 py-4 rounded-2xl bg-[#fcfaf5] border border-[#e4d1aa] text-[#2d2a26] focus:outline-none focus:ring-2 focus:ring-[#cea360] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-serif font-bold text-[#2d2a26] mb-2">Financial Planning</h2>
                <p className="text-[#a26e38] mb-8">What is your estimated total budget?</p>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#6c492b] mb-2">Total Budget Estimate (USD)</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#a26e38] font-medium">$</span>
                      <input 
                        type="number" 
                        placeholder="30,000" 
                        className="w-full pl-10 pr-5 py-4 rounded-2xl bg-[#fcfaf5] border border-[#e4d1aa] text-[#2d2a26] focus:outline-none focus:ring-2 focus:ring-[#cea360] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-10 pt-8 border-t border-[#ebe9e2]">
            <button 
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                step === 1 ? "text-transparent cursor-default" : "text-[#855933] hover:text-[#2d2a26]"
              }`}
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
            
            {step < 3 ? (
              <button 
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3.5 bg-[#cea360] text-white rounded-full font-medium hover:bg-[#c28b46] transition-all shadow-[0_4px_15px_rgba(206,163,96,0.3)] hover:-translate-y-0.5"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button 
                onClick={handleComplete}
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3.5 bg-[#2d2a26] text-white rounded-full font-medium hover:bg-[#1a1816] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70"
              >
                {loading ? "Preparing your workspace..." : "Let's Begin"}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
