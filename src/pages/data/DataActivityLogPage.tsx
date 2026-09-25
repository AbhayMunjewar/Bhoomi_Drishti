import React, { useState } from 'react';
import {
  Activity,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Database
} from 'lucide-react';
import { MOCK_OFFICER_DATA_ACTIVITIES } from '../../data/mockDataOfficer';

export const DataActivityLogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = MOCK_OFFICER_DATA_ACTIVITIES.filter((act) => {
    return (
      act.datasetOrLayer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.user.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200">
        <div className="flex items-center space-x-2">
          <span className="bg-[#123B63] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            OPERATIONAL LEDGER
          </span>
          <span className="text-slate-500 text-xs font-semibold">Data Operations History</span>
        </div>
        <h1 className="text-xl font-bold text-[#123B63] mt-1">Data & GIS Activity Log</h1>
        <p className="text-slate-600 text-xs mt-1">
          Detailed operational history of uploads, spatial validation runs, metadata updates, conflict resolutions, and version releases.
        </p>
      </div>

      {/* Search Filter */}
      <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search activity by dataset, action type, or officer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#1D5D91]"
          />
        </div>
      </div>

      {/* Activity Log Table */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <h2 className="text-xs font-bold text-[#123B63] uppercase tracking-wider">
            Operational Activity History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold uppercase text-[10px]">
                <th className="p-3">Timestamp</th>
                <th className="p-3">Officer / User</th>
                <th className="p-3">Action Performed</th>
                <th className="p-3">Target Dataset / GIS Layer</th>
                <th className="p-3">Operational Details</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px]">
              {filteredLogs.map((act) => (
                <tr key={act.id} className="hover:bg-slate-50">
                  <td className="p-3 text-slate-500 font-mono text-[10px]">{act.timestamp}</td>
                  <td className="p-3 font-bold text-slate-800">{act.user}</td>
                  <td className="p-3 font-semibold text-[#1D5D91]">{act.action}</td>
                  <td className="p-3 font-bold text-slate-800">{act.datasetOrLayer}</td>
                  <td className="p-3 text-slate-600">{act.details}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        act.status === 'Success'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {act.status}
                    </span>
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
