import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Database
} from 'lucide-react';
import { MOCK_OFFICER_DATASETS } from '../../data/mockDataOfficer';

export const DataQualityPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200">
        <div className="flex items-center space-x-2">
          <span className="bg-[#123B63] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            QUALITY AUDIT
          </span>
          <span className="text-slate-500 text-xs font-semibold">Quality & Validation Indicators</span>
        </div>
        <h1 className="text-xl font-bold text-[#123B63] mt-1">Platform Data Quality Metrics</h1>
        <p className="text-slate-600 text-xs mt-1">
          Monitor completeness, validation status, consistency, validity, freshness, uniqueness, and spatial integrity.
        </p>
      </div>

      {/* Quality Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200">
          <span className="text-[10px] font-bold uppercase text-slate-500">Average Completeness</span>
          <p className="text-2xl font-bold text-emerald-800 mt-1">98.2%</p>
          <p className="text-[10px] text-emerald-700 mt-0.5">Mandatory fields populated</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200">
          <span className="text-[10px] font-bold uppercase text-slate-500">Validation Status</span>
          <p className="text-2xl font-bold text-[#1D5D91] mt-1">Passed (97.8%)</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Verified against schema rules</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200">
          <span className="text-[10px] font-bold uppercase text-slate-500">Spatial Topology Validity</span>
          <p className="text-2xl font-bold text-emerald-800 mt-1">100.0%</p>
          <p className="text-[10px] text-emerald-700 mt-0.5">0 Self-intersections</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200">
          <span className="text-[10px] font-bold uppercase text-slate-500">Data Freshness Index</span>
          <p className="text-2xl font-bold text-purple-800 mt-1">High</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Synced within expected frequency</p>
        </div>
      </div>

      {/* Quality Score by Dataset Table */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <h2 className="text-xs font-bold text-[#123B63] uppercase tracking-wider">
            Dataset Quality Indicator Matrix
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold uppercase text-[10px]">
                <th className="p-3">Dataset Title</th>
                <th className="p-3">Completeness</th>
                <th className="p-3">Duplicates %</th>
                <th className="p-3">Missing Values %</th>
                <th className="p-3">Consistency</th>
                <th className="p-3">Freshness</th>
                <th className="p-3">Spatial Validity</th>
                <th className="p-3">Overall Quality</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px]">
              {MOCK_OFFICER_DATASETS.map((ds) => (
                <tr key={ds.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{ds.title}</td>
                  <td className="p-3 font-semibold text-emerald-800">{ds.quality.completeness}%</td>
                  <td className="p-3 font-semibold text-slate-700">{ds.quality.duplicatesPercentage}%</td>
                  <td className="p-3 font-semibold text-slate-700">{ds.quality.missingValuesPercentage}%</td>
                  <td className="p-3 font-semibold text-blue-800">{ds.quality.consistencyScore}%</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                      {ds.quality.freshnessStatus}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-emerald-800">{ds.quality.spatialIntegrity}%</td>
                  <td className="p-3 font-bold text-[#123B63] text-xs">{ds.qualityScore}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
