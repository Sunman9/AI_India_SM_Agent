"use client";

import { motion } from "framer-motion";
import { Settings, User, Building, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
          Settings <Settings className="text-gray-400 w-6 h-6" />
        </h1>
        <p className="text-gray-400 mt-1">
          Manage your account preferences and integration settings.
        </p>
      </div>

      <div className="glass rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 border-r border-white/5 bg-black-800/30 p-4 space-y-1">
          {[
            { name: "Profile", icon: User, active: true },
            { name: "Organization", icon: Building, active: false },
            { name: "Notifications", icon: Bell, active: false },
            { name: "Security", icon: Shield, active: false }
          ].map((item) => (
            <button key={item.name} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${item.active ? 'bg-gold-500/10 text-gold-400 font-medium border border-gold-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
              <item.icon size={18} /> {item.name}
            </button>
          ))}
        </div>
        
        {/* Content */}
        <div className="flex-1 p-8">
          <h2 className="text-xl font-bold text-white mb-6">Profile Settings</h2>
          
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-black-800 border-2 border-gold-500/50 flex items-center justify-center text-2xl text-gold-400 font-bold">
                S
              </div>
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm border border-white/10 transition-colors">
                Change Avatar
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400">First Name</label>
                <input type="text" defaultValue="Sunmang" className="w-full bg-black-800/50 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:border-gold-500/50 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400">Last Name</label>
                <input type="text" defaultValue="Admin" className="w-full bg-black-800/50 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:border-gold-500/50 outline-none" />
              </div>
              <div className="space-y-1.5 col-span-2">
                <label className="text-xs text-gray-400">Email Address</label>
                <input type="email" defaultValue="sunmang@agentai.com" className="w-full bg-black-800/50 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:border-gold-500/50 outline-none" />
              </div>
            </div>
            
            <div className="pt-6 border-t border-white/5 flex justify-end">
              <button className="px-6 py-2 bg-gradient-to-r from-gold-500 to-gold-600 text-black-900 font-bold rounded-lg text-sm hover:from-gold-400 hover:to-gold-500 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
