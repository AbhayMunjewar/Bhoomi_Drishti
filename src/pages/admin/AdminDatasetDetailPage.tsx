import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Database, ArrowLeft, ShieldCheck, HardDrive, Calendar, FileCode, CheckCircle2, AlertCircle, Code2, Table, Activity } from 'lucide-react';
import { MOCK_ADMIN_DATASETS } from '../../data/mockAdmin';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const AdminDatasetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const ds = MOCK_ADMIN_DATASETS.find(d => d.id === id) || MOCK_ADMIN_DATASETS[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'metadata' | 'quality' | 'audit'>('overview');

  return (
    <div className="space-y-6 select-none">
      <button
        onClick={() => navigate('/admin/datasets')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1D5D91] hover:text-[#123B63] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Datasets Governance Catalogue</span>
      </button>

      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 text-xs font-bold uppercase rounded bg-slate-100 text-[#123B63] border border-slate-200">
              Category: {ds.category}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded bg-blue-50 text-blue-700 border border-blue-200">
              Format: {ds.fileFormat}
            </span>
          </div>
          <DataSourceBadge status={ds.verificationStatus} size="md" />
        </div>

        <h1 className="text-2xl font-serif font-bold text-[#123B63] leading-tight">
          {ds.title}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Publisher</span>
            <span className="font-bold text-slate-900">{ds.publisher}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Coverage</span>
            <span className="font-bold text-slate-900">{ds.coverage}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Quality Score</span>
            <span className="font-bold text-emerald-700">{ds.qualityScore}/100</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Version & Updated</span>
            <span className="font-bold text-slate-900">{ds.version} • {ds.lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex border-b border-slate-200 text-xs font-bold space-x-6">
          {(['overview', 'metadata', 'quality', 'audit'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 capitalize transition-colors border-b-2 ${
                activeTab === tab ? 'border-[#1D5D91] text-[#1D5D91] font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-3 text-xs text-slate-700">
            <h4 className="font-bold text-[#123B63]">Governance Summary</h4>
            <p className="leading-relaxed">
              This dataset is registered under BhoomiDrishti data governance protocols. Verification tag: <strong>{ds.verificationStatus}</strong>.
            </p>
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <span className="font-bold text-[#123B63]">Total Records Encoded:</span> {ds.recordCount} rows / feature polygons.
            </div>
          </div>
        )}

        {activeTab === 'quality' && (
          <div className="space-y-3 text-xs text-slate-700">
            <h4 className="font-bold text-[#123B63]">Quality Checks Result</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-emerald-50 rounded border border-emerald-200">
                <span>Schema Conformity Check</span>
                <span className="font-bold text-emerald-800">PASSED</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-emerald-50 rounded border border-emerald-200">
                <span>CRS Topological Alignment</span>
                <span className="font-bold text-emerald-800">PASSED (EPSG:4326)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-2 text-xs text-slate-600">
            <p>Dataset uploaded by Priya Sharma (Data & GIS Officer) on 15 Jan 2026.</p>
            <p>Schema validation performed automatically by PostGIS engine.</p>
          </div>
        )}
      </div>
    </div>
  );
};
