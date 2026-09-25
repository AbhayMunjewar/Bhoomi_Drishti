import React from 'react';
import {
  Globe2,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Sliders
} from 'lucide-react';
import { MOCK_DATA_PIPELINE_STATUS } from '../../data/mockDataOfficer';

export const DataIntegrationsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200">
        <div className="flex items-center space-x-2">
          <span className="bg-[#123B63] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            DATA CONNECTORS
          </span>
          <span className="text-slate-500 text-xs font-semibold">Data Feed Health Portal</span>
        </div>
        <h1 className="text-xl font-bold text-[#123B63] mt-1">Data Source Connector Integrations</h1>
        <p className="text-slate-600 text-xs mt-1">
          Monitors API connection status, response latency, and serving protocols for external feeds (IMD, Bhuvan, data.gov.in, PostGIS).
        </p>
      </div>

      {/* Integration Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_DATA_PIPELINE_STATUS.map((pipe, idx) => (
          <div key={idx} className="bg-white p-5 rounded-lg shadow-xs border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#123B63]">{pipe.service}</span>
              <span
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                  pipe.status === 'Healthy' || pipe.status === 'Available'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
              >
                {pipe.status}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
              {pipe.details}
            </p>

            <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
              <span>Category: <strong>{pipe.category}</strong></span>
              <span>Last Sync: <strong>{pipe.lastSync}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
