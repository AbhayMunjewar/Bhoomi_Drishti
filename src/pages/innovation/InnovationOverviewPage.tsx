import React from 'react';
import { Link } from 'react-router-dom';
import {
  Lightbulb,
  Zap,
  Award,
  Target,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Building,
  Users,
  Layers,
  Search,
  FileText,
  ShieldCheck,
  Globe2
} from 'lucide-react';
import {
  MOCK_INNOVATION_CHALLENGES,
  MOCK_HACKATHONS,
  MOCK_RESEARCH_GRANTS,
  MOCK_PILOT_PROJECTS,
  MOCK_KNOWLEDGE_COMPETITIONS,
  MOCK_INNOVATION_METRICS,
  MOCK_INNOVATION_DETAIL
} from '../../data/mockInnovation';

export const InnovationOverviewPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* GOVERNMENT HERO BANNER */}
      <div className="bg-gradient-to-r from-[#123B63] via-[#1D5D91] to-[#123B63] text-white p-6 rounded-xl shadow-md border border-[#123B63]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-[#C98A18]/20 border border-[#C98A18] px-3 py-1 rounded-full text-xs font-bold text-amber-300">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>National Land Governance Ecosystem</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black font-serif tracking-tight">
              Land Governance Innovation Hub
            </h1>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
              Discover, develop, test, and evaluate innovative solutions for sustainable and evidence-based land governance across India. Supporting hackathons, research grants, real-world pilots, and knowledge competitions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <Link
              to="/innovation/challenges"
              className="bg-[#C98A18] hover:bg-[#b07814] text-white px-4 py-2 rounded-lg font-bold text-xs shadow-xs transition-colors flex items-center justify-center space-x-2"
            >
              <Lightbulb className="w-4 h-4" />
              <span>Explore Challenges</span>
            </Link>
            <Link
              to="/innovation/pilots"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-4 py-2 rounded-lg font-bold text-xs transition-colors flex items-center justify-center space-x-2"
            >
              <Target className="w-4 h-4" />
              <span>View Pilots</span>
            </Link>
          </div>
        </div>
      </div>

      {/* METRICS DASHBOARD */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Active Challenges</div>
          <div className="text-2xl font-black text-[#123B63] mt-1">{MOCK_INNOVATION_METRICS.activeChallenges}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Across 4 Ministries</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Open Hackathons</div>
          <div className="text-2xl font-black text-[#1D5D91] mt-1">{MOCK_INNOVATION_METRICS.openHackathons}</div>
          <div className="text-[10px] text-slate-500 font-semibold mt-0.5">National Level</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Research Grants</div>
          <div className="text-2xl font-black text-[#C98A18] mt-1">{MOCK_INNOVATION_METRICS.activeGrants}</div>
          <div className="text-[10px] text-amber-700 font-semibold mt-0.5">Total Pool {MOCK_INNOVATION_METRICS.totalFundingPool}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Active Pilots</div>
          <div className="text-2xl font-black text-indigo-900 mt-1">{MOCK_INNOVATION_METRICS.activePilots}</div>
          <div className="text-[10px] text-indigo-600 font-semibold mt-0.5">Real-world Testing</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Successful Outcomes</div>
          <div className="text-2xl font-black text-[#2E6B45] mt-1">{MOCK_INNOVATION_METRICS.successfulPilots}</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Ready for Scaling</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Partner Institutions</div>
          <div className="text-2xl font-black text-slate-800 mt-1">{MOCK_INNOVATION_METRICS.participatingInstitutions}</div>
          <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Academic & R&D</div>
        </div>
      </div>

      {/* INNOVATION MODULE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* INNOVATION CHALLENGES */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 hover:border-[#1D5D91] transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-200 text-[#C98A18] flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#123B63]">Innovation Challenges</h3>
              <p className="text-xs text-slate-600 mt-1">
                Government-published problem statements calling for innovative technological and policy solutions.
              </p>
            </div>
            <div className="pt-2 text-xs font-semibold text-slate-500">
              Featured: <span className="text-[#123B63] font-bold">{MOCK_INNOVATION_CHALLENGES[0].title}</span>
            </div>
          </div>
          <Link
            to="/innovation/challenges"
            className="w-full py-2 bg-slate-50 hover:bg-[#123B63] hover:text-white border border-slate-200 rounded-lg font-bold text-xs text-[#123B63] transition-colors flex items-center justify-center space-x-1.5"
          >
            <span>Browse Challenges ({MOCK_INNOVATION_CHALLENGES.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* HACKATHONS */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 hover:border-[#1D5D91] transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 border border-blue-200 text-[#1D5D91] flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#123B63]">Hackathons</h3>
              <p className="text-xs text-slate-600 mt-1">
                National technology hackathons addressing geospatial AI, remote sensing, and land record analytics.
              </p>
            </div>
            <div className="pt-2 text-xs font-semibold text-slate-500">
              Upcoming: <span className="text-[#123B63] font-bold">{MOCK_HACKATHONS[0].title}</span>
            </div>
          </div>
          <Link
            to="/innovation/hackathons"
            className="w-full py-2 bg-slate-50 hover:bg-[#123B63] hover:text-white border border-slate-200 rounded-lg font-bold text-xs text-[#123B63] transition-colors flex items-center justify-center space-x-1.5"
          >
            <span>Explore Hackathons ({MOCK_HACKATHONS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* RESEARCH GRANTS */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 hover:border-[#1D5D91] transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 border border-emerald-200 text-[#2E6B45] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#123B63]">Research Grants</h3>
              <p className="text-xs text-slate-600 mt-1">
                Funding opportunities for academic institutions, policy labs, and researchers in land governance.
              </p>
            </div>
            <div className="pt-2 text-xs font-semibold text-slate-500">
              Funding: <span className="text-[#2E6B45] font-bold">Up to ₹50 Lakhs / Grant</span>
            </div>
          </div>
          <Link
            to="/innovation/grants"
            className="w-full py-2 bg-slate-50 hover:bg-[#123B63] hover:text-white border border-slate-200 rounded-lg font-bold text-xs text-[#123B63] transition-colors flex items-center justify-center space-x-1.5"
          >
            <span>View Opportunities ({MOCK_RESEARCH_GRANTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* PILOT PROJECTS */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 hover:border-[#1D5D91] transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#123B63]">Pilot Projects</h3>
              <p className="text-xs text-slate-600 mt-1">
                Controlled real-world testing of land innovations with empirical predicted vs. actual performance metrics.
              </p>
            </div>
            <div className="pt-2 text-xs font-semibold text-slate-500">
              Active Location: <span className="text-[#123B63] font-bold">{MOCK_PILOT_PROJECTS[0].district}</span>
            </div>
          </div>
          <Link
            to="/innovation/pilots"
            className="w-full py-2 bg-slate-50 hover:bg-[#123B63] hover:text-white border border-slate-200 rounded-lg font-bold text-xs text-[#123B63] transition-colors flex items-center justify-center space-x-1.5"
          >
            <span>Monitor Pilots ({MOCK_PILOT_PROJECTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* FEATURED REAL-WORLD PILOT EVALUATION SNAPSHOT */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                Active Pilot Evaluation
              </span>
              <span className="text-xs font-mono text-slate-400">ID: {MOCK_PILOT_PROJECTS[0].id}</span>
            </div>
            <h2 className="text-lg font-bold text-[#123B63] mt-1">{MOCK_PILOT_PROJECTS[0].innovationTitle}</h2>
          </div>
          <Link
            to="/innovation/inn-detail-01"
            className="text-xs font-bold text-[#1D5D91] hover:underline flex items-center space-x-1"
          >
            <span>Full Evidence Graph</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {MOCK_PILOT_PROJECTS[0].objective}
        </p>

        {/* Predicted vs Actual Grid */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-[#123B63] uppercase tracking-wider flex items-center justify-between">
            <span>Predicted Target vs Actual Pilot Performance</span>
            <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-mono">
              Empirical Field Test (Nagpur District)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <div className="text-[11px] font-bold text-slate-700">Detection Accuracy</div>
              <div className="mt-2 flex items-baseline justify-between text-xs font-mono">
                <span className="text-slate-500">Predicted: <strong className="text-slate-700">{MOCK_PILOT_PROJECTS[0].predictedMetrics.detectionAccuracyPct}%</strong></span>
                <span className="text-emerald-700 font-bold">Actual: <strong>{MOCK_PILOT_PROJECTS[0].actualMetrics?.detectionAccuracyPct}%</strong></span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <div className="text-[11px] font-bold text-slate-700">False Positive Rate</div>
              <div className="mt-2 flex items-baseline justify-between text-xs font-mono">
                <span className="text-slate-500">Predicted: <strong className="text-slate-700">{MOCK_PILOT_PROJECTS[0].predictedMetrics.falsePositivePct}%</strong></span>
                <span className="text-emerald-700 font-bold">Actual: <strong>{MOCK_PILOT_PROJECTS[0].actualMetrics?.falsePositivePct}%</strong></span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <div className="text-[11px] font-bold text-slate-700">Processing Speed</div>
              <div className="mt-2 flex items-baseline justify-between text-xs font-mono">
                <span className="text-slate-500">Predicted: <strong className="text-slate-700">{MOCK_PILOT_PROJECTS[0].predictedMetrics.processingTimeDays}d</strong></span>
                <span className="text-emerald-700 font-bold">Actual: <strong>{MOCK_PILOT_PROJECTS[0].actualMetrics?.processingTimeDays}d</strong></span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <div className="text-[11px] font-bold text-slate-700">Pilot Cost</div>
              <div className="mt-2 flex items-baseline justify-between text-xs font-mono">
                <span className="text-slate-500">Predicted: <strong className="text-slate-700">₹{MOCK_PILOT_PROJECTS[0].predictedMetrics.costInLakhs}L</strong></span>
                <span className="text-emerald-700 font-bold">Actual: <strong>₹{MOCK_PILOT_PROJECTS[0].actualMetrics?.costInLakhs}L</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KNOWLEDGE COMPETITIONS & COMPLIANCE MATRIX BANNER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Knowledge Competitions */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#123B63]">Knowledge Competitions</h3>
              <p className="text-[11px] text-slate-500">Recognizing national research excellence & digital land governance ideas.</p>
            </div>
          </div>
          <div className="space-y-2">
            {MOCK_KNOWLEDGE_COMPETITIONS.map(kc => (
              <div key={kc.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#123B63]">{kc.title}</div>
                  <div className="text-[10px] text-slate-500">Category: {kc.category}</div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  {kc.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PS 26019 Compliance Summary */}
        <div className="bg-[#123B63] text-white rounded-xl p-5 shadow-md border border-[#123B63] flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-amber-400/20 border border-amber-400/40 px-2.5 py-0.5 rounded text-[10px] font-bold text-amber-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SIH Problem Statement 26019</span>
            </div>
            <h3 className="font-bold text-base font-serif">Platform Capabilities Matrix</h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              BhoomiDrishti is designed as a complete national land governance research, policy innovation, evidence, GIS, and decision-support ecosystem.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-600/50 flex items-center justify-between">
            <span className="text-xs text-slate-300">Coverage: <strong>33 / 33 Requirements Implemented</strong></span>
            <Link
              to="/innovation/ps-checklist"
              className="bg-[#C98A18] hover:bg-[#b07814] text-white px-3 py-1.5 rounded text-xs font-bold transition-colors flex items-center space-x-1"
            >
              <span>View Checklist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
