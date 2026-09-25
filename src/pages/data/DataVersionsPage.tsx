import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  GitCompare,
  ChevronRight,
  Clock,
  Database
} from 'lucide-react';
import { MOCK_OFFICER_DATASETS } from '../../data/mockDataOfficer';

export const DataVersionsPage: React.FC = () => {
  const navigate = useNavigate();

  const versionsList = [
    { dataset: 'Maharashtra District Land Use & LULC Vector', version: 'v2.4', date: '15 Jan 2026', records: 36, changes: 'Incorporated updated Sentinel-2 2025 LULC classifications and 0 self-intersection topology checks.', author: 'Priya Sharma (GIS Officer)' },
    { dataset: 'Maharashtra District Land Use & LULC Vector', version: 'v2.3', date: '10 Nov 2025', records: 36, changes: 'Initial Census 2021 district boundary vector alignment.', author: 'Shri Manoj Deshmukh' },
    { dataset: 'IMD Operational Monsoon Rainfall & SPI Matrix', version: 'v2026.1', date: '10 Feb 2026', records: 36, changes: 'Updated 2025 monsoon final departure statistics.', author: 'IMD Operational Feed' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#123B63] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              VERSION CONTROL
            </span>
            <span className="text-slate-500 text-xs font-semibold">Dataset Lineage Ledger</span>
          </div>
          <h1 className="text-xl font-bold text-[#123B63] mt-1">Dataset Versioning & Lineage</h1>
          <p className="text-slate-600 text-xs mt-1">
            Track schema changes, record additions, and spatial polygon modifications across dataset iterations.
          </p>
        </div>

        <button
          onClick={() => navigate('/data/versions/compare')}
          className="flex items-center space-x-2 bg-[#123B63] hover:bg-[#1D5D91] text-white px-4 py-2 rounded text-xs font-bold transition shadow-xs"
        >
          <GitCompare className="w-4 h-4 text-[#C98A18]" />
          <span>Compare Versions Side-by-Side</span>
        </button>
      </div>

      {/* Version History Table */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <h2 className="text-xs font-bold text-[#123B63] uppercase tracking-wider">
            Version Release History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold uppercase text-[10px]">
                <th className="p-3">Dataset Name</th>
                <th className="p-3">Version</th>
                <th className="p-3">Release Date</th>
                <th className="p-3">Records Count</th>
                <th className="p-3">Changes Summary</th>
                <th className="p-3">Author</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px]">
              {versionsList.map((ver, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{ver.dataset}</td>
                  <td className="p-3 font-bold text-[#1D5D91]">{ver.version}</td>
                  <td className="p-3 text-slate-600">{ver.date}</td>
                  <td className="p-3 font-semibold">{ver.records} Records</td>
                  <td className="p-3 text-slate-600">{ver.changes}</td>
                  <td className="p-3 text-slate-700 font-medium">{ver.author}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => navigate('/data/versions/compare')}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-[#123B63] hover:text-white text-slate-700 font-bold rounded text-[10px] transition inline-flex items-center space-x-1 border border-slate-300"
                    >
                      <GitCompare className="w-3 h-3" />
                      <span>Compare</span>
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
