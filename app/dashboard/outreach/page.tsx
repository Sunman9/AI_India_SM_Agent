"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, MessageCircle, Copy, Send, CheckCircle2 } from "lucide-react";

export default function OutreachPage() {
  const [distributorName, setDistributorName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [emailCopy, setEmailCopy] = useState("");
  const [linkedinCopy, setLinkedinCopy] = useState("");
  const [copiedStates, setCopiedStates] = useState({ email: false, linkedin: false });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!distributorName) return;
    
    setIsGenerating(true);
    
    try {
      const response = await fetch("/api/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ distributorName, brandDescription }),
      });
      if (!response.ok) throw new Error("Server returned an error");
      const data = await response.json();
      setEmailCopy(data.email);
      setLinkedinCopy(data.linkedin);
      setCopiedStates({ email: false, linkedin: false });
    } catch (error) {
      console.log("Outreach fetch error:", error);
      alert("Failed to generate outreach copy. If you have an adblocker active, it might be blocking the request to the local API.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (type: "email" | "linkedin", text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
          AI Outreach Generator <Sparkles className="text-gold-500 w-6 h-6" />
        </h1>
        <p className="text-gray-400 mt-1">
          Generate hyper-personalized cold outreach copy for email and LinkedIn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 glass rounded-2xl p-6 h-fit"
        >
          <h2 className="text-lg font-bold text-white mb-6">Target Parameters</h2>
          <form onSubmit={handleGenerate} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium ml-1">Target Distributor</label>
              <input
                type="text"
                value={distributorName}
                onChange={(e) => setDistributorName(e.target.value)}
                placeholder="e.g. Apex Retail Solutions"
                className="w-full bg-black-800/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-gold-500/50 transition-colors"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium ml-1">Brand Pitch / Context (Optional)</label>
              <textarea
                value={brandDescription}
                onChange={(e) => setBrandDescription(e.target.value)}
                placeholder="Mention key stats, margins, or your unique selling proposition..."
                className="w-full h-32 bg-black-800/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black-900 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-70 text-sm mt-4"
            >
              {isGenerating ? (
                <span className="animate-pulse">Writing Copy...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Generate Copy
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Output Panel */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {emailCopy ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Email Output */}
                <div className="glass rounded-2xl p-6 relative group border-t-4 border-t-blue-500/50">
                  <div className="flex items-center gap-2 text-blue-400 font-medium mb-4">
                    <Mail className="w-5 h-5" /> Email Draft
                  </div>
                  <div className="bg-black-900/50 rounded-xl p-5 border border-white/5 whitespace-pre-wrap text-sm text-gray-300 leading-relaxed min-h-[150px]">
                    {emailCopy}
                  </div>
                  <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleCopy("email", emailCopy)}
                      className="p-2 bg-black-800 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-white"
                      title="Copy"
                    >
                      {copiedStates.email ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-black-900 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors">
                      <Send className="w-3 h-3" /> Execute Send
                    </button>
                  </div>
                </div>

                {/* LinkedIn Output */}
                <div className="glass rounded-2xl p-6 relative group border-t-4 border-t-blue-600/50">
                  <div className="flex items-center gap-2 text-blue-500 font-medium mb-4">
                    <MessageCircle className="w-5 h-5" /> LinkedIn Message
                  </div>
                  <div className="bg-black-900/50 rounded-xl p-5 border border-white/5 whitespace-pre-wrap text-sm text-gray-300 leading-relaxed min-h-[100px]">
                    {linkedinCopy}
                  </div>
                  <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleCopy("linkedin", linkedinCopy)}
                      className="p-2 bg-black-800 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-white"
                      title="Copy"
                    >
                      {copiedStates.linkedin ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-500 transition-colors">
                      <MessageCircle className="w-3 h-3" /> Connect Match
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-2xl h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 border-dashed border border-white/10"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Awaiting Parameters</h3>
                <p className="text-gray-400 text-sm max-w-md">
                  Enter your target distributor details in the left panel to generate highly personalized, context-aware outreach messaging.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
