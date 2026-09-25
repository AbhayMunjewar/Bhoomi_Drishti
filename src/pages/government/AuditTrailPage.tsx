import React from 'react';
import { MOCK_AUDIT_TRAIL } from '../../data/mockGovernment';
import { ShieldCheck, Lock, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export const AuditTrailPage: React.FC = () => {
  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="bg-white p-4 rounded-md border border-[#D9DEE5] shadow-2xs flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D5D91] bg-[#1D5D91]/10 px-2 py-0.5 rounded">
            Government Portal &bull; Compliance & Audit
          </span>
          <h2 className="text-xl font-bold text-[#123B63] font-serif mt-1">
            Statutory Decision Audit Trail & Activity Logs
          </h2>
          <p className="text-xs text-[#5B6573]">
            Tamper-proof log of user queries, policy simulations, and evidence report generations
          </p>
        </div>

        <div className="bg-[#2E6B45]/10 border border-[#2E6B45]/30 px-3 py-1.5 rounded text-xs text-[#2E6B45] font-bold flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4" />
          <span>Audit Logging Active</span>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-white p-5 rounded-lg border border-[#D9DEE5] shadow-xs space-y-4 text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F5F7F9] text-[#123B63] font-bold border-b border-[#D9DEE5]">
                <th className="p-3">User & ID</th>
                <th className="p-3">Role</th>
                <th className="p-3">Action Performed</th>
                <th className="p-3">Resource / Target</th>
                <th className="p-3">Location</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {MOCK_AUDIT_TRAIL.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-[#123B63]">{evt.userName}</td>
                  <td className="p-3 text-slate-600">{evt.userRole}</td>
                  <td className="p-3 font-semibold text-slate-800">{evt.action}</td>
                  <td className="p-3 text-slate-600 font-mono">{evt.resource}</td>
                  <td className="p-3 text-slate-600">{evt.location}</td>
                  <td className="p-3 font-mono text-slate-500 text-[11px]">{evt.timestamp}</td>
                  <td className="p-3 text-right">
                    <span className="govt-badge bg-[#2E6B45]/10 text-[#2E6B45] border border-[#2E6B45]/30">
                      {evt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
