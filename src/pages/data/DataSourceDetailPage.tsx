import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Globe2,
  ChevronLeft,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  Info
} from 'lucide-react';
import { MOCK_DATA_SOURCES } from '../../data/mockDataOfficer';

export const DataSourceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const source = MOCK_DATA_SOURCES.find((s) => s.id === id) || MOCK_DATA_SOURCES[0];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/data/sources')}
        className="inline-flex items-center space-x-1 text-xs text-[#1D5D91] hover:underline font-bold"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Data Sources</span>
      </button>

      {/* Source Banner */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="bg-[#123B63] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              {source.type}
            </span>
            <h1 className="text-xl font-bold text-[#123B63] mt-1">{source.name}</h1>
            <p className="text-slate-600 text-xs mt-1">{source.organization}</p>
          </div>

          <span
            className={`px-3 py-1 rounded text-xs font-bold ${
              source.connectionStatus.includes('Live') || source.connectionStatus.includes('Automated')
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-amber-100 text-amber-800 border border-amber-300'
            }`}
          >
            {source.connectionStatus}
          </span>
        </div>

        {/* Access Status Panel (Handles IMD IP Whitelist Fallback Explicitly) */}
        {source.id === 'src-imd' ? (
          <div className="p-4 bg-amber-50 border border-amber-300 rounded text-xs space-y-2">
            <div className="flex items-center space-x-2 text-amber-900 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>IMD Connection Access: Restricted / Serving Operational Cached Snapshot</span>
            </div>
            <p className="text-[#123B63] text-[11px] leading-relaxed">
              <strong>API Access:</strong> Restricted (Direct API access requires institutional IP whitelisting authorization).
            </p>
            <p className="text-[#123B63] text-[11px] leading-relaxed">
              <strong>Fallback Protocol:</strong> BhoomiDrishti serves the latest verified cached dataset (36 district monsoon vectors & SPI scores).
            </p>
            <p className="text-[#123B63] text-[11px] leading-relaxed">
              <strong>Last Successful Retrieval:</strong> 10 Feb 2026, 08:00 IST
            </p>
          </div>
        ) : (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
            <p className="text-slate-700"><strong>API Access State:</strong> {source.apiAccessState}</p>
            <p className="text-slate-700"><strong>Last Successful Sync:</strong> {source.lastSync}</p>
          </div>
        )}

        {/* Detailed Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-2">
            <h3 className="font-bold text-slate-800">Governance & Licensing</h3>
            <p><strong className="text-slate-700">License Terms:</strong> {source.license}</p>
            <p><strong className="text-slate-700">Attribution Required:</strong> {source.attributionRequired ? 'Yes (Mandatory Citation)' : 'No'}</p>
            <p><strong className="text-slate-700">Official Portal:</strong> <a href={source.officialUrl} target="_blank" rel="noreferrer" className="text-[#1D5D91] underline">{source.officialUrl}</a></p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-2">
            <h3 className="font-bold text-slate-800">Technical Details</h3>
            <p><strong className="text-slate-700">Datasets Derived:</strong> {source.datasetsCount} Active Datasets</p>
            <p><strong className="text-slate-700">Known Limitations:</strong> {source.knownLimitations}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
