"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Activity } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
          AI Insights <BarChart3 className="text-gold-500 w-6 h-6" />
        </h1>
        <p className="text-gray-400 mt-1">
          Predictive analytics and performance metrics for your sales pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><TrendingUp size={20} /></div>
            <h3 className="text-gray-300 font-medium">Conversion Probability</h3>
          </div>
          <p className="text-3xl font-bold text-white mt-4">24%</p>
          <p className="text-sm text-emerald-400 mt-1">+2.4% from last month</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Users size={20} /></div>
            <h3 className="text-gray-300 font-medium">Avg Response Time</h3>
          </div>
          <p className="text-3xl font-bold text-white mt-4">12 hrs</p>
          <p className="text-sm text-gray-500 mt-1">Industry avg: 48 hrs</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gold-500/10 rounded-lg text-gold-400"><Activity size={20} /></div>
            <h3 className="text-gray-300 font-medium">AI Action Score</h3>
          </div>
          <p className="text-3xl font-bold text-white mt-4">High</p>
          <p className="text-sm text-gray-500 mt-1">Optimal time to send follow-ups</p>
        </motion.div>
      </div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass rounded-2xl h-96 flex items-center justify-center border-dashed border border-white/10">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h2 className="text-lg text-gray-300">Detailed reporting module integrating...</h2>
          <p className="text-sm text-gray-500 mt-2">Charts will appear here once adequate pipeline data is collected.</p>
        </div>
      </motion.div>
    </div>
  );
}
