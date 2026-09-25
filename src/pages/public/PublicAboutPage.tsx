import React from 'react';
import { Globe2, ShieldCheck, Cpu, Database, MapPin, CheckCircle2, Users, FileText, Lock } from 'lucide-react';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const PublicAboutPage: React.FC = () => {
  return (
    <div className="space-y-8 select-none">
      {/* Header Banner */}
      <div className="bg-[#123B63] text-white p-8 rounded-xl border border-[#1D5D91] shadow-lg space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#1D5D91] text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
          <Globe2 className="w-4 h-4 text-[#C98A18]" />
          <span>National Decision Support & Evidence Ecosystem</span>
        </div>

        <h1 className="text-3xl font-serif font-bold text-white">
          About BhoomiDrishti
        </h1>

        <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl">
          BhoomiDrishti is India's National Land Governance Research & Decision Intelligence Platform developed under Smart India Hackathon (Problem Statement SIH 26019). It connects government authorities, academic researchers, institutions, data officers, and citizens through a transparent, evidence-based spatial framework.
        </p>
      </div>

      {/* Core Platform Vision & Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-[#123B63] flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-[#1D5D91]" />
            <span>Why BhoomiDrishti Exists & What Problem It Solves</span>
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Historical land governance in India suffered from fragmented data silos—revenue text titles (RoR 7/12) were decoupled from satellite spatial vectors, academic research remained trapped in PDFs, and climate risks were rarely evaluated during industrial land conversions. BhoomiDrishti solves this by establishing a single, unified national evidence-to-policy ecosystem.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-[#123B63] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2E6B45]" />
            <span>Decision Support — Not Autonomous Decision Making</span>
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            BhoomiDrishti operates strictly as an <strong>evidence-based decision-support platform</strong> for authorized human planners and revenue officers. It does NOT automatically make statutory government decisions, grant land titles, or replace constitutional judicial processes.
          </p>
        </div>
      </div>

      {/* Who Can Use BhoomiDrishti */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-[#123B63] border-b border-slate-100 pb-2">
          Who Can Use BhoomiDrishti & Portal Architecture
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded bg-blue-100 text-[#1D5D91] flex items-center justify-center font-bold">1</div>
            <h4 className="font-bold text-[#123B63]">General Citizens & Public</h4>
            <p className="text-slate-600 text-[11px]">Read-only access to approved public GIS maps, statistics, research papers, and open data catalogues without login.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded bg-amber-100 text-amber-900 flex items-center justify-center font-bold">2</div>
            <h4 className="font-bold text-[#123B63]">Policy & Planning Officers</h4>
            <p className="text-slate-600 text-[11px]">District, State, and National planners evaluating policy simulations, candidate site searches, and risk heatmaps.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">3</div>
            <h4 className="font-bold text-[#123B63]">Academic Researchers</h4>
            <p className="text-slate-600 text-[11px]">Publish peer-reviewed spatial research papers, link empirical datasets, and run RAG search queries.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded bg-purple-100 text-purple-900 flex items-center justify-center font-bold">4</div>
            <h4 className="font-bold text-[#123B63]">Data & GIS Officers</h4>
            <p className="text-slate-600 text-[11px]">Manage spatial vector layers, validate data conflicts, and maintain GIS topological correctness.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded bg-[#123B63] text-white flex items-center justify-center font-bold">5</div>
            <h4 className="font-bold text-[#123B63]">Institutional Bodies</h4>
            <p className="text-slate-600 text-[11px]">Universities, research centers, and government departments managing team portfolios and publications.</p>
          </div>
        </div>
      </div>

      {/* How Sourced, GIS, AI, Privacy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-[#123B63] flex items-center gap-2">
            <Database className="w-5 h-5 text-[#C98A18]" />
            <span>How Data is Sourced & GIS Layer Integration</span>
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Spatial vector boundaries and climate grids are ingested asynchronously from verified public sources: <strong>India Meteorological Department (IMD)</strong> for weather grids, <strong>NRSC Bhuvan</strong> for LULC vectors, <strong>Survey of India</strong> for district boundaries, and <strong>Open Government Data (OGDL India)</strong> catalogues. MapLibre GL JS renders vector overlays dynamically.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-[#123B63] flex items-center gap-2">
            <Lock className="w-5 h-5 text-red-700" />
            <span>Privacy Protection & Restricted Data Exclusion</span>
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            The Public Information Portal enforces strict privacy filtering. Individual citizen titles, owner names, phone numbers, private land records, confidential inter-departmental budget notes, and internal audit logs are strictly prevented from appearing in public API responses.
          </p>
        </div>
      </div>
    </div>
  );
};
