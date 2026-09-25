import React, { useState } from 'react';
import { Globe2, ShieldCheck, Activity, RefreshCw, AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import { MOCK_ADMIN_INTEGRATIONS, AdminIntegrationItem } from '../../data/mockAdmin';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const AdminIntegrationsPage: React.FC = () => {
  const [integrations, setIntegrations] = useState<AdminIntegrationItem[]>(MOCK_ADMIN_INTEGRATIONS);

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#1D5D91] text-xs font-bold uppercase tracking-wider mb-1">
              <Globe2 className="w-4 h-4 text-[#C98A18]" />
              <span>External API & Data Gateway Control</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63]">
              API Integrations & External Service Connectors
            </h1>
            <p className="text-xs text-slate-600 max-w-3xl">
              Monitor operational connections to government data providers (IMD, NRSC Bhuvan, Survey of India) and internal spatial services (PostGIS, ChromaDB AI Vector Engine).
            </p>
          </div>
          <DataSourceBadge status="OFFICIAL_SOURCE" size="md" />
        </div>
      </div>

      {/* Credibility Notice for Restricted External APIs */}
      <div className="bg-[#123B63] text-white p-4 rounded-xl border border-[#1D5D91] shadow-xs text-xs space-y-1">
        <div className="flex items-center space-x-2 text-amber-300 font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Government Integration Architecture Note</span>
        </div>
        <p className="text-slate-200 leading-relaxed">
          BhoomiDrishti ingests external government data via authenticated APIs. Where direct live IP whitelisting is pending (e.g. IMD live grid endpoint), the system gracefully operates in <strong>Cached Snapshot Mode</strong> using authorized operational datasets.
        </p>
      </div>

      {/* Integrations Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold">
                <th className="p-2.5">Service Name</th>
                <th className="p-2.5">Category</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5">Auth Status</th>
                <th className="p-2.5">Response Time</th>
                <th className="p-2.5">Last Sync</th>
                <th className="p-2.5">Fallback & Operational Mode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {integrations.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-[#123B63]">{item.serviceName}</td>
                  <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">{item.category}</span></td>
                  <td className="p-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'Connected' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-2.5 font-mono text-[11px] text-slate-700">{item.authStatus}</td>
                  <td className="p-2.5 font-mono text-slate-800">{item.responseTimeMs} ms</td>
                  <td className="p-2.5 font-mono text-slate-500">{item.lastSync}</td>
                  <td className="p-2.5 text-slate-600 font-medium max-w-[280px] truncate">{item.fallbackMode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
