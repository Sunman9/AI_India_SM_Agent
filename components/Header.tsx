"use client";

import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 w-full glass border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 bg-black-800/50 border border-white/10 rounded-full px-4 py-2 w-96 focus-within:border-gold-500/50 transition-colors">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search distributors, leads, or companies..." 
          className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-500"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gold-500 rounded-full animate-pulse blur-[1px]"></span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gold-400 rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
