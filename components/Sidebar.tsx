"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Send, Kanban, BarChart, Settings } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Discovery", href: "/dashboard/discovery", icon: Users },
  { name: "Outreach", href: "/dashboard/outreach", icon: Send },
  { name: "Pipeline", href: "/dashboard/pipeline", icon: Kanban },
  { name: "Insights", href: "/dashboard/insights", icon: BarChart },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 glass border-r border-white/5 flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
          <span className="text-black-900 font-bold text-lg">A</span>
        </div>
        <span className="text-xl font-bold tracking-wide text-gradient-gold">AGENT.AI</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href} className="block relative">
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-gold-500/10 border border-gold-500/30 rounded-lg -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? "text-gold-400" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={20} className={isActive ? "text-gold-400" : "text-gray-400"} />
                <span className="font-medium text-sm">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg glass-gold text-sm cursor-pointer hover:bg-white/5 transition-colors">
          <div className="w-8 h-8 rounded-full bg-black-800 border border-gold-500/50 flex items-center justify-center text-gold-400 font-bold">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-white">Sunmang</span>
            <span className="text-xs text-gold-500">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
