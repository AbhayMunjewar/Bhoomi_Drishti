import React from 'react';
import { Link } from 'react-router-dom';
import { Sliders, ShieldCheck, CheckCircle2, BarChart3, BookOpen, ArrowRight } from 'lucide-react';
import { MOCK_SCENARIOS } from '../../data/mockPolicy';

export const AuthorityPolicyReviewsPage: React.FC = () => {
  const scenarios = Object.values(MOCK_SCENARIOS);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
          <Link to="/authority/dashboard" className="hover:underline">Higher Authority</Link>
          <span>/</span>
          <span className="text-[#123B63] font-bold">Policy Scenario Reviews</span>
        </div>
        <h1 className="text-2xl font-black text-[#123B63] font-serif mt-1">Authorized Policy Experiment & Scenario Review</h1>
        <p className="text-xs text-slate-600">
          Review simulated policy scenarios, legal parameter constraints, and research evidence links before issuing policy recommendations.
        </p>
      </div>

      {/* WARNING BANNER ON STATUTORY APPROVALS */}
      <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl text-xs space-y-1">
        <strong className="font-bold block">Important Regulatory Governance Distinction:</strong>
        <p className="leading-relaxed">
          The BhoomiDrishti Policy Simulator models proposed policy changes, estimates socioeconomic impacts, and highlights assumptions/uncertainties. It does NOT automatically grant statutory approvals. All outputs serve as authorized decision-support evidence for Higher Authorities.
        </p>
      </div>

      {/* SCENARIOS LIST */}
      <div className="space-y-4">
        {scenarios.map((sc) => (
          <div key={sc.scenarioId} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4 hover:border-[#1D5D91] transition-all">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded font-bold">
                  {sc.scenarioId}
                </span>
                <h3 className="text-lg font-bold text-[#123B63] mt-1">{sc.scenarioName}</h3>
                <p className="text-xs text-slate-500">Environmental Risk Level: {sc.environmentalRiskLevel}</p>
              </div>

              <div className="flex items-center space-x-2">
                <Link
                  to="/government/policy/scenario-comparison"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                >
                  Scenario Trade-off Matrix
                </Link>
                <Link
                  to="/government/policy/simulator"
                  className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-2xs transition-colors"
                >
                  Open Policy Simulator
                </Link>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {sc.description}
            </p>

            {/* IMPACT PARAMETERS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Land Affected</span>
                <div className="font-bold text-red-700 mt-0.5">{sc.landAffectedHectares} ha</div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Population Affected</span>
                <div className="font-bold text-emerald-700 mt-0.5">{sc.populationAffectedLakhs} Lakhs</div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Infrastructure Pressure</span>
                <div className="font-bold text-slate-800 mt-0.5">{sc.infrastructurePressureScore} / 100</div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Overall Risk Score</span>
                <div className="font-bold text-amber-700 mt-0.5">{sc.overallRiskScorePct}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
