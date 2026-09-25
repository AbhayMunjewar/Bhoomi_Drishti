import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, MapPin, Calendar, CheckCircle2, TrendingUp, AlertCircle, ArrowRight, BarChart3, Clock, Zap } from 'lucide-react';
import { MOCK_PILOT_PROJECTS, PilotProjectItem } from '../../data/mockInnovation';
import { useAuthStore } from '../../stores/authStore';

export const PilotProjectsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [pilots] = useState<PilotProjectItem[]>(MOCK_PILOT_PROJECTS);
  const [activeEvalPilot, setActiveEvalPilot] = useState<PilotProjectItem | null>(null);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
            <Link to="/innovation" className="hover:underline">Innovation Hub</Link>
            <span>/</span>
            <span className="text-[#123B63] font-bold">Pilot Projects</span>
          </div>
          <h1 className="text-2xl font-black text-[#123B63] font-serif mt-1">Real-World Innovation Pilots</h1>
          <p className="text-xs text-slate-600">
            Controlled empirical testing of land-governance innovations in real-world administrative geographies before national scaling.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs px-3 py-2 rounded-lg font-semibold flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Research Project = Study & Evidence | Innovation Pilot = Controlled Real-World Field Test</span>
        </div>
      </div>

      {/* PILOTS LIST */}
      <div className="space-y-6">
        {pilots.map((pilot) => (
          <div key={pilot.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4 hover:border-[#1D5D91] transition-all">
            
            {/* CARD TOP BAR */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded font-bold">
                    {pilot.id}
                  </span>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>Location: {pilot.location} ({pilot.district})</span>
                  </span>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Duration: {pilot.durationMonths} Months</span>
                  </span>
                </div>
                <h2 className="text-lg font-bold text-[#123B63] mt-1">{pilot.innovationTitle}</h2>
                <p className="text-xs text-slate-500 font-medium">Lead Institution: {pilot.leadInstitution}</p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  pilot.status === 'Evaluation' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                  pilot.status === 'Scaled' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                  'bg-blue-100 text-blue-800 border border-blue-300'
                }`}>
                  Status: {pilot.status}
                </span>
                <button
                  onClick={() => setActiveEvalPilot(pilot)}
                  className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-2xs transition-colors flex items-center space-x-1.5"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-[#C98A18]" />
                  <span>Evaluation & Comparison</span>
                </button>
              </div>
            </div>

            {/* OBJECTIVE */}
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Objective:</strong> {pilot.objective}
            </p>

            {/* PREDICTED VS ACTUAL METRICS TABLE */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#123B63] uppercase tracking-wider">
                  Pilot Performance Metrics (Predicted Target vs Empirical Actual)
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Verified by District Land Authorities</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                  <div className="font-bold text-slate-700">Detection Accuracy (%)</div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Target:</span>
                      <span className="font-mono font-bold text-slate-800">{pilot.predictedMetrics.detectionAccuracyPct}%</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Actual:</span>
                      <span className="font-mono font-bold text-emerald-700">{pilot.actualMetrics?.detectionAccuracyPct}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                  <div className="font-bold text-slate-700">False Positive Rate (%)</div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Target:</span>
                      <span className="font-mono font-bold text-slate-800">{pilot.predictedMetrics.falsePositivePct}%</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Actual:</span>
                      <span className="font-mono font-bold text-emerald-700">{pilot.actualMetrics?.falsePositivePct}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                  <div className="font-bold text-slate-700">Processing Time (Days)</div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Target:</span>
                      <span className="font-mono font-bold text-slate-800">{pilot.predictedMetrics.processingTimeDays}d</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Actual:</span>
                      <span className="font-mono font-bold text-emerald-700">{pilot.actualMetrics?.processingTimeDays}d</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                  <div className="font-bold text-slate-700">Pilot Cost (Lakhs)</div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Target:</span>
                      <span className="font-mono font-bold text-slate-800">₹{pilot.predictedMetrics.costInLakhs}L</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Actual:</span>
                      <span className="font-mono font-bold text-emerald-700">₹{pilot.actualMetrics?.costInLakhs}L</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* LESSONS & RECOMMENDATIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-amber-50/60 p-3 rounded-lg border border-amber-200">
                <span className="font-bold text-amber-900 block mb-1">Key Field Summary:</span>
                <p className="text-amber-800 text-[11px] leading-relaxed">{pilot.evaluationSummary}</p>
              </div>

              <div className="bg-emerald-50/60 p-3 rounded-lg border border-emerald-200">
                <span className="font-bold text-emerald-900 block mb-1">Policy & Scaling Recommendation:</span>
                <p className="text-emerald-800 text-[11px] leading-relaxed">{pilot.recommendations}</p>
              </div>
            </div>

            {/* FOOTER LINK TO EVIDENCE GRAPH */}
            <div className="pt-2 flex justify-between items-center text-xs">
              <div className="text-slate-500 text-[11px]">
                Supporting Body: <strong className="text-[#123B63]">{pilot.supportingAgency}</strong>
              </div>
              <Link
                to="/innovation/inn-detail-01"
                className="font-bold text-[#1D5D91] hover:underline flex items-center space-x-1"
              >
                <span>View Full Evidence Graph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* EVALUATION MODAL */}
      {activeEvalPilot && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-300 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase">
                  Field Evaluation Report
                </span>
                <h3 className="text-base font-bold text-[#123B63] mt-1">{activeEvalPilot.innovationTitle}</h3>
              </div>
              <button onClick={() => setActiveEvalPilot(null)} className="text-slate-400 font-bold">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">District</span>
                  <div className="font-semibold text-slate-800">{activeEvalPilot.district}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Lead Institution</span>
                  <div className="font-semibold text-slate-800">{activeEvalPilot.leadInstitution}</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#123B63] uppercase text-[11px] tracking-wider">Evaluation Summary</h4>
                <p className="p-3 bg-slate-50 border border-slate-200 rounded text-slate-700 leading-relaxed">
                  {activeEvalPilot.evaluationSummary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setActiveEvalPilot(null)}
                  className="px-4 py-2 bg-[#123B63] text-white rounded-lg font-bold shadow-2xs"
                >
                  Close Evaluation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
