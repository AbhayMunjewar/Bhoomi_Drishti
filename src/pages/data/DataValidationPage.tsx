import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Database,
  Layers,
  ShieldCheck,
  ChevronRight,
  Filter
} from 'lucide-react';

export const DataValidationPage: React.FC = () => {
  const navigate = useNavigate();
  const [runningValidation, setRunningValidation] = useState(false);

  const handleRunValidation = () => {
    setRunningValidation(true);
    setTimeout(() => {
      setRunningValidation(false);
    }, 1200);
  };

  const validationRules = [
    { rule: 'Geometry Self-Intersection Check', category: 'Spatial Topology', status: 'Passed', passRate: '100%', count: '36/36 Geometries', severity: 'High' },
    { rule: 'Duplicate Parcel Identification', category: 'Attribute Integrity', status: 'Passed', passRate: '100%', count: '0 Duplicates Found', severity: 'High' },
    { rule: 'Missing Mandatory Attributes (Census Code)', category: 'Schema Compliance', status: 'Warning', passRate: '98.8%', count: '2 Warning Records', severity: 'Medium' },
    { rule: 'Out-of-Range Area Acreage Variance', category: 'Attribute Quality', status: 'Passed', passRate: '99.4%', count: '1 Outlier Reviewed', severity: 'Low' },
    { rule: 'Coordinate Reference System (EPSG Check)', category: 'Spatial Projection', status: 'Passed', passRate: '100%', count: 'EPSG:4326 WGS84 Valid', severity: 'High' },
    { rule: 'Inconsistent District & Taluka Naming', category: 'Nomenclature Topology', status: 'Warning', passRate: '97.2%', count: '4 Name Standardizations', severity: 'Medium' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#123B63] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              QUALITY CONTROL
            </span>
            <span className="text-slate-500 text-xs font-semibold">Automated Validation Suite</span>
          </div>
          <h1 className="text-xl font-bold text-[#123B63] mt-1">Data & Geometry Validation Runner</h1>
          <p className="text-slate-600 text-xs mt-1">
            Executes 12 automated checks across spatial topology, missing values, duplicates, and attribute ranges.
          </p>
        </div>

        <button
          onClick={handleRunValidation}
          disabled={runningValidation}
          className="flex items-center space-x-2 bg-[#123B63] hover:bg-[#1D5D91] text-white px-4 py-2 rounded text-xs font-bold transition shadow-xs disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${runningValidation ? 'animate-spin' : ''}`} />
          <span>{runningValidation ? 'Running Suite...' : 'Run Full Validation Suite'}</span>
        </button>
      </div>

      {/* Overview Metric Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200">
          <span className="text-[10px] font-bold uppercase text-slate-500">Geometry Validity</span>
          <p className="text-xl font-bold text-emerald-800 mt-1">98.7% Passed</p>
          <p className="text-[10px] text-emerald-700 mt-0.5">0 Self-intersections detected</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200">
          <span className="text-[10px] font-bold uppercase text-slate-500">Missing Values</span>
          <p className="text-xl font-bold text-amber-600 mt-1">2.1% Warning</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Minor optional fields missing</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200">
          <span className="text-[10px] font-bold uppercase text-slate-500">Duplicate IDs</span>
          <p className="text-xl font-bold text-emerald-800 mt-1">0.0% Duplicates</p>
          <p className="text-[10px] text-emerald-700 mt-0.5">100% Unique ID Keys</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200">
          <span className="text-[10px] font-bold uppercase text-slate-500">Spatial CRS Alignment</span>
          <p className="text-xl font-bold text-blue-800 mt-1">EPSG:4326</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Standard WGS84 Projection</p>
        </div>
      </div>

      {/* Validation Rules Table */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#123B63] uppercase tracking-wider">
            Automated Quality Checks & Integrity Log
          </h2>
          <span className="text-[11px] text-slate-500">Last executed: Today at 16:10 IST</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold uppercase text-[10px]">
                <th className="p-3">Rule Name</th>
                <th className="p-3">Rule Category</th>
                <th className="p-3">Pass Rate</th>
                <th className="p-3">Rule Severity</th>
                <th className="p-3">Status</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px]">
              {validationRules.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{r.rule}</td>
                  <td className="p-3 font-semibold text-slate-600">{r.category}</td>
                  <td className="p-3 font-bold text-[#123B63]">{r.passRate}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.severity === 'High' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {r.severity}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      r.status === 'Passed'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{r.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
