import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, CheckCircle2, MapPin, Calendar, TrendingUp, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { MOCK_PILOT_PROJECTS } from '../../data/mockInnovation';

export const AuthorityMonitoringPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
          <Link to="/authority/dashboard" className="hover:underline">Higher Authority</Link>
          <span>/</span>
          <span className="text-[#123B63] font-bold">Implementation Monitoring</span>
        </div>
        <h1 className="text-2xl font-black text-[#123B63] font-serif mt-1">Project Implementation Outcomes & Feedback Loop</h1>
        <p className="text-xs text-slate-600">
          Empirical comparison of predicted government planning targets vs. actual field outcomes, feeding lessons back into the research & evidence loop.
        </p>
      </div>

      {/* FEEDBACK LOOP CONCEPT BANNER */}
      <div className="bg-[#123B63] text-white p-4 rounded-xl shadow-md space-y-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Continuous Governance Feedback Cycle (SIH 26019 Core Loop)</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono pt-1">
          <span className="bg-[#1D5D91] px-2.5 py-1 rounded">Research Evidence</span>
          <span className="text-amber-400">→</span>
          <span className="bg-[#1D5D91] px-2.5 py-1 rounded">Policy Simulation</span>
          <span className="text-amber-400">→</span>
          <span className="bg-[#C98A18] text-white font-bold px-2.5 py-1 rounded">Implementation</span>
          <span className="text-amber-400">→</span>
          <span className="bg-[#2E6B45] text-white font-bold px-2.5 py-1 rounded">Actual Outcome Monitoring</span>
          <span className="text-amber-400">→</span>
          <span className="bg-[#1D5D91] px-2.5 py-1 rounded">New Research Evidence</span>
        </div>
      </div>

      {/* PROJECT OUTCOMES TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <h2 className="font-bold text-base text-[#123B63]">Empirical Outcome Comparisons (Prediction vs. Reality)</h2>

        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-start border-b border-slate-200 pb-2">
              <div>
                <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                  PROJECT-NAGP-2026-01
                </span>
                <h3 className="font-bold text-[#123B63] text-sm mt-1">Nagpur Agricultural Belt Zoning Intervention</h3>
                <p className="text-xs text-slate-500">GIS Location: Nagpur Peri-Urban Sector • Timeline: 2025-2026</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                Completed & Evaluated
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3 rounded border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Baseline State (2024)</span>
                <div className="font-semibold text-slate-800 mt-1">14.2% Annual Prime Farm Conversion Rate</div>
              </div>
              <div className="bg-white p-3 rounded border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Predicted Target Outcome</span>
                <div className="font-bold text-slate-800 mt-1">&lt; 4.0% Conversion Rate</div>
              </div>
              <div className="bg-white p-3 rounded border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Actual Empirical Outcome</span>
                <div className="font-bold text-emerald-700 mt-1">3.2% Observed Conversion Rate</div>
              </div>
              <div className="bg-white p-3 rounded border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Geospatial Evidence</span>
                <div className="font-semibold text-[#1D5D91] mt-1">Sentinel-2 LULC Vector Verified</div>
              </div>
            </div>

            <div className="text-xs text-slate-700 bg-emerald-50/60 p-3 rounded border border-emerald-200">
              <strong>Evidence Feedback Loop Result:</strong> Empirical data confirms that strict buffer zoning reduced fertile land diversion by 77.4% over baseline, validating the 2025 IIT Bombay policy simulation model.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
