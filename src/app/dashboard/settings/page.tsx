"use client"

import { useState } from "react"
import { Save, Bot, Sparkles, Key, CheckCircle2 } from "lucide-react"

export default function SettingsPage() {
  const [openaiKey, setOpenaiKey] = useState("")
  const [geminiKey, setGeminiKey] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Mock save delay to database
    setTimeout(() => {
      setIsSaving(false)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    }, 1000)
  }

  return (
    <div className="max-w-4xl animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-[#2d2a26] mb-2">Platform Settings</h1>
        <p className="text-[#a26e38]">Configure your WeddingOS experience and external integrations.</p>
      </div>

      <div className="space-y-8">
        
        {/* AI Integrations Section */}
        <section className="bg-white rounded-3xl border border-[#ebe9e2] overflow-hidden shadow-sm">
          <div className="px-8 py-6 border-b border-[#ebe9e2] bg-[#fdfbf7] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#f7f3e8] text-[#cea360] rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold text-[#2d2a26]">AI Assistant Integrations</h2>
                <p className="text-sm text-[#855933]">Connect your API keys to unlock intelligent features.</p>
              </div>
            </div>
          </div>
          
          <div className="p-8 space-y-8">
            {/* OpenAI Setting */}
            <div className="flex flex-col md:flex-row gap-6 md:items-start">
              <div className="md:w-1/3">
                <h3 className="font-semibold text-[#2d2a26] flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#cea360]" /> OpenAI
                </h3>
                <p className="text-sm text-[#b1a796]">Used for generating vows, drafting emails, and deep brainstorming.</p>
              </div>
              <div className="md:w-2/3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Key className="h-4 w-4 text-[#c5beb1]" />
                  </div>
                  <input
                    type="password"
                    value={openaiKey}
                    onChange={(e) => setOpenaiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full pl-11 pr-4 py-3 bg-[#fcfaf5] border border-[#ebe9e2] rounded-xl text-[#2d2a26] placeholder-[#c5beb1] focus:outline-none focus:ring-2 focus:ring-[#cea360] focus:border-transparent transition-all"
                  />
                </div>
                <p className="mt-2 text-xs text-[#a26e38]">Your key is encrypted and stored securely.</p>
              </div>
            </div>

            <div className="w-full h-px bg-[#f5f4f1]" />

            {/* Gemini Setting */}
            <div className="flex flex-col md:flex-row gap-6 md:items-start">
              <div className="md:w-1/3">
                <h3 className="font-semibold text-[#2d2a26] flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#d6617c]" /> Google Gemini
                </h3>
                <p className="text-sm text-[#b1a796]">Used for budget optimization, timeline generation, and logic processing.</p>
              </div>
              <div className="md:w-2/3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Key className="h-4 w-4 text-[#c5beb1]" />
                  </div>
                  <input
                    type="password"
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full pl-11 pr-4 py-3 bg-[#fcfaf5] border border-[#ebe9e2] rounded-xl text-[#2d2a26] placeholder-[#c5beb1] focus:outline-none focus:ring-2 focus:ring-[#cea360] focus:border-transparent transition-all"
                  />
                </div>
                <p className="mt-2 text-xs text-[#a26e38]">Your key is encrypted and stored securely.</p>
              </div>
            </div>
          </div>
          
          <div className="px-8 py-5 border-t border-[#ebe9e2] bg-[#fdfbf7] flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all ${
                isSaved 
                  ? "bg-[#e8f5e9] text-[#2e7d32]" 
                  : "bg-[#2d2a26] text-white hover:bg-[#1a1816] shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
              }`}
            >
              {isSaving ? (
                <>Saving...</>
              ) : isSaved ? (
                <><CheckCircle2 className="w-4 h-4" /> Saved Successfully</>
              ) : (
                <><Save className="w-4 h-4" /> Save Configuration</>
              )}
            </button>
          </div>
        </section>
        
      </div>
    </div>
  )
}
