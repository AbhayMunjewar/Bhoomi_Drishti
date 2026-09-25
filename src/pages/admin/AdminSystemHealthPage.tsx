import React from 'react';
import { Activity, ShieldCheck, Cpu, HardDrive, Database, Globe2, RefreshCw } from 'lucide-react';
import { MOCK_ADMIN_SYSTEM_HEALTH } from '../../data/mockAdmin';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const AdminSystemHealthPage: React.FC = () => {
  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Infrastructure Operations Center</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63]">
              System Health & Infrastructure Telemetry
            </h1>
            <p className="text-xs text-slate-600 max-w-3xl">
              Real-time health monitoring of frontend single-page web app, REST backend gateway, PostgreSQL/PostGIS database, MapLibre tile server, ChromaDB AI vector search engine, and MinIO storage cluster.
            </p>
          </div>
          <DataSourceBadge status="PROTOTYPE_DERIVED" size="md" />
        </div>
      </div>

      {/* Grid of Component Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_ADMIN_SYSTEM_HEALTH.map(health => (
          <div key={health.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{health.category}</span>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                health.status === 'Healthy' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}>
                {health.status}
              </span>
            </div>

            <h3 className="font-bold text-sm text-[#123B63]">{health.component}</h3>

            <div className="grid grid-cols-3 gap-2 text-xs bg-slate-50 p-2.5 rounded border border-slate-100 font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Latency</span>
                <span className="font-bold text-slate-800">{health.responseTimeMs} ms</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Uptime</span>
                <span className="font-bold text-emerald-700">{health.uptimePercentage}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Last Checked</span>
                <span className="font-semibold text-slate-600">{health.lastChecked}</span>
              </div>
            </div>

            {health.lastError && (
              <div className="p-2 bg-amber-50 rounded border border-amber-200 text-[11px] text-amber-900 font-mono">
                Log: {health.lastError}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
