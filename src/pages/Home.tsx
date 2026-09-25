import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  BookOpen,
  Search,
  Sliders,
  AlertTriangle,
  Globe,
  ArrowRight,
  ShieldCheck,
  Building,
  Users,
  CheckCircle2
} from 'lucide-react';
import { LandGovernanceMap } from '../components/maps/LandGovernanceMap';

export const Home: React.FC = () => {
  return (
    <div className="space-y-10 pb-12 select-none">
      
      {/* HERO BANNER matching user reference image layout */}
      <section className="relative bg-gradient-to-r from-[#123B63] via-[#1D5D91] to-[#2E6B45] text-white py-16 px-4 overflow-hidden border-b-4 border-[#C98A18]">
        {/* Background India Map Overlay effect */}
        <div className="absolute right-0 top-0 bottom-0 opacity-15 pointer-events-none flex items-center pr-12">
          <svg viewBox="0 0 500 500" className="w-[450px] h-[450px] fill-current text-white">
            <path d="M150 100 Q 250 50, 350 120 T 400 280 Q 320 400, 200 420 T 100 250 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center space-x-2 bg-black/30 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#C98A18] animate-pulse"></span>
              <span className="font-semibold text-slate-100">SIH 2026 Prototype &bull; PS SIH 26019</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-serif text-white">
              Bhoomi<span className="text-[#C98A18]">Dristi</span>
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-sans">
              Land Insights for a Sustainable India
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-light">
              A National Digital Platform for Research, Policy Innovation, and Evidence-Based Land Governance. Connecting land data, research, geospatial intelligence and policy analysis for a sustainable and inclusive India.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/government/district"
                className="bg-[#C98A18] hover:bg-[#A56A00] text-slate-950 font-bold px-6 py-3 rounded-md text-sm shadow-lg transition-colors flex items-center space-x-2"
              >
                <MapPin className="w-4 h-4" />
                <span>Explore GIS Map</span>
              </Link>
              <Link
                to="/public"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-md text-sm border border-white/30 backdrop-blur-xs transition-colors flex items-center space-x-2"
              >
                <span>Public Information Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Hero Side Card */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-white space-y-4 shadow-xl">
            <div className="border-b border-white/20 pb-3">
              <h3 className="font-bold text-base text-white">BhoomiDristi Platform Concept</h3>
              <p className="text-xs text-slate-200 mt-1">Multi-stakeholder decision support architecture</p>
            </div>
            
            <ul className="space-y-2.5 text-xs text-slate-200">
              <li className="flex items-center space-x-2.5">
                <span className="w-6 h-6 rounded-full bg-[#C98A18] text-slate-950 flex items-center justify-center font-bold text-xs">👁️</span>
                <span><strong>Eye:</strong> Insight, Vision & Spatial Intelligence</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="w-6 h-6 rounded-full bg-[#2E6B45] text-white flex items-center justify-center font-bold text-xs">🌿</span>
                <span><strong>Leaf:</strong> Sustainability & Eco-Resilience</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="w-6 h-6 rounded-full bg-[#1D5D91] text-white flex items-center justify-center font-bold text-xs">🏛️</span>
                <span><strong>Land:</strong> Governance & Policy Simulation</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="w-6 h-6 rounded-full bg-[#A56A00] text-white flex items-center justify-center font-bold text-xs">☀️</span>
                <span><strong>Sun:</strong> Growth & Prosperity for Citizens</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* PLATFORM CAPABILITIES CARDS matching image reference */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-[#123B63] font-serif">Platform Capabilities</h3>
          <p className="text-xs text-[#5B6573]">Connecting government, institutions, researchers, and public decision-makers</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link to="/government/district" className="govt-card p-4 rounded-lg text-center space-y-2 hover:border-[#1D5D91] hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-full bg-[#123B63]/10 text-[#123B63] group-hover:bg-[#123B63] group-hover:text-white flex items-center justify-center mx-auto transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-[#123B63]">GIS Intelligence</h4>
            <p className="text-[10px] text-slate-500">Multi-layer spatial analytics</p>
          </Link>

          <Link to="/research" className="govt-card p-4 rounded-lg text-center space-y-2 hover:border-[#1D5D91] hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-full bg-[#1D5D91]/10 text-[#1D5D91] group-hover:bg-[#1D5D91] group-hover:text-white flex items-center justify-center mx-auto transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-[#123B63]">Research Repository</h4>
            <p className="text-[10px] text-slate-500">Peer-reviewed studies</p>
          </Link>

          <Link to="/research/search" className="govt-card p-4 rounded-lg text-center space-y-2 hover:border-[#1D5D91] hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-full bg-[#2E6B45]/10 text-[#2E6B45] group-hover:bg-[#2E6B45] group-hover:text-white flex items-center justify-center mx-auto transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-[#123B63]">AI Evidence Search</h4>
            <p className="text-[10px] text-slate-500">Semantic query engine</p>
          </Link>

          <Link to="/government/policy/simulator" className="govt-card p-4 rounded-lg text-center space-y-2 hover:border-[#1D5D91] hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-full bg-[#C98A18]/10 text-[#C98A18] group-hover:bg-[#C98A18] group-hover:text-white flex items-center justify-center mx-auto transition-colors">
              <Sliders className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-[#123B63]">Policy Simulation</h4>
            <p className="text-[10px] text-slate-500">Scenario comparison</p>
          </Link>

          <Link to="/government/risk" className="govt-card p-4 rounded-lg text-center space-y-2 hover:border-[#1D5D91] hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-full bg-[#A33A32]/10 text-[#A33A32] group-hover:bg-[#A33A32] group-hover:text-white flex items-center justify-center mx-auto transition-colors">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-[#123B63]">Land Risk Analysis</h4>
            <p className="text-[10px] text-slate-500">Vulnerability scoring</p>
          </Link>

          <Link to="/public" className="govt-card p-4 rounded-lg text-center space-y-2 hover:border-[#1D5D91] hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 group-hover:bg-slate-700 group-hover:text-white flex items-center justify-center mx-auto transition-colors">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-[#123B63]">Public Info</h4>
            <p className="text-[10px] text-slate-500">Open citizen datasets</p>
          </Link>
        </div>
      </section>

      {/* INTERACTIVE GIS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex justify-between items-end border-b border-[#D9DEE5] pb-2">
          <div>
            <h3 className="text-lg font-bold text-[#123B63] font-serif">Interactive Land Governance GIS Intelligence</h3>
            <p className="text-xs text-[#5B6573]">Real-time operational IMD rainfall, satellite vectors & district boundary risk layers</p>
          </div>
          <Link to="/government/district" className="text-xs font-bold text-[#1D5D91] hover:underline">
            Open Full Dashboard &rarr;
          </Link>
        </div>

        <LandGovernanceMap />
      </section>

      {/* CORE WORKFLOW HIGHLIGHT */}
      <section className="bg-white border-y border-[#D9DEE5] py-8">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-lg font-bold text-[#123B63]">Evidence-Based Land Decision Workflow</h3>
            <p className="text-xs text-slate-500">From district land problems to statutory policy execution</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-xs font-semibold text-[#123B63]">
            <div className="bg-[#F5F7F9] p-3 rounded border border-slate-200">1. District Problem</div>
            <div className="bg-[#F5F7F9] p-3 rounded border border-slate-200">2. Satellite & IMD GIS</div>
            <div className="bg-[#F5F7F9] p-3 rounded border border-slate-200">3. AI Risk Scoring</div>
            <div className="bg-[#F5F7F9] p-3 rounded border border-slate-200">4. Policy Simulation</div>
            <div className="bg-[#F5F7F9] p-3 rounded border border-slate-200">5. Government Decision</div>
          </div>
        </div>
      </section>

    </div>
  );
};
