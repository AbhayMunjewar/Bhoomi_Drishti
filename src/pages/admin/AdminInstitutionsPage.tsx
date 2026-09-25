import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Search, Filter, ShieldCheck, CheckCircle2, AlertCircle, Eye, RefreshCw, Building } from 'lucide-react';
import { MOCK_ADMIN_INSTITUTIONS, AdminInstitution } from '../../data/mockAdmin';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const AdminInstitutionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [institutions, setInstitutions] = useState<AdminInstitution[]>(MOCK_ADMIN_INSTITUTIONS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredInstitutions = institutions.filter(inst => {
    const matchesSearch =
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.leadPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.state.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'All' || inst.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || inst.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const totals = {
    total: institutions.length,
    active: institutions.filter(i => i.status === 'Active').length,
    pending: institutions.filter(i => i.status === 'Pending Verification').length,
    suspended: institutions.filter(i => i.status === 'Suspended').length
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#2E6B45] text-xs font-bold uppercase tracking-wider mb-1">
              <Building className="w-4 h-4 text-[#C98A18]" />
              <span>Platform Institution Governance</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63]">
              Approved Institutions & Academic Organizations
            </h1>
            <p className="text-xs text-slate-600 max-w-3xl">
              Manage universities, research institutes, government departments, and think tanks registered on BhoomiDrishti. Verify organizational credentials before enabling research publishing permissions.
            </p>
          </div>
          <DataSourceBadge status="PROTOTYPE_DERIVED" size="md" />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Institutions</span>
          <span className="text-2xl font-bold text-[#123B63]">{totals.total}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Verified</span>
          <span className="text-2xl font-bold text-emerald-700">{totals.active}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Pending Verification</span>
          <span className="text-2xl font-bold text-amber-700">{totals.pending}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Suspended</span>
          <span className="text-2xl font-bold text-red-700">{totals.suspended}</span>
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
            placeholder="Search institutions by name, lead person, or state..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#1D5D91] text-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Organization Type</label>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md py-1.5 px-2 text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="All">All Types</option>
              <option value="University">University</option>
              <option value="Research Institute">Research Institute</option>
              <option value="Government Department">Government Department</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Verification Status</label>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md py-1.5 px-2 text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending Verification">Pending Verification</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('All');
                setSelectedStatus('All');
              }}
              className="w-full py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md border border-slate-300 transition-colors flex items-center justify-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Institution Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold">
                <th className="p-2.5">Institution Name</th>
                <th className="p-2.5">Type</th>
                <th className="p-2.5">State</th>
                <th className="p-2.5">Researchers</th>
                <th className="p-2.5">Projects</th>
                <th className="p-2.5">Publications</th>
                <th className="p-2.5">Datasets</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredInstitutions.map(inst => (
                <tr key={inst.id} className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-[#123B63]">
                    <Link to={`/admin/institutions/${inst.id}`} className="hover:underline">{inst.name}</Link>
                    <div className="text-[10px] text-slate-500 font-normal">Lead: {inst.leadPerson}</div>
                  </td>
                  <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">{inst.type}</span></td>
                  <td className="p-2.5 text-slate-700">{inst.state}</td>
                  <td className="p-2.5 font-mono text-slate-800">{inst.researchersCount}</td>
                  <td className="p-2.5 font-mono text-slate-800">{inst.projectsCount}</td>
                  <td className="p-2.5 font-mono text-slate-800">{inst.publicationsCount}</td>
                  <td className="p-2.5 font-mono text-slate-800">{inst.datasetsCount}</td>
                  <td className="p-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inst.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {inst.status}
                    </span>
                  </td>
                  <td className="p-2.5 text-right">
                    <Link
                      to={`/admin/institutions/${inst.id}`}
                      className="px-2.5 py-1 bg-[#1D5D91] hover:bg-[#123B63] text-white font-bold rounded text-[11px] inline-flex items-center space-x-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Inspect</span>
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
