"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Tag, Building2, Sparkles, Filter, MoreHorizontal, ArrowRight } from "lucide-react";

export default function DiscoveryPage() {
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState("");
  const [cities, setCities] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName || !category || !cities) return;
    
    setIsSearching(true);
    
    try {
      const response = await fetch("/api/find-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandName, category, cities: cities.split(",").map(c => c.trim()) }),
      });
      if (!response.ok) throw new Error("Server returned an error");
      const data = await response.json();
      setResults(data.distributors);
    } catch (error) {
      console.log("Discovery fetch error:", error);
      alert("Failed to connect to the AI Agent. If you are using an adblocker, please disable it for localhost as it might block these requests.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
          AI Distributor Discovery <Sparkles className="text-gold-500 w-6 h-6" />
        </h1>
        <p className="text-gray-400 mt-1">
          Let our agent analyze your brand profile and identify the best distribution partners in India.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 border-l-4 border-l-gold-500"
      >
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-medium ml-1">Brand Name</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Acme Cosmetics"
                className="w-full bg-black-800/50 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-gold-500/50 transition-colors"
                required
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-medium ml-1">Category</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Beauty & Personal Care"
                className="w-full bg-black-800/50 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-gold-500/50 transition-colors"
                required
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-medium ml-1">Target Cities</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                value={cities}
                onChange={(e) => setCities(e.target.value)}
                placeholder="Mumbai, Delhi, Pune"
                className="w-full bg-black-800/50 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-gold-500/50 transition-colors"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="w-full py-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black-900 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-70 text-sm h-[38px]"
          >
            {isSearching ? (
              <span className="animate-pulse">Analyzing Market...</span>
            ) : (
              <>
                <Search className="w-4 h-4" /> Generate Leads
              </>
            )}
          </button>
        </form>
      </motion.div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black-800/30">
              <h2 className="text-lg font-bold text-white tracking-wide">Discovery Results</h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-sm text-gray-300 hover:bg-white/5 transition-colors">
                  <Filter className="w-4 h-4" /> Filter
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/20 hover:bg-gold-500/20 transition-colors text-sm font-medium">
                  Add All to Pipeline
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead className="bg-black-900/50 text-xs uppercase text-gray-500 text-left border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4 font-medium">Distributor / Company</th>
                    <th className="px-6 py-4 font-medium">Location</th>
                    <th className="px-6 py-4 font-medium">Contact</th>
                    <th className="px-6 py-4 font-medium text-center">Relevance</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {results.map((distributor, idx) => (
                    <motion.tr 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={distributor.id} 
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gold-500 font-bold border border-white/10 group-hover:border-gold-500/30 transition-colors">
                            {distributor.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white group-hover:text-gold-400 transition-colors">{distributor.name}</p>
                            <p className="text-xs text-gray-500">{distributor.company}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-gray-300">
                          <MapPin className="w-3.5 h-3.5 text-gray-500" />
                          {distributor.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-300">{distributor.contactEmail}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{distributor.contactPhone}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center justify-center relative">
                          <svg className="w-10 h-10 transform -rotate-90">
                            <circle cx="20" cy="20" r="16" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                            <circle 
                              cx="20" cy="20" r="16" fill="transparent" 
                              stroke={distributor.relevanceScore >= 90 ? "#22c55e" : "#d4af37"} 
                              strokeWidth="3" 
                              strokeDasharray="100" 
                              strokeDashoffset={100 - distributor.relevanceScore} 
                              className="transition-all duration-1000 ease-out"
                            />
                          </svg>
                          <span className="absolute text-[10px] font-bold text-white">{Math.round(distributor.relevanceScore)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-gray-400 hover:text-white rounded-md hover:bg-white/10 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-white text-black-900 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors">
                            Add <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
