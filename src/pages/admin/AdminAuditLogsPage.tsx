import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Search, Filter, Eye, RefreshCw, Lock } from 'lucide-react';
import { MOCK_ADMIN_AUDIT_LOGS, AdminAuditEvent } from '../../data/mockAdmin';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const AdminAuditLogsPage: React.FC = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<AdminAuditEvent[]>(MOCK_ADMIN_AUDIT_LOGS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('All');

  const filteredLogs = logs.filter(l => {
    const matchesSearch =
      l.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.resource.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = selectedRole === 'All' || l.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#123B63] text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-[#C98A18]" />
              <span>Immutable Platform Governance Ledger</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63]">
              Immutable System Audit Logs
            </h1>
            <p className="text-xs text-slate-600 max-w-3xl">
              Append-only audit trail logging user authentication events, role permission modifications, dataset validation approvals, GIS layer publications, and policy scenario executions.
            </p>
          </div>
          <DataSourceBadge status="PROTOTYPE_DERIVED" size="md" />
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search audit trail by user, action, or resource..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#1D5D91] text-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Filter by User Role</label>
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md py-1.5 px-2 text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="All">All Roles</option>
              <option value="System Administrator">System Administrator</option>
              <option value="Data & GIS Officer">Data & GIS Officer</option>
              <option value="Researcher">Researcher</option>
              <option value="Policy & Planning Officer">Policy & Planning Officer</option>
            </select>
          </div>

          <div className="flex items-end col-span-2">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRole('All');
              }}
              className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md border border-slate-300 transition-colors flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold">
                <th className="p-2.5">Timestamp</th>
                <th className="p-2.5">User</th>
                <th className="p-2.5">Role</th>
                <th className="p-2.5">Action Executed</th>
                <th className="p-2.5">Resource</th>
                <th className="p-2.5">IP Address</th>
                <th className="p-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLogs.map(aud => (
                <tr key={aud.id} className="hover:bg-slate-50">
                  <td className="p-2.5 font-mono text-[11px] text-slate-500">{aud.timestamp}</td>
                  <td className="p-2.5 font-bold text-slate-900">{aud.user}</td>
                  <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">{aud.role}</span></td>
                  <td className="p-2.5 font-semibold text-[#123B63]">{aud.action}</td>
                  <td className="p-2.5 font-mono text-slate-700">{aud.resource}</td>
                  <td className="p-2.5 font-mono text-slate-500 text-[11px]">{aud.ipAddress}</td>
                  <td className="p-2.5 text-right">
                    <Link
                      to={`/admin/audit/${aud.id}`}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded text-[11px] inline-flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Event</span>
                    </Link>
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
