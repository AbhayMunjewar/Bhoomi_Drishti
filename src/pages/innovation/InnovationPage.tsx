import React from 'react';
import { Sparkles, Trophy, Award, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';

export const InnovationPage: React.FC = () => {
  return (
    <div className="space-y-6 select-none text-xs">
      
      {/* Header */}
      <div className="bg-white p-4 rounded-md border border-[#D9DEE5] shadow-2xs flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C98A18] bg-[#C98A18]/10 px-2 py-0.5 rounded">
            National Innovation & Research Pilot Portal
          </span>
          <h2 className="text-xl font-bold text-[#123B63] font-serif mt-1">
            Hackathons, Research Grants & Pilot Projects
          </h2>
          <p className="text-xs text-[#5B6573]">
            Collaborative research grants, AI challenge submissions, and pilot project funding for academic institutions
          </p>
        </div>

        <span className="govt-badge bg-[#2E6B45]/10 text-[#2E6B45] border border-[#2E6B45]/30">
          Smart India Hackathon 2026 Open
        </span>
      </div>

      {/* Innovation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white p-5 rounded-lg border border-[#D9DEE5] shadow-xs space-y-3">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="font-bold text-[#123B63] text-xs uppercase">National Challenge</span>
            <span className="govt-badge bg-[#C98A18]/10 text-[#C98A18]">SIH 2026</span>
          </div>
          <h3 className="font-bold text-sm text-[#123B63]">Smart India Hackathon 2026 — PS SIH 26019</h3>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            National Digital Platform for Research, Policy Innovation, and Evidence-Based Land Governance. Connecting satellite remote sensing with revenue records and policy simulation.
          </p>
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
            <span className="text-slate-500 font-mono text-[10px]">Ministry: MoHUA / NITI Aayog</span>
            <span className="font-bold text-[#2E6B45]">Active Submissions Open</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-[#D9DEE5] shadow-xs space-y-3">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="font-bold text-[#123B63] text-xs uppercase">Research Grant</span>
            <span className="govt-badge bg-[#1D5D91]/10 text-[#1D5D91]">Grant Pool ₹5.0 Cr</span>
          </div>
          <h3 className="font-bold text-sm text-[#123B63]">AI Cadastral Boundary Harmonization Grant (2026)</h3>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            Research grant for academic institutions to develop AI vector edge detection algorithms for matching 7/12 land revenue records with WorldView-3 high-resolution satellite imagery.
          </p>
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
            <span className="text-slate-500 font-mono text-[10px]">Target Institutions: IITs / NITs / VJTI</span>
            <span className="font-bold text-[#1D5D91]">Applications Open</span>
          </div>
        </div>

      </div>

    </div>
  );
};
