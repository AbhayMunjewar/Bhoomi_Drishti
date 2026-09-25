import React from 'react';
import { MapPin, Globe2, ShieldCheck, Download, Filter } from 'lucide-react';
import { PublicGISMap } from '../../components/maps/PublicGISMap';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const PublicGISMapPage: React.FC = () => {
  return (
    <div className="space-y-6 select-none">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#1D5D91] text-xs font-bold uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4 text-[#C98A18]" />
              <span>Approved National Spatial Information Portal</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63]">
              Public Approved GIS Information Map
            </h1>
            <p className="text-xs text-slate-600 max-w-3xl">
              Explore public land-use vectors, IMD operational rainfall grids, infrastructure lines, and published research site coordinates. Strictly excludes restricted departmental layers, private land-owner titles, and internal policy scenario drafts.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <DataSourceBadge status="OFFICIAL_SOURCE" size="md" />
            <DataSourceBadge status="PROTOTYPE_DERIVED" size="md" />
          </div>
        </div>
      </div>

      {/* Main Full-Featured GIS Map */}
      <PublicGISMap height="720px" />

      {/* Methodology & Data Governance Footer */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-[#123B63] flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Spatial Data Governance & Privacy Framework</span>
        </h4>
        <p className="leading-relaxed">
          Public spatial layers are filtered directly at the database gateway level. Restricted survey boundaries, pending land acquisition polygons, raw cadastral plot titles, and private contact information are strictly excluded from public vector endpoints. Spatial data is updated asynchronously from authorized feeds (NRSC Bhuvan, IMD, Survey of India, and PWD).
        </p>
      </div>
    </div>
  );
};
