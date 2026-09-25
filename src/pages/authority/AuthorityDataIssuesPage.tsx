import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ShieldCheck, CheckCircle2, RefreshCw, FileText, Database, Layers, ArrowRight, Clock, AlertCircle } from 'lucide-react';
import { MOCK_AUTHORITY_DATA_ISSUES, HigherAuthorityDataIssue } from '../../data/mockInnovation';
import { useAuthStore } from '../../stores/authStore';

export const AuthorityDataIssuesPage: React.FC = () => {
  const { user } = useAuthStore();
  const [issues, setIssues] = useState<HigherAuthorityDataIssue[]>(MOCK_AUTHORITY_DATA_ISSUES);
  const [selectedIssue, setSelectedIssue] = useState<HigherAuthorityDataIssue | null>(null);

  const handleApproveCorrection = (issueId: string) => {
    setIssues(prev => prev.map(i => {
      if (i.id === issueId) {
        return {
          ...i,
          status: 'Authorized Replacement Approved'
        };
      }
      return i;
    }));
    alert(`Data correction request ${issueId} authorized! Source replacement data validated and PostgreSQL/PostGIS layer refreshed.`);
    setSelectedIssue(null);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
          <Link to="/authority/dashboard" className="hover:underline">Higher Authority</Link>
          <span>/</span>
          <span className="text-[#123B63] font-bold">Data Issues & Escalations</span>
        </div>
        <h1 className="text-2xl font-black text-[#123B63] font-serif mt-1">Authorized Data Correction & Governance Hub</h1>
        <p className="text-xs text-slate-600">
          Formal exception workflow for stale, inconsistent, or corrupted land records. Data Officers flag issues; Higher Authorities review and authorize source record corrections.
        </p>
      </div>

      {/* WORKFLOW DIAGRAM CARD */}
      <div className="bg-[#123B63] text-white p-4 rounded-xl shadow-md space-y-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Strict Governance Control Flow</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono pt-1">
          <span className="bg-[#1D5D91] px-2.5 py-1 rounded">1. Stale / Conflict Detected</span>
          <span className="text-amber-400">→</span>
          <span className="bg-[#1D5D91] px-2.5 py-1 rounded">2. Data Issue Flagged</span>
          <span className="text-amber-400">→</span>
          <span className="bg-[#C98A18] text-white font-bold px-2.5 py-1 rounded">3. Higher Authority Review</span>
          <span className="text-amber-400">→</span>
          <span className="bg-[#1D5D91] px-2.5 py-1 rounded">4. Authorized Source Correction</span>
          <span className="text-amber-400">→</span>
          <span className="bg-[#2E6B45] text-white font-bold px-2.5 py-1 rounded">5. PostGIS Pipeline Refresh</span>
        </div>
      </div>

      {/* ISSUES TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs space-y-4 p-5">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h2 className="font-bold text-base text-[#123B63]">Flagged Data Escalations</h2>
          <span className="text-xs text-slate-500 font-mono">Total Escalations: {issues.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-3">Issue ID</th>
                <th className="py-3 px-3">Dataset Name</th>
                <th className="py-3 px-3">Geography</th>
                <th className="py-3 px-3">Issue Title</th>
                <th className="py-3 px-3">Reported By</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {issues.map((iss) => (
                <tr key={iss.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono font-bold text-[#123B63]">{iss.id}</td>
                  <td className="py-3 px-3 font-semibold text-slate-800">{iss.datasetOrLayer}</td>
                  <td className="py-3 px-3 text-slate-600">{iss.district}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-amber-700">{iss.issueTitle}</td>
                  <td className="py-3 px-3 text-slate-600">{iss.reportedBy} ({iss.reportedDate})</td>
                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      iss.status === 'Authorized Replacement Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {iss.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedIssue(iss)}
                      className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-3 py-1 rounded text-xs font-bold transition-colors"
                    >
                      Review Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* REVIEW & AUTHORIZATION MODAL */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-300">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {selectedIssue.id}
                </span>
                <h3 className="text-base font-bold text-[#123B63] mt-1">{selectedIssue.issueTitle}</h3>
              </div>
              <button onClick={() => setSelectedIssue(null)} className="text-slate-400 font-bold">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Dataset</span>
                  <div className="font-semibold text-amber-800">{selectedIssue.datasetOrLayer}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">District</span>
                  <div className="font-semibold text-slate-800">{selectedIssue.district}</div>
                </div>
              </div>

              <div>
                <span className="font-bold text-[#123B63] block mb-1">Issue Description & Evidence:</span>
                <p className="bg-slate-50 p-3 rounded border border-slate-200 text-slate-700 leading-relaxed">
                  {selectedIssue.evidenceDetails}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedIssue(null)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700 font-bold"
                >
                  Close
                </button>
                {selectedIssue.status !== 'Authorized Replacement Approved' && (
                  <button
                    type="button"
                    onClick={() => handleApproveCorrection(selectedIssue.id)}
                    className="px-4 py-2 bg-[#2E6B45] hover:bg-emerald-800 text-white rounded font-bold shadow-2xs flex items-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Authorize Source Correction & Refresh Pipeline</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
