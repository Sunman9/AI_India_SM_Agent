"use client";

import { Users, Send, Target, TrendingUp, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
  { title: "Total Leads", value: "1,248", change: "+12%", icon: Users },
  { title: "Active Pipelines", value: "42", change: "+5%", icon: Target },
  { title: "Outreach Sent", value: "856", change: "+18%", icon: Send },
  { title: "Conversion Rate", value: "4.2%", change: "+1.2%", icon: TrendingUp },
];

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
        <p className="text-gray-400 mt-1">Track your market entry progress and lead conversions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-2xl hover:glass-gold transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                  <Icon size={20} className="text-gray-400 group-hover:text-gold-400 transition-colors" />
                </div>
                <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium bg-emerald-400/10 px-2 py-1 rounded-md">
                  <ArrowUpRight size={14} />
                  {metric.change}
                </div>
              </div>
              <h3 className="text-gray-400 font-medium">{metric.title}</h3>
              <p className="text-3xl font-bold text-white mt-1 group-hover:text-gradient-gold transition-all">{metric.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="col-span-2 glass rounded-2xl p-6 h-96"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Conversion Funnel</h2>
            <button className="text-sm text-gold-500 hover:text-gold-400">View Report</button>
          </div>
          <div className="flex h-64 items-center justify-center border border-white/5 rounded-xl border-dashed">
            <p className="text-gray-500">Chart Visualization Placeholder</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6 h-96 overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                <div className="w-2 h-2 mt-2 rounded-full bg-gold-400"></div>
                <div>
                  <p className="text-sm text-white font-medium">Outreach sent to Reliance Retail</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
