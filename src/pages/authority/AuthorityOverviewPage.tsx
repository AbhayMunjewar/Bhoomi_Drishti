import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Zap,
  Award,
  Sliders,
  CheckCircle2,
  Clock,
  ArrowRight,
  Building,
  BarChart3
} from 'lucide-react';
import { MOCK_AUTHORITY_DATA_ISSUES, HigherAuthorityDataIssue } from '../../data/mockInnovation';
import { useAuthStore } from '../../stores/authStore';

export const AuthorityOverviewPage: React.FC = () => {
  const { user } = useAuthStore();
  const issues: HigherAuthorityDataIssue[] = MOCK_AUTHORITY_DATA_ISSUES;
  const pendingIssues = issues.filter(i => i.status !== 'Authorized Replacement Approved');

  return (
    <div className="space-y-6">
      {/* HIGHER AUTHORITY HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#123B63] via-[#1D5D91] to-[#123B63] text-white p-6 rounded-xl shadow-md border border-[#123B63]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-[#C98A18]/20 border border-[#C98A18] px-3 py-1 rounded-full text-xs font-bold text-amber-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Government Review & Escalations Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black font-serif tracking-tight">
              Higher Authority Review Dashboard
            </h1>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
              Authorized Government Review Hub for data correction approvals, pilot project authorizations, research grant selection, and land policy scenario reviews.
            </p>
          </div>

          <div className="p-3 bg-white/10 rounded-lg border border-white/20 text-right text-xs">
            <div className="font-bold text-white">{user?.name || 'Dr. K. S. Rajan, IAS'}</div>
            <div className="text-amber-300 text-[11px]">{user?.department || 'Department of Land Resources'}</div>
            <div className="text-[10px] text-slate-300 mt-0.5">Role: Higher Data & Policy Authority</div>
          </div>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Pending Data Escalations</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{pendingIssues.length}</div>
          <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Requires Authority Review</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Pilot Approval Requests</div>
          <div className="text-2xl font-black text-indigo-900 mt-1">2</div>
          <div className="text-[10px] text-indigo-600 font-semibold mt-0.5">Pending Field Launch</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Policy Experiments</div>
          <div className="text-2xl font-black text-[#123B63] mt-1">3</div>
          <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Simulation Active</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Grant Applications</div>
          <div className="text-2xl font-black text-[#2E6B45] mt-1">4</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Under Committee Review</div>
        </div>
      </div>

      {/* DATA CORRECTION WORKFLOW & ESCALATIONS TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs space-y-4 p-5">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h2 className="font-bold text-base text-[#123B63]">Escalated Data Issues & Correction Requests</h2>
            </div>
            <p className="text-xs text-slate-500">
              Data Officers cannot overwrite official records silently. Higher Authority review and authorization is required for source corrections.
            </p>
          </div>

          <Link
            to="/authority/data-issues"
            className="text-xs font-bold text-[#1D5D91] hover:underline flex items-center space-x-1"
          >
            <span>View All Escalations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Issue ID</th>
                <th className="py-2.5 px-3">Dataset Name</th>
                <th className="py-2.5 px-3">Issue Title</th>
                <th className="py-2.5 px-3">Flagged By</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {issues.map((iss: HigherAuthorityDataIssue) => (
                <tr key={iss.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#123B63]">{iss.id}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">{iss.datasetOrLayer}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-amber-700">{iss.issueTitle}</td>
                  <td className="py-2.5 px-3 text-slate-600">{iss.reportedBy}</td>
                  <td className="py-2.5 px-3 text-[11px] font-bold text-red-700">{iss.severity}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      iss.status === 'Authorized Replacement Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {iss.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <Link
                      to="/authority/data-issues"
                      className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-2.5 py-1 rounded text-[11px] font-bold"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK ACCESS ACTIONS FOR HIGHER AUTHORITY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center space-x-2 text-[#123B63] font-bold text-sm">
            <Zap className="w-4 h-4 text-[#C98A18]" />
            <span>Pilot Approvals & Oversight</span>
          </div>
          <p className="text-xs text-slate-600">
            Authorize new real-world field pilots (e.g. AI change detection) and review empirical evaluation outcomes.
          </p>
          <Link
            to="/innovation/pilots"
            className="inline-flex items-center space-x-1 text-xs font-bold text-[#1D5D91] hover:underline"
          >
            <span>Manage Pilots →</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center space-x-2 text-[#123B63] font-bold text-sm">
            <Sliders className="w-4 h-4 text-purple-700" />
            <span>Policy Scenario Reviews</span>
          </div>
          <p className="text-xs text-slate-600">
            Evaluate policy simulation parameters, scenario trade-offs, and evidence linkages for land allocation decisions.
          </p>
          <Link
            to="/government/policy/simulator"
            className="inline-flex items-center space-x-1 text-xs font-bold text-[#1D5D91] hover:underline"
          >
            <span>Open Simulator →</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center space-x-2 text-[#123B63] font-bold text-sm">
            <BarChart3 className="w-4 h-4 text-[#2E6B45]" />
            <span>Implementation Monitoring</span>
          </div>
          <p className="text-xs text-slate-600">
            Compare predicted vs actual government project outcomes to establish continuous feedback for policy research.
          </p>
          <Link
            to="/government/implementation"
            className="inline-flex items-center space-x-1 text-xs font-bold text-[#1D5D91] hover:underline"
          >
            <span>View Outcomes →</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
