import React from 'react';
import { Shield, ExternalLink, Globe } from 'lucide-react';

export const GovtFooter: React.FC = () => {
  return (
    <footer className="bg-[#123B63] text-white border-t-4 border-[#C98A18] text-xs pt-8 pb-6 select-none">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1: Institutional Info */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded bg-[#1D5D91] flex items-center justify-center font-bold text-white">
              BD
            </div>
            <span className="font-bold text-sm tracking-wide text-white">BhoomiDristi</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            National Land Governance Research & Decision Intelligence Platform. Connecting land data, satellite GIS, research evidence, and policy simulation for evidence-based governance.
          </p>
          <div className="bg-[#1D5D91]/40 border border-[#1D5D91] rounded px-2.5 py-1 text-[10px] text-slate-200 inline-block font-mono">
            SIH 2026 Prototype &bull; PS ID: SIH 26019
          </div>
        </div>

        {/* Col 2: Government Links */}
        <div className="space-y-2">
          <p className="font-bold text-slate-100 uppercase tracking-wider text-[11px] border-b border-[#1D5D91] pb-1">
            Government Portals
          </p>
          <ul className="space-y-1.5 text-slate-300 text-[11px]">
            <li><a href="/government/district" className="hover:text-white hover:underline">District Officer Dashboard</a></li>
            <li><a href="/government/policy" className="hover:text-white hover:underline">Policy Maker Simulator</a></li>
            <li><a href="/government/state" className="hover:text-white hover:underline">State Revenue Authority</a></li>
            <li><a href="/government/risk" className="hover:text-white hover:underline">AI Land Risk Analysis</a></li>
            <li><a href="/government/audit" className="hover:text-white hover:underline">Audit Trail & Compliance</a></li>
          </ul>
        </div>

        {/* Col 3: Research & Knowledge */}
        <div className="space-y-2">
          <p className="font-bold text-slate-100 uppercase tracking-wider text-[11px] border-b border-[#1D5D91] pb-1">
            Research & Open GIS
          </p>
          <ul className="space-y-1.5 text-slate-300 text-[11px]">
            <li><a href="/research/search" className="hover:text-white hover:underline">AI Semantic Research Search</a></li>
            <li><a href="/research/map" className="hover:text-white hover:underline">Research GIS Distribution Map</a></li>
            <li><a href="/institution" className="hover:text-white hover:underline">Institution & University Portal</a></li>
            <li><a href="/public/map" className="hover:text-white hover:underline">Public Open Data Map</a></li>
            <li><a href="/public/reports" className="hover:text-white hover:underline">Public Knowledge Reports</a></li>
          </ul>
        </div>

        {/* Col 4: Important Notice & Disclaimer */}
        <div className="space-y-2">
          <p className="font-bold text-slate-100 uppercase tracking-wider text-[11px] border-b border-[#1D5D91] pb-1">
            Governance Notice
          </p>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            This platform is an academic demonstration developed for Smart India Hackathon 2026. All data layers displayed are illustrative demo samples or derived from open research datasets.
          </p>
          <div className="pt-2 text-[10px] text-[#C98A18] font-semibold">
            &copy; 2026 BhoomiDristi SIH Team. All Rights Reserved.
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6 pt-4 border-t border-slate-700/60 flex flex-wrap justify-between items-center text-[10px] text-slate-400">
        <div>
          Website Content Managed by BhoomiDristi Research & Governance Team.
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white">Accessibility Statement</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Use</a>
          <a href="#" className="hover:text-white">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};
