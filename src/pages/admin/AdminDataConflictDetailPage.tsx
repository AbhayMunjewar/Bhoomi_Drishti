import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, ShieldCheck, MapPin, CheckCircle2, UserCheck } from 'lucide-react';
import { MOCK_ADMIN_DATA_CONFLICTS } from '../../data/mockAdmin';
import { PublicGISMap } from '../../components/maps/PublicGISMap';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const AdminDataConflictDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const c = MOCK_ADMIN_DATA_CONFLICTS.find(item => item.id === id) || MOCK_ADMIN_DATA_CONFLICTS[0];
  const [status, setStatus] = useState<string>(c.status);
  const [assignedTo, setAssignedTo] = useState<string>(c.assignedTo || 'Unassigned');
  const [actionDoneMsg, setActionDoneMsg] = useState<string | null>(null);

  const handleAssign = () => {
    setAssignedTo('Priya Sharma (Data & GIS Officer)');
    setStatus('Under Review');
    setActionDoneMsg('Conflict assigned to Data & GIS Officer for ground verification.');
    setTimeout(() => setActionDoneMsg(null), 4000);
  };

  const handleResolve = () => {
    setStatus('Resolved');
    setActionDoneMsg('Conflict marked as resolved following PostGIS boundary reconciliation.');
    setTimeout(() => setActionDoneMsg(null), 4000);
  };

  return (
    <div className="space-y-6 select-none">
      <button
        onClick={() => navigate('/admin/data-conflicts')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1D5D91] hover:text-[#123B63] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Data Conflicts Index</span>
      </button>

      {/* Discrepancy Notice */}
      <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl text-xs text-amber-900 flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-amber-950">Potential Data Discrepancy Flagged</h4>
          <p className="leading-relaxed font-semibold">
            "Potential discrepancy detected between legacy paper revenue title and satellite spatial vector ({c.differenceAreaHa} ha variance). Requires authorized review."
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 text-xs font-bold uppercase rounded bg-red-50 text-red-800 border border-red-200">
            Conflict ID: {c.id} • Severity: {c.severity}
          </span>
          <DataSourceBadge status="PROTOTYPE_DERIVED" size="md" />
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63] leading-tight">
              {c.location}
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">Parcel ID: {c.parcelId} • Assigned To: {assignedTo}</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleAssign}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded border border-slate-300 flex items-center space-x-1"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Assign to Data & GIS Officer</span>
            </button>
            <button
              onClick={handleResolve}
              className="px-4 py-2 bg-[#2E6B45] hover:bg-[#235335] text-white font-bold text-xs rounded shadow-xs"
            >
              Mark Resolved
            </button>
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
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Revenue Registry Area</span>
            <span className="font-bold text-slate-900">{c.revenueAreaHa} ha</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Satellite Vector Area</span>
            <span className="font-bold text-slate-900">{c.satelliteAreaHa} ha</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Discrepancy Variance</span>
            <span className="font-bold text-red-700">+{c.differenceAreaHa} ha (+{((c.differenceAreaHa / c.revenueAreaHa) * 100).toFixed(1)}%)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Conflict Status</span>
            <span className="font-bold text-amber-700">{status}</span>
          </div>
        </div>
      </div>

      {/* GIS CONFLICT MAP */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-[#123B63] flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-600" />
          <span>Geographic GIS Conflict Map (Revenue Parcel Overlay vs Satellite Vector)</span>
        </h3>
        <PublicGISMap height="550px" initialDistrict={c.district} />
      </div>
    </div>
  );
};
