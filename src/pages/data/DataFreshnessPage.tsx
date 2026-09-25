import React from 'react';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Database
} from 'lucide-react';
import { MOCK_OFFICER_DATASETS } from '../../data/mockDataOfficer';

export const DataFreshnessPage: React.FC = () => {
  const freshnessList = [
    { title: 'IMD Operational District Monsoon Rainfall Matrix', category: 'Climate & Rainfall', lastUpdated: '10 Feb 2026', frequency: 'Daily (Seasonal)', nextExpected: 'Tomorrow 08:00', status: 'Fresh' },
    { title: 'Maharashtra District Land Use & LULC Acreage Vector', category: 'LULC', lastUpdated: '15 Jan 2026', frequency: 'Quarterly', nextExpected: '15 Apr 2026', status: 'Fresh' },
    { title: 'State Industrial Corridor & Freight Network Vectors', category: 'Infrastructure', lastUpdated: '01 Jan 2026', frequency: 'Monthly', nextExpected: '01 Feb 2026 (Overdue)', status: 'Due Soon' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200">
        <div className="flex items-center space-x-2">
          <span className="bg-[#123B63] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            DATA CYCLE MONITORING
          </span>
          <span className="text-slate-500 text-xs font-semibold">Freshness & Recency Ledger</span>
        </div>
        <h1 className="text-xl font-bold text-[#123B63] mt-1">Dataset Freshness & Sync Schedules</h1>
        <p className="text-slate-600 text-xs mt-1">
          Tracks update frequencies, last sync timestamps, and alerts officers when datasets become stale.
        </p>
      </div>

      {/* Freshness Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200">
          <span className="text-[10px] font-bold uppercase text-slate-500">Fresh Datasets</span>
          <p className="text-2xl font-bold text-emerald-800 mt-1">338</p>
          <p className="text-[10px] text-emerald-700 mt-0.5">Updated within schedule</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200">
          <span className="text-[10px] font-bold uppercase text-slate-500">Due Soon</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">2</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Sync expected within 7 days</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200">
          <span className="text-[10px] font-bold uppercase text-slate-500">Stale / Overdue</span>
          <p className="text-2xl font-bold text-slate-700 mt-1">0</p>
          <p className="text-[10px] text-emerald-700 mt-0.5">0 Overdue datasets</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200">
          <span className="text-[10px] font-bold uppercase text-slate-500">Sync Frequency Target</span>
          <p className="text-2xl font-bold text-blue-800 mt-1">100%</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Operational SLA met</p>
        </div>
      </div>

      {/* Freshness Table */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <h2 className="text-xs font-bold text-[#123B63] uppercase tracking-wider">
            Dataset Recency & Update Schedule
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold uppercase text-[10px]">
                <th className="p-3">Dataset Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Last Updated</th>
                <th className="p-3">Update Frequency</th>
                <th className="p-3">Next Expected Sync</th>
                <th className="p-3">Freshness Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px]">
              {freshnessList.map((f, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{f.title}</td>
                  <td className="p-3 font-semibold text-slate-600">{f.category}</td>
                  <td className="p-3 text-slate-700">{f.lastUpdated}</td>
                  <td className="p-3 text-slate-600">{f.frequency}</td>
                  <td className="p-3 font-medium text-slate-800">{f.nextExpected}</td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        f.status === 'Fresh'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {f.status}
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
