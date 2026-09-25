import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  Search,
  Filter,
  ChevronRight,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { MOCK_OFFICER_CONFLICTS } from '../../data/mockDataOfficer';

export const DataConflictsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const filteredConflicts = MOCK_OFFICER_CONFLICTS.filter((c) => {
    const matchesSearch =
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.parcelId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || c.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-red-700 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              DISCREPANCY DETECTION
            </span>
            <span className="text-slate-500 text-xs font-semibold">Multi-Source Vector Mismatch Log</span>
          </div>
          <h1 className="text-xl font-bold text-[#123B63] mt-1">Spatial & Cadastral Discrepancies</h1>
          <p className="text-slate-600 text-xs mt-1">
            Monitors variance between legacy revenue land records and satellite-derived vector geometries using neutral, non-prejudicial terminology.
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search parcel ID, location, or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#1D5D91]"
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-semibold text-slate-700"
        >
          <option value="ALL">All Statuses</option>
          <option value="New">New Flag</option>
          <option value="Under Investigation">Under Investigation</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Conflicts Table */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold uppercase text-[10px]">
                <th className="p-3">Conflict ID & Location</th>
                <th className="p-3">Dataset A (Revenue)</th>
                <th className="p-3">Dataset B (Satellite)</th>
                <th className="p-3">Difference Area</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px]">
              {filteredConflicts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="p-3 space-y-0.5">
                    <span className="font-bold text-red-900 block text-xs">{c.parcelId} - {c.district}</span>
                    <span className="text-[10px] text-slate-500">{c.location}</span>
                  </td>

                  <td className="p-3 font-semibold text-slate-800">{c.revenueAreaHa} ha</td>
                  <td className="p-3 font-semibold text-slate-800">{c.satelliteAreaHa} ha</td>

                  <td className="p-3 font-bold text-red-700">+{c.differenceAreaHa} ha</td>

                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-red-100 text-red-800 font-bold rounded text-[10px]">
                      {c.severity}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        c.status === 'New'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => navigate(`/data/conflicts/${c.id}`)}
                      className="px-2.5 py-1 bg-[#123B63] hover:bg-[#1D5D91] text-white font-bold rounded text-[10px] transition inline-flex items-center space-x-1 shadow-xs"
                    >
                      <MapPin className="w-3 h-3 text-[#C98A18]" />
                      <span>Inspect Map Mismatch</span>
                    </button>
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
