import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Building, ArrowLeft, ShieldCheck, Mail, Users, FolderKanban, BookOpen, Database, CheckCircle2, AlertCircle } from 'lucide-react';
import { MOCK_ADMIN_INSTITUTIONS } from '../../data/mockAdmin';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const AdminInstitutionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const inst = MOCK_ADMIN_INSTITUTIONS.find(i => i.id === id) || MOCK_ADMIN_INSTITUTIONS[0];
  const [status, setStatus] = useState<'Active' | 'Pending Verification' | 'Suspended'>(inst.status);
  const [actionDoneMsg, setActionDoneMsg] = useState<string | null>(null);

  const handleStatusChange = (newStatus: 'Active' | 'Suspended') => {
    setStatus(newStatus);
    setActionDoneMsg(`Institution status changed to ${newStatus}. Audit event logged.`);
    setTimeout(() => setActionDoneMsg(null), 4000);
  };

  return (
    <div className="space-y-6 select-none">
      <button
        onClick={() => navigate('/admin/institutions')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1D5D91] hover:text-[#123B63] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Institutions Directory</span>
      </button>

      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 text-xs font-bold uppercase rounded bg-slate-100 text-[#123B63] border border-slate-200">
            Type: {inst.type}
          </span>
          <DataSourceBadge status="PROTOTYPE_DERIVED" size="md" />
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63] leading-tight">
              {inst.name}
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">Contact: {inst.contactEmail}</p>
          </div>

          <div className="flex items-center space-x-2">
            {status === 'Pending Verification' && (
              <button
                onClick={() => handleStatusChange('Active')}
                className="px-4 py-2 bg-[#2E6B45] hover:bg-[#235335] text-white font-bold text-xs rounded shadow-xs"
              >
                Approve & Verify Institution
              </button>
            )}
            {status === 'Active' ? (
              <button
                onClick={() => handleStatusChange('Suspended')}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded shadow-xs"
              >
                Suspend Institution Access
              </button>
            ) : status === 'Suspended' ? (
              <button
                onClick={() => handleStatusChange('Active')}
                className="px-4 py-2 bg-[#123B63] hover:bg-[#1D5D91] text-white font-bold text-xs rounded shadow-xs"
              >
                Reactivate Institution
              </button>
            ) : null}
          </div>
        </div>

        {actionDoneMsg && (
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded text-xs text-emerald-900 flex items-center space-x-2 font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionDoneMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">State / Region</span>
            <span className="font-bold text-slate-900">{inst.state}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Lead Person / Director</span>
            <span className="font-bold text-slate-900">{inst.leadPerson}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Verification Status</span>
            <span className={`font-bold ${status === 'Active' ? 'text-emerald-700' : 'text-amber-700'}`}>{status}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Verified Date</span>
            <span className="font-bold text-slate-900">{inst.verifiedDate || 'Pending'}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#1D5D91]" /> Researchers
          </span>
          <span className="text-xl font-bold text-[#123B63]">{inst.researchersCount} Registered</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1">
            <FolderKanban className="w-3.5 h-3.5 text-[#C98A18]" /> Projects
          </span>
          <span className="text-xl font-bold text-[#123B63]">{inst.projectsCount} Active</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-purple-600" /> Publications
          </span>
          <span className="text-xl font-bold text-[#123B63]">{inst.publicationsCount} Papers</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1">
            <Database className="w-3.5 h-3.5 text-emerald-600" /> Datasets
          </span>
          <span className="text-xl font-bold text-[#123B63]">{inst.datasetsCount} Datasets</span>
        </div>
      </div>
    </div>
  );
};
