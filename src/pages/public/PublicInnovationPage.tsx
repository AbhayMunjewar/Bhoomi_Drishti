import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Zap, Award, Target, Sparkles, CheckCircle2, Globe2, ArrowRight } from 'lucide-react';
import { MOCK_INNOVATION_CHALLENGES, MOCK_PILOT_PROJECTS, MOCK_KNOWLEDGE_COMPETITIONS } from '../../data/mockInnovation';

export const PublicInnovationPage: React.FC = () => {
  const publicChallenges = MOCK_INNOVATION_CHALLENGES.filter(c => c.status === 'Open' || c.status === 'Pilot' || c.status === 'Completed');
  const approvedPilots = MOCK_PILOT_PROJECTS.filter(p => p.status === 'Evaluation' || p.status === 'Scaled' || p.status === 'Active');

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#123B63] via-[#1D5D91] to-[#123B63] text-white p-6 rounded-xl shadow-md border border-[#123B63]">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-[#C98A18]/20 border border-[#C98A18] px-3 py-1 rounded-full text-xs font-bold text-amber-300">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Public Governance Showcase</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black font-serif tracking-tight">
            National Land Innovation & Pilot Showcase
          </h1>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed max-w-3xl">
            Explore approved public research outcomes, field innovation pilots, hackathon problem statements, and national land governance achievements.
          </p>
        </div>
      </div>

      {/* APPROVED PILOTS SHOWCASE */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <h2 className="font-bold text-base text-[#123B63]">Approved Real-World Pilot Outcomes</h2>
            <p className="text-xs text-slate-500">Verified field pilot metrics evaluated by district authorities.</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
            Public Access Approved
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {approvedPilots.map((pilot) => (
            <div key={pilot.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono font-bold bg-white text-[#123B63] px-2 py-0.5 rounded border border-slate-200">
                    {pilot.id}
                  </span>
                  <h3 className="font-bold text-[#123B63] text-sm mt-1">{pilot.innovationTitle}</h3>
                  <p className="text-xs text-slate-500">Location: {pilot.location} ({pilot.district})</p>
                </div>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  {pilot.status}
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2">{pilot.objective}</p>

              <div className="grid grid-cols-2 gap-2 text-xs bg-white p-2.5 rounded border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Predicted Target Accuracy</span>
                  <span className="font-mono font-bold text-slate-700">{pilot.predictedMetrics.detectionAccuracyPct}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Actual Field Outcome</span>
                  <span className="font-mono font-bold text-emerald-700">{pilot.actualMetrics?.detectionAccuracyPct}%</span>
                </div>
              </div>

              <div className="pt-1 flex justify-between items-center text-xs">
                <span className="text-[10px] text-slate-400">Lead: {pilot.leadInstitution}</span>
                <Link
                  to="/innovation/inn-detail-01"
                  className="font-bold text-[#1D5D91] hover:underline flex items-center space-x-1"
                >
                  <span>Evidence Graph</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OPEN INNOVATION CHALLENGES */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <h2 className="font-bold text-base text-[#123B63]">Active National Challenges & Problem Statements</h2>

        <div className="space-y-3">
          {publicChallenges.map((ch) => (
            <div key={ch.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
                    {ch.id}
                  </span>
                  <span className="text-[10px] font-bold text-slate-600">{ch.theme}</span>
                </div>
                <h3 className="font-bold text-[#123B63] text-sm mt-0.5">{ch.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-1">{ch.problemStatement}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-amber-700 block">Deadline: {ch.submissionDeadline}</span>
                <Link
                  to="/innovation/challenges"
                  className="text-xs font-bold text-[#1D5D91] hover:underline block mt-0.5"
                >
                  View Details & Eligibility →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
