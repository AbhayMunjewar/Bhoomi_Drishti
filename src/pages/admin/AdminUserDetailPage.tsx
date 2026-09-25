import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Users, ArrowLeft, ShieldCheck, Mail, Phone, Building2, Calendar, Lock, AlertCircle, Edit, UserX, CheckCircle2, Key } from 'lucide-react';
import { MOCK_ADMIN_USERS } from '../../data/mockAdmin';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const AdminUserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const user = MOCK_ADMIN_USERS.find(u => u.id === id) || MOCK_ADMIN_USERS[0];
  const [actionDoneMsg, setActionDoneMsg] = useState<string | null>(null);

  const handleAction = (msg: string) => {
    setActionDoneMsg(msg);
    setTimeout(() => setActionDoneMsg(null), 4000);
  };

  return (
    <div className="space-y-6 select-none">
      <button
        onClick={() => navigate('/admin/users')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1D5D91] hover:text-[#123B63] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to User Management Catalog</span>
      </button>

      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 text-xs font-bold uppercase rounded bg-blue-50 text-blue-800 border border-blue-200">
            Role: {user.roleLabel}
          </span>
          <DataSourceBadge status="PROTOTYPE_DERIVED" size="md" />
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63] leading-tight">
              {user.name}
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{user.email}</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleAction('Password reset link sent to user email & logged in Audit Trail.')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded border border-slate-300 flex items-center space-x-1"
            >
              <Key className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Access</span>
            </button>
            <button
              onClick={() => handleAction('User role modification modal opened & pending approval.')}
              className="px-3 py-1.5 bg-[#123B63] hover:bg-[#1D5D91] text-white font-bold text-xs rounded shadow-xs"
            >
              Change Role
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
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Institution</span>
            <span className="font-bold text-slate-900">{user.institution}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Department</span>
            <span className="font-bold text-slate-900">{user.department || 'N/A'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Account Status</span>
            <span className="font-bold text-emerald-700">{user.status}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Permissions Granted</span>
            <span className="font-bold text-slate-900">{user.permissionsCount} Active Rules</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Overview */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3 text-xs">
            <h3 className="text-base font-bold text-[#123B63] border-b border-slate-100 pb-2">Account Metadata</h3>
            <div className="space-y-2 text-slate-700">
              <p>User Identifier (ID): <strong className="font-mono text-slate-900">{user.id}</strong></p>
              <p>Account Created Date: <strong>{user.createdDate}</strong></p>
              <p>Last Active Session: <strong>{user.lastActive}</strong></p>
              <p>Phone Number: <strong>{user.phone || 'N/A'}</strong></p>
            </div>
          </div>

          {/* Submissions & Submissions Activity */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3 text-xs">
            <h3 className="text-base font-bold text-[#123B63] border-b border-slate-100 pb-2">User Submissions & Audit History</h3>
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <div className="font-bold text-[#123B63]">Submitted Research Paper</div>
              <p className="text-slate-600">Geospatial Evaluation of Peri-Urban Land Use Conversion (Raigad District)</p>
              <span className="text-[10px] text-slate-400 block">Date: 25 Sep 2026 • Status: Pending Review</span>
            </div>
          </div>
        </div>

        {/* Sidebar Permissions overview */}
        <div className="space-y-6 text-xs">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-[#123B63] border-b border-slate-100 pb-2">Assigned Permissions Matrix</h3>
            <ul className="space-y-1.5 text-slate-700">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Read Approved Spatial Layers</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Submit Research Publications</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Export Open Data Samples</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
