import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, Search, Filter, MapPin, Eye, RefreshCw, CheckCircle2 } from 'lucide-react';
import { MOCK_ADMIN_DATA_CONFLICTS, AdminDataConflict } from '../../data/mockAdmin';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const AdminDataConflictsPage: React.FC = () => {
  const navigate = useNavigate();
  const [conflicts, setConflicts] = useState<AdminDataConflict[]>(MOCK_ADMIN_DATA_CONFLICTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');

  const filteredConflicts = conflicts.filter(c => {
    const matchesSearch =
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.datasetA.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.datasetB.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSev = selectedSeverity === 'All' || c.severity === selectedSeverity;

    return matchesSearch && matchesSev;
  });

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-red-700 text-xs font-bold uppercase tracking-wider mb-1">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Automated Spatial Discrepancy Monitoring</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63]">
              Spatial Data Conflicts & Parcel Boundary Discrepancies
            </h1>
            <p className="text-xs text-slate-600 max-w-3xl">
              Monitor spatial boundary mismatches detected between paper revenue records (RoR 7/12) and satellite-derived vectors. Flagged items indicate: <strong>"Potential discrepancy detected. Requires authorized review."</strong>
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
            placeholder="Search conflicts by location, parcel ID, or dataset..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#1D5D91] text-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Severity Level</label>
            <select
              value={selectedSeverity}
              onChange={e => setSelectedSeverity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md py-1.5 px-2 text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="All">All Severities</option>
              <option value="High">High Discrepancy</option>
              <option value="Medium">Medium Discrepancy</option>
              <option value="Low">Low Discrepancy</option>
            </select>
          </div>

          <div className="flex items-end col-span-2">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSeverity('All');
              }}
              className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md border border-slate-300 transition-colors flex items-center justify-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Conflict Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold">
                <th className="p-2.5">Conflict ID & Location</th>
                <th className="p-2.5">Dataset A (Revenue)</th>
                <th className="p-2.5">Dataset B (Satellite)</th>
                <th className="p-2.5">Area Difference</th>
                <th className="p-2.5">Severity</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredConflicts.map(c => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-[#123B63]">
                    <Link to={`/admin/data-conflicts/${c.id}`} className="hover:underline">{c.id} • {c.location}</Link>
                    <div className="text-[10px] text-slate-500 font-normal">Parcel ID: {c.parcelId} • Detected: {c.detectedDate}</div>
                  </td>
                  <td className="p-2.5 text-slate-700 font-mono text-[11px] max-w-[160px] truncate">{c.datasetA} ({c.revenueAreaHa} ha)</td>
                  <td className="p-2.5 text-slate-700 font-mono text-[11px] max-w-[160px] truncate">{c.datasetB} ({c.satelliteAreaHa} ha)</td>
                  <td className="p-2.5 font-bold text-red-700 font-mono">{c.differenceAreaHa} ha</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-800 border border-red-200">
                      {c.severity}
                    </span>
                  </td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      {c.status}
                    </span>
                  </td>
                  <td className="p-2.5 text-right">
                    <Link
                      to={`/admin/data-conflicts/${c.id}`}
                      className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white font-bold rounded text-[11px] inline-flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>GIS Conflict Map</span>
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
