import React from 'react';
import { Users, FolderKanban, FileSpreadsheet, MapPin, MessageSquare, CheckCircle2, Plus } from 'lucide-react';

export const WorkspacePage: React.FC = () => {
  return (
    <div className="space-y-6 select-none text-xs">
      
      {/* Header */}
      <div className="bg-white p-4 rounded-md border border-[#D9DEE5] shadow-2xs flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D5D91] bg-[#1D5D91]/10 px-2 py-0.5 rounded">
            Multi-Disciplinary Collaboration Workspace
          </span>
          <h2 className="text-xl font-bold text-[#123B63] font-serif mt-1">
            IIT Nagpur Site Suitability Study Team Workspace
          </h2>
          <p className="text-xs text-[#5B6573]">
            Shared workspace connecting Policy Officers, Data GIS Officers, Researchers, and Institutions
          </p>
        </div>

        <button className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-3.5 py-1.5 rounded font-bold text-xs shadow-2xs flex items-center space-x-1 transition-colors">
          <Plus className="w-4 h-4 text-[#C98A18]" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Team Members & Project Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white p-4 rounded-lg border border-[#D9DEE5] shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Active Workspace Members</span>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-[#123B63]">Smt. Ananya Deshmukh</span>
              <span className="text-[10px] text-slate-500 font-mono">Policy Officer</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-[#123B63]">Shri Manoj Deshmukh</span>
              <span className="text-[10px] text-slate-500 font-mono">Data & GIS Officer</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-[#123B63]">Dr. Vikramaditya Joshi</span>
              <span className="text-[10px] text-slate-500 font-mono">Lead Researcher (VJTI)</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#D9DEE5] shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Shared Assets & Datasets</span>
          <div className="space-y-1 text-[11px]">
            <p className="font-bold text-[#1D5D91]">Nagpur_Candidate_Parcels_v2.geojson</p>
            <p className="font-bold text-[#1D5D91]">IMD_Rainfall_Departure_Nagpur_2026.csv</p>
            <p className="font-bold text-[#1D5D91]">VJTI_Drainage_Impact_Study_2025.pdf</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#D9DEE5] shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Study Progress</span>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-bold text-[#2E6B45]">
              <span>Site Candidate Analysis:</span>
              <span>85% Completed</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="bg-[#2E6B45] h-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
