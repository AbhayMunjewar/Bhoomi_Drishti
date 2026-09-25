import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { MOCK_ADMIN_AUDIT_LOGS } from '../../data/mockAdmin';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const AdminAuditDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const aud = MOCK_ADMIN_AUDIT_LOGS.find(a => a.id === id) || MOCK_ADMIN_AUDIT_LOGS[0];

  return (
    <div className="space-y-6 select-none">
      <button
        onClick={() => navigate('/admin/audit')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1D5D91] hover:text-[#123B63] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to System Audit Trail</span>
      </button>

      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 text-xs font-bold uppercase rounded bg-slate-100 text-[#123B63] border border-slate-200 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-[#C98A18]" />
            Immutable Audit Ledger Record
          </span>
          <DataSourceBadge status="PROTOTYPE_DERIVED" size="md" />
        </div>

        <h1 className="text-2xl font-serif font-bold text-[#123B63] leading-tight">
          Audit Event: {aud.action}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Event ID</span>
            <span className="font-bold font-mono text-slate-900">{aud.id}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Timestamp</span>
            <span className="font-bold text-slate-900">{aud.timestamp}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Actor User</span>
            <span className="font-bold text-slate-900">{aud.user} ({aud.role})</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Session IP</span>
            <span className="font-mono text-slate-800">{aud.ipAddress}</span>
          </div>
        </div>
      </div>

      {/* Detail payload */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3 text-xs">
        <h3 className="text-base font-bold text-[#123B63] border-b border-slate-100 pb-2">Event Rationale & Metadata</h3>
        <p className="text-slate-700 bg-slate-50 p-4 rounded border border-slate-200 leading-relaxed font-mono">
          {aud.details || 'Standard system execution audit event.'}
        </p>
      </div>
    </div>
  );
};
