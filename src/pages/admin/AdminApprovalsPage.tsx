import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Search, Filter, Clock, Eye, AlertCircle, RefreshCw, FileText, UserCheck, Database, MapPin } from 'lucide-react';
import { MOCK_ADMIN_APPROVALS, AdminApproval } from '../../data/mockAdmin';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const AdminApprovalsPage: React.FC = () => {
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState<AdminApproval[]>(MOCK_ADMIN_APPROVALS);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const tabs = ['All', 'User Account', 'Research Paper', 'Dataset', 'GIS Layer', 'Institution Verification', 'Public Report'];

  const filteredApprovals = approvals.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.submittedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.institution.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === 'All' || item.type === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#C98A18] text-xs font-bold uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-4 h-4 text-[#C98A18]" />
              <span>Platform Governance Workflow Engine</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63]">
              Approval Workflows & Verification Queue
            </h1>
            <p className="text-xs text-slate-600 max-w-3xl">
              Review and approve incoming researcher account registrations, peer-reviewed spatial publications, uploaded open dataset schemas, and GIS vector layer submissions.
            </p>
          </div>
          <DataSourceBadge status="PROTOTYPE_DERIVED" size="md" />
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3 text-xs font-bold">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === tab
                  ? 'bg-[#123B63] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search pending approvals by submission title, submitter name, or institution..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#1D5D91] text-slate-800"
          />
        </div>
      </div>

      {/* Approvals Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Showing {filteredApprovals.length} approval queue items</span>
          <span>Automated Validation Checks Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold">
                <th className="p-2.5">Submission Item</th>
                <th className="p-2.5">Submitted By</th>
                <th className="p-2.5">Type</th>
                <th className="p-2.5">Submission Date</th>
                <th className="p-2.5">Validation</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredApprovals.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="p-2.5">
                    <Link to={`/admin/approvals/${item.id}`} className="font-bold text-[#123B63] hover:underline">
                      {item.title}
                    </Link>
                    <div className="text-[10px] text-slate-500 truncate max-w-[260px]">{item.institution}</div>
                  </td>
                  <td className="p-2.5">
                    <div className="font-semibold text-slate-800">{item.submittedBy}</div>
                    <div className="text-[10px] text-slate-500">{item.submitterRole}</div>
                  </td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                      {item.type}
                    </span>
                  </td>
                  <td className="p-2.5 font-mono text-slate-500">{item.submittedDate}</td>
                  <td className="p-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      item.validationStatus === 'Passed' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                    }`}>
                      {item.validationStatus}
                    </span>
                  </td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-2.5 text-right">
                    <Link
                      to={`/admin/approvals/${item.id}`}
                      className="px-3 py-1 bg-[#1D5D91] hover:bg-[#123B63] text-white font-bold rounded text-xs inline-flex items-center space-x-1 shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review Item</span>
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
