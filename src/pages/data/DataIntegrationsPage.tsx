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
  const integrationConnectors = [
    { service: 'PostgreSQL 15 / PostGIS 3.3 Spatial Engine', status: 'CONNECTED', category: 'Spatial Database', lastSync: 'Real-time', details: 'Primary database cluster active with 42 indexed spatial vector tables.' },
    { service: 'BhoomiDrishti AI Embeddings Vector Search', status: 'CONNECTED', category: 'AI / Vector DB', lastSync: 'Real-time', details: 'ChromaDB dense vector index active for policy & research paper retrieval.' },
    { service: 'Prepared CSV / GeoJSON Prototype Source Layer', status: 'PROTOTYPE ACTIVE', category: 'Data Pipeline Source', lastSync: 'Today 09:45', details: 'Automated batch reader active for imd_district_rainfall.csv & land risk CSV dumps.' },
    { service: 'IMD Operational Mausam API (MoES)', status: 'RESTRICTED / PENDING AUTHORIZATION', category: 'Meteorological Data', lastSync: '2026-02-10 08:00', details: 'Direct API whitelist pending authorization. Operating in Prototype CSV / Cached Snapshot mode.' },
    { service: 'NRSC Bhuvan Spatial Vector Service (ISRO)', status: 'RESTRICTED / PENDING AUTHORIZATION', category: 'Satellite GIS', lastSync: '2026-02-25 04:30', details: 'WMS/WFS API streams pending network key validation. Serving prototype GeoJSON payloads.' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200">
        <div className="flex items-center space-x-2">
          <span className="bg-[#123B63] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            CONNECTOR AUDIT
          </span>
          <span className="text-slate-500 text-xs font-semibold">Data Feed Integrity Portal</span>
        </div>
        <h1 className="text-xl font-bold text-[#123B63] mt-1">Data Source Connector Integrations</h1>
        <p className="text-slate-600 text-xs mt-1">
          Accurately distinguishes between connected database systems, prototype CSV source layers, and pending government API endpoints.
        </p>
      </div>

      {/* Integration Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrationConnectors.map((pipe, idx) => (
          <div key={idx} className="bg-white p-5 rounded-lg shadow-xs border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#123B63]">{pipe.service}</span>
              <span
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                  pipe.status === 'CONNECTED'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : pipe.status === 'PROTOTYPE ACTIVE'
                    ? 'bg-blue-100 text-blue-900 border border-blue-300'
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
