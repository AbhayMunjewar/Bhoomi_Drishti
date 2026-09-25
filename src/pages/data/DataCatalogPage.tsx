import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Database,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Upload,
  ChevronRight,
  FileSpreadsheet,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { MOCK_OFFICER_DATASETS } from '../../data/mockDataOfficer';

export const DataCatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedVerification, setSelectedVerification] = useState<string>('ALL');

  const filteredDatasets = MOCK_OFFICER_DATASETS.filter((ds) => {
    const matchesSearch =
      ds.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ds.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ds.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || ds.category === selectedCategory;
    const matchesStatus = selectedStatus === 'ALL' || ds.status === selectedStatus;
    const matchesVerification =
      selectedVerification === 'ALL' || ds.verificationStatus === selectedVerification;

    return matchesSearch && matchesCategory && matchesStatus && matchesVerification;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#123B63] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              DATA MANAGEMENT
            </span>
            <span className="text-slate-500 text-xs font-semibold">Dataset Inventory & Quality Catalog</span>
          </div>
          <h1 className="text-xl font-bold text-[#123B63] mt-1">Platform Land Governance Datasets</h1>
          <p className="text-slate-600 text-xs mt-1">
            Manage, validate, inspect schemas, and publish datasets for authorized platform use.
          </p>
        </div>

        <button
          onClick={() => navigate('/data/pipeline')}
          className="flex items-center space-x-2 bg-[#123B63] hover:bg-[#1D5D91] text-white px-4 py-2 rounded text-xs font-bold transition shadow-xs self-start md:self-auto"
        >
          <Database className="w-4 h-4 text-[#C98A18]" />
          <span>View Data Pipeline</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search dataset title, source, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#1D5D91] focus:bg-white"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#1D5D91] focus:bg-white text-slate-700 font-medium"
          >
            <option value="ALL">All Categories</option>
            <option value="LULC">LULC Land Use</option>
            <option value="Climate & Rainfall">Climate & Rainfall</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Research Benchmark">Research Benchmark</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#1D5D91] focus:bg-white text-slate-700 font-medium"
          >
            <option value="ALL">All Statuses</option>
            <option value="Verified">Verified</option>
            <option value="Under Review">Under Review</option>
            <option value="Prototype">Prototype</option>
          </select>

          {/* Verification Status Filter */}
          <select
            value={selectedVerification}
            onChange={(e) => setSelectedVerification(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#1D5D91] focus:bg-white text-slate-700 font-medium"
          >
            <option value="ALL">All Provenance Types</option>
            <option value="OFFICIAL_SOURCE">OFFICIAL SOURCE</option>
            <option value="PROTOTYPE_DERIVED">PROTOTYPE DERIVED</option>
            <option value="SYNTHETIC_PROTOTYPE">SYNTHETIC PROTOTYPE</option>
          </select>
        </div>
      </div>

      {/* Dataset Inventory Table */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold uppercase tracking-wider text-[11px]">
                <th className="p-3">Dataset Name & Provenance</th>
                <th className="p-3">Category</th>
                <th className="p-3">Coverage & Records</th>
                <th className="p-3">Version & Updated</th>
                <th className="p-3">Quality Score</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredDatasets.length > 0 ? (
                filteredDatasets.map((ds) => (
                  <tr key={ds.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-800 text-xs">{ds.title}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[11px]">
                        <span className="text-slate-500 font-medium">{ds.source}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            ds.verificationStatus === 'OFFICIAL_SOURCE'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : ds.verificationStatus === 'PROTOTYPE_DERIVED'
                              ? 'bg-purple-100 text-purple-800 border border-purple-300'
                              : 'bg-slate-200 text-slate-800 border border-slate-300'
                          }`}
                        >
                          {ds.verificationStatus}
                        </span>
                      </div>
                    </td>

                    <td className="p-3 font-semibold text-slate-700">{ds.category}</td>

                    <td className="p-3">
                      <p className="font-semibold text-slate-800">{ds.coverage}</p>
                      <p className="text-[10px] text-slate-500">{ds.records} Records · {ds.format}</p>
                    </td>

                    <td className="p-3">
                      <p className="font-bold text-slate-800">{ds.version}</p>
                      <p className="text-[10px] text-slate-500">{ds.lastUpdated}</p>
                    </td>

                    <td className="p-3">
                      <div className="flex items-center space-x-1.5">
                        <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              ds.qualityScore >= 95
                                ? 'bg-emerald-600'
                                : ds.qualityScore >= 85
                                ? 'bg-blue-600'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${ds.qualityScore}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-800 text-[11px]">{ds.qualityScore}%</span>
                      </div>
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ds.status === 'Verified'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : ds.status === 'Under Review'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-purple-100 text-purple-800 border border-purple-300'
                        }`}
                      >
                        {ds.status}
                      </span>
                    </td>

                    <td className="p-3 text-right">
                      <button
                        onClick={() => navigate(`/data/datasets/${ds.id}`)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-[#123B63] hover:text-white text-slate-700 font-semibold rounded text-[11px] transition inline-flex items-center space-x-1 border border-slate-300"
                      >
                        <span>Inspect & Validate</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 text-xs">
                    No datasets found matching the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
