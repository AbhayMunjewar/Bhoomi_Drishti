import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Database, Search, Filter, HardDrive, Calendar, FileCode, CheckCircle2, AlertCircle, Eye, RefreshCw } from 'lucide-react';
import { MOCK_ADMIN_DATASETS, AdminDatasetItem } from '../../data/mockAdmin';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const AdminDatasetsPage: React.FC = () => {
  const navigate = useNavigate();
  const [datasets, setDatasets] = useState<AdminDatasetItem[]>(MOCK_ADMIN_DATASETS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVerification, setSelectedVerification] = useState<string>('All');

  const filteredDatasets = datasets.filter(ds => {
    const matchesSearch =
      ds.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesVer = selectedVerification === 'All' || ds.verificationStatus === selectedVerification;

    return matchesSearch && matchesVer;
  });

  const totals = {
    total: datasets.length,
    official: datasets.filter(d => d.verificationStatus === 'OFFICIAL_SOURCE').length,
    derived: datasets.filter(d => d.verificationStatus === 'PROTOTYPE_DERIVED').length,
    synthetic: datasets.filter(d => d.verificationStatus === 'SYNTHETIC_PROTOTYPE').length
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#2E6B45] text-xs font-bold uppercase tracking-wider mb-1">
              <Database className="w-4 h-4 text-[#C98A18]" />
              <span>Platform Data Governance</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63]">
              Platform Datasets & Data Governance Catalogue
            </h1>
            <p className="text-xs text-slate-600 max-w-3xl">
              Audit spatial and statistical datasets across all platform modules. Enforce data quality validation, versioning control, schema integrity, and clear verification status tagging.
            </p>
          </div>
          <DataSourceBadge status="OFFICIAL_SOURCE" size="md" />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Datasets</span>
          <span className="text-2xl font-bold text-[#123B63]">{totals.total}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Official Sources</span>
          <span className="text-2xl font-bold text-emerald-700">{totals.official}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Prototype Derived</span>
          <span className="text-2xl font-bold text-blue-700">{totals.derived}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Synthetic Benchmark</span>
          <span className="text-2xl font-bold text-amber-700">{totals.synthetic}</span>
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
            placeholder="Search datasets by title, publisher, or category..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#1D5D91] text-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Verification Status Tag</label>
            <select
              value={selectedVerification}
              onChange={e => setSelectedVerification(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md py-1.5 px-2 text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="All">All Verification Statuses</option>
              <option value="OFFICIAL_SOURCE">OFFICIAL SOURCE</option>
              <option value="PROTOTYPE_DERIVED">PROTOTYPE DERIVED</option>
              <option value="SYNTHETIC_PROTOTYPE">SYNTHETIC PROTOTYPE</option>
            </select>
          </div>

          <div className="flex items-end col-span-2">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedVerification('All');
              }}
              className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md border border-slate-300 transition-colors flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Datasets Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold">
                <th className="p-2.5">Dataset Title</th>
                <th className="p-2.5">Publisher</th>
                <th className="p-2.5">Category</th>
                <th className="p-2.5">Format</th>
                <th className="p-2.5">Quality Score</th>
                <th className="p-2.5">Verification Tag</th>
                <th className="p-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredDatasets.map(ds => (
                <tr key={ds.id} className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-[#123B63]">
                    <Link to={`/admin/datasets/${ds.id}`} className="hover:underline">{ds.title}</Link>
                    <div className="text-[10px] text-slate-500 font-normal">Version: {ds.version} • Updated: {ds.lastUpdated}</div>
                  </td>
                  <td className="p-2.5 text-slate-700 font-medium max-w-[180px] truncate">{ds.publisher}</td>
                  <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">{ds.category}</span></td>
                  <td className="p-2.5 font-mono text-slate-800">{ds.fileFormat}</td>
                  <td className="p-2.5 font-bold text-emerald-700">{ds.qualityScore}/100</td>
                  <td className="p-2.5"><DataSourceBadge status={ds.verificationStatus} size="sm" /></td>
                  <td className="p-2.5 text-right">
                    <Link
                      to={`/admin/datasets/${ds.id}`}
                      className="px-3 py-1 bg-[#1D5D91] hover:bg-[#123B63] text-white font-bold rounded text-[11px] inline-flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Governance View</span>
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
