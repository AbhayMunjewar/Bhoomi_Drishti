import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Database
} from 'lucide-react';
import { MOCK_DATA_SOURCES } from '../../data/mockDataOfficer';

export const DataSourcesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200">
        <div className="flex items-center space-x-2">
          <span className="bg-[#123B63] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            PROVENANCE & INTEGRATION
          </span>
          <span className="text-slate-500 text-xs font-semibold">Data Origin Registry</span>
        </div>
        <h1 className="text-xl font-bold text-[#123B63] mt-1">Data Source Registry & Target Architectures</h1>
        <p className="text-slate-600 text-xs mt-1">
          Maintain authoritative provenance records, license policies, prototype sources, and production target endpoints.
        </p>
      </div>

      {/* Prototype Source vs Production Target Banner */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-xs space-y-1">
        <div className="flex items-center space-x-2 text-[#123B63] font-bold">
          <Database className="w-4 h-4 text-[#1D5D91]" />
          <span>Prototype Source Layer vs Production Target APIs</span>
        </div>
        <p className="text-slate-600 text-[11px] leading-relaxed">
          In this SIH prototype environment, datasets are ingested from prepared CSV/GeoJSON files representing production feeds. In production, these connectors seamlessly bind to live, whitelisted government data services (such as IMD Mausam API, ISRO Bhuvan WMS/WFS, or data.gov.in).
        </p>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_DATA_SOURCES.map((src) => (
          <div key={src.id} className="bg-white p-5 rounded-lg shadow-xs border border-slate-200 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{src.type}</span>
                <h2 className="text-sm font-bold text-[#123B63] mt-0.5">{src.name}</h2>
                <p className="text-[11px] text-slate-600 font-medium">{src.organization}</p>
              </div>

              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  src.connectionStatus.includes('Live') || src.connectionStatus.includes('Automated')
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : src.connectionStatus.includes('Restricted')
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-slate-100 text-slate-800 border border-slate-300'
                }`}
              >
                {src.connectionStatus}
              </span>
            </div>

            <p className="text-xs text-slate-600 border-t border-slate-100 pt-2 leading-relaxed">
              <strong className="text-slate-700">Access Mode:</strong> {src.apiAccessState}
            </p>

            <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[10px]">Last Sync</span>
                <span className="font-bold text-slate-800">{src.lastSync}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">Datasets Obtained</span>
                <span className="font-bold text-slate-800">{src.datasetsCount} Datasets</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={src.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-slate-500 hover:text-[#1D5D91] flex items-center space-x-1 font-semibold"
              >
                <span>Official URL</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => navigate(`/data/sources/${src.id}`)}
                className="px-3 py-1 bg-[#123B63] text-white hover:bg-[#1D5D91] rounded text-xs font-bold transition inline-flex items-center space-x-1"
              >
                <span>Source Metadata</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
