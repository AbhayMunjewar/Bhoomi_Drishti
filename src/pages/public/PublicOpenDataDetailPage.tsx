import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Database,
  ArrowLeft,
  Calendar,
  HardDrive,
  FileCode,
  Download,
  ShieldCheck,
  Table,
  CheckCircle2,
  AlertCircle,
  Code2
} from 'lucide-react';
import { PUBLIC_OPEN_DATASETS } from '../../data/mockPublic';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const PublicOpenDataDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const dataset = PUBLIC_OPEN_DATASETS.find(d => d.id === id);

  if (!dataset) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-[#123B63]">Dataset Not Found</h2>
        <p className="text-sm text-slate-600">The requested dataset record could not be found.</p>
        <Link
          to="/public/open-data"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-[#1D5D91] text-white rounded-md font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Open Data Catalogue</span>
        </Link>
      </div>
    );
  }

  const handleDownload = () => {
    const jsonStr = JSON.stringify(dataset.previewRows, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dataset.id}_sample.json`;
    a.click();
  };

  return (
    <div className="space-y-6 select-none">
      <button
        onClick={() => navigate('/public/open-data')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1D5D91] hover:text-[#123B63] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Open Data Catalogue</span>
      </button>

      {/* Dataset Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 text-xs font-bold uppercase rounded bg-slate-100 text-[#123B63] border border-slate-200">
              {dataset.category}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
              <FileCode className="w-3.5 h-3.5" />
              {dataset.format}
            </span>
          </div>
          <DataSourceBadge status={dataset.dataStatus} size="md" />
        </div>

        <h1 className="text-2xl font-serif font-bold text-[#123B63] leading-tight">
          {dataset.title}
        </h1>

        <p className="text-sm text-slate-700 leading-relaxed">{dataset.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Publisher</span>
            <span className="font-bold text-slate-900">{dataset.publisher}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Coverage</span>
            <span className="font-bold text-slate-900">{dataset.coverage}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">File Size & Format</span>
            <span className="font-bold text-slate-900">{dataset.fileSize} • {dataset.format}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Last Updated</span>
            <span className="font-bold text-slate-900">{dataset.lastUpdated}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-500">License: <strong>{dataset.license}</strong></span>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-[#2E6B45] hover:bg-[#235335] text-white font-bold text-xs rounded-md shadow-xs transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Dataset Sample</span>
          </button>
        </div>
      </div>

      {/* Synthetic Warning if applicable */}
      {dataset.dataStatus === 'SYNTHETIC_PROTOTYPE' && (
        <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl text-xs text-amber-900 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-amber-900">Prototype / Synthetic Dataset — Not Government Verified</h4>
            <p className="mt-0.5 leading-relaxed">
              This dataset is an algorithmically generated synthetic test matrix created for Smart India Hackathon platform evaluations. It is NOT official government land title or climate records.
            </p>
          </div>
        </div>
      )}

      {/* Schema Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-base font-bold text-[#123B63] flex items-center gap-2 border-b border-slate-100 pb-2">
          <Code2 className="w-4 h-4 text-[#1D5D91]" />
          <span>Fields & Schema Definition</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-[#123B63] font-bold border-b border-slate-200">
                <th className="p-2.5">Field Name</th>
                <th className="p-2.5">Data Type</th>
                <th className="p-2.5">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dataset.schemaFields.map((field, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-2.5 font-mono font-bold text-[#1D5D91]">{field.field}</td>
                  <td className="p-2.5 text-slate-500 font-mono text-[11px]">{field.type}</td>
                  <td className="p-2.5 text-slate-700">{field.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Data Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-base font-bold text-[#123B63] flex items-center gap-2 border-b border-slate-100 pb-2">
          <Table className="w-4 h-4 text-[#2E6B45]" />
          <span>Interactive Preview Data Table</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold">
                {Object.keys(dataset.previewRows[0] || {}).map((col, idx) => (
                  <th key={idx} className="p-2.5 capitalize">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {dataset.previewRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50">
                  {Object.values(row).map((val, cIdx) => (
                    <td key={cIdx} className="p-2.5 font-medium text-slate-800">
                      {String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
