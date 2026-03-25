"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal, Plus, Calendar, MessageSquare, AlertCircle } from "lucide-react";

type Stage = "IDENTIFIED" | "CONTACTED" | "RESPONDED" | "NEGOTIATION" | "CLOSED";

interface Lead {
  id: string;
  name: string;
  company: string;
  stage: Stage;
  score: number;
}

const initialLeads: Lead[] = [
  { id: "1", name: "Apex Retail Solutions", company: "Apex India Pvt Ltd", stage: "IDENTIFIED", score: 94 },
  { id: "2", name: "Nexus Supply Co", company: "Nexus Brands", stage: "CONTACTED", score: 81 },
  { id: "3", name: "Global Trade Partners", company: "GTP Distribution", stage: "RESPONDED", score: 88 },
  { id: "4", name: "Prime Electronics", company: "Prime Group", stage: "NEGOTIATION", score: 92 },
  { id: "5", name: "Reliance Retail", company: "RRL", stage: "CLOSED", score: 98 },
  { id: "6", name: "Future Group", company: "FRL", stage: "IDENTIFIED", score: 75 },
];

const STAGES: { id: Stage; label: string; color: string }[] = [
  { id: "IDENTIFIED", label: "Lead Identified", color: "bg-gray-500" },
  { id: "CONTACTED", label: "Contacted", color: "bg-blue-500" },
  { id: "RESPONDED", label: "Responded", color: "bg-purple-500" },
  { id: "NEGOTIATION", label: "Negotiation", color: "bg-orange-500" },
  { id: "CLOSED", label: "Closed", color: "bg-emerald-500" },
];

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [draggedLead, setDraggedLead] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("pipelineLeads");
    if (saved) {
      setLeads(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("pipelineLeads", JSON.stringify(leads));
    }
  }, [leads, isLoaded]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedLead(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, stage: Stage) => {
    e.preventDefault();
    if (draggedLead) {
      setLeads((prev) =>
        prev.map((lead) => (lead.id === draggedLead ? { ...lead, stage } : lead))
      );
      setDraggedLead(null);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Sales Pipeline</h1>
          <p className="text-gray-400 mt-1">Manage distributor relationships and track conversions.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black-900 font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          <Plus className="w-4 h-4" /> Add Lead
        </button>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage.id);
          return (
            <div
              key={stage.id}
              className="flex-shrink-0 w-80 glass rounded-2xl flex flex-col h-full border border-white/5"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black-800/30 rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${stage.color}`}></div>
                  <h3 className="font-bold text-white tracking-wide text-sm">{stage.label}</h3>
                  <span className="bg-white/10 text-gray-300 text-xs px-2 py-0.5 rounded-full ml-1">
                    {stageLeads.length}
                  </span>
                </div>
                <button className="text-gray-500 hover:text-white transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 p-3 overflow-y-auto space-y-3">
                {stageLeads.map((lead) => (
                  <motion.div
                    layoutId={lead.id}
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e as any, lead.id)}
                    className="bg-black-800/80 border border-white/10 rounded-xl p-4 cursor-grab active:cursor-grabbing hover:border-gold-500/30 hover:bg-black-700/80 transition-colors shadow-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-white text-sm">{lead.name}</h4>
                        <p className="text-xs text-gray-400">{lead.company}</p>
                      </div>
                      <div className={`text-xs font-bold px-1.5 py-0.5 rounded border ${lead.score >= 90 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gold-500/10 text-gold-400 border-gold-500/20'}`}>
                        {lead.score}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 pt-3 border-t border-white/5 text-gray-500">
                      <div className="flex items-center gap-1 text-xs hover:text-white transition-colors cursor-pointer">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>3</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs hover:text-white transition-colors cursor-pointer">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>2d</span>
                      </div>
                      <div className="flex-1 flex justify-end">
                        {stage.id === "RESPONDED" && (
                          <AlertCircle className="w-4 h-4 text-orange-400" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
