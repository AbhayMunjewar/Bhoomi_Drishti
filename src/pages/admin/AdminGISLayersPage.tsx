import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Search, Filter, Layers, Globe2, ShieldCheck, Eye, RefreshCw, Lock } from 'lucide-react';
import { MOCK_ADMIN_GIS_LAYERS, AdminGISLayerItem } from '../../data/mockAdmin';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const AdminGISLayersPage: React.FC = () => {
  const navigate = useNavigate();
  const [layers, setLayers] = useState<AdminGISLayerItem[]>(MOCK_ADMIN_GIS_LAYERS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVisibility, setSelectedVisibility] = useState<string>('All');

  const filteredLayers = layers.filter(lyr => {
    const matchesSearch =
      lyr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lyr.source.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesVis = selectedVisibility === 'All' || lyr.visibility === selectedVisibility;

    return matchesSearch && matchesVis;
  });

  const totals = {
    total: layers.length,
    published: layers.filter(l => l.status === 'Published').length,
    restricted: layers.filter(l => l.status === 'Restricted').length
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#1D5D91] text-xs font-bold uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4 text-[#C98A18]" />
              <span>Platform GIS Administration</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63]">
              GIS Spatial Layer Access & Visibility Control
            </h1>
            <p className="text-xs text-slate-600 max-w-3xl">
              Administer spatial vector polygons, line features, and raster grids across BhoomiDrishti modules. Control public vs departmental visibility and inspect spatial geometry metadata.
            </p>
          </div>
          <DataSourceBadge status="PROTOTYPE_DERIVED" size="md" />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total GIS Layers</span>
          <span className="text-2xl font-bold text-[#123B63]">{totals.total}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Published Public</span>
          <span className="text-2xl font-bold text-emerald-700">{totals.published}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Restricted Departmental</span>
          <span className="text-2xl font-bold text-red-700">{totals.restricted}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search spatial layers by name or source..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#1D5D91] text-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Visibility Scope</label>
            <select
              value={selectedVisibility}
              onChange={e => setSelectedVisibility(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md py-1.5 px-2 text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="All">All Visibility Scopes</option>
              <option value="Public">Public Access</option>
              <option value="Departmental Only">Departmental Only</option>
              <option value="Admin Only">Admin Only</option>
            </select>
          </div>

          <div className="flex items-end col-span-2">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedVisibility('All');
              }}
              className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md border border-slate-300 transition-colors flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Layers Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold">
                <th className="p-2.5">Spatial Layer Name</th>
                <th className="p-2.5">Feature Type</th>
                <th className="p-2.5">Source</th>
                <th className="p-2.5">Feature Count</th>
                <th className="p-2.5">Visibility Scope</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLayers.map(lyr => (
                <tr key={lyr.id} className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-[#123B63]">
                    <Link to={`/admin/gis-layers/${lyr.id}`} className="hover:underline">{lyr.name}</Link>
                    <div className="text-[10px] text-slate-500 font-normal">CRS: EPSG:4326 • Updated: {lyr.lastUpdated}</div>
                  </td>
                  <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-medium">{lyr.type}</span></td>
                  <td className="p-2.5 text-slate-700 font-medium max-w-[180px] truncate">{lyr.source}</td>
                  <td className="p-2.5 font-mono text-slate-800">{lyr.featureCount}</td>
                  <td className="p-2.5 font-semibold text-slate-800">{lyr.visibility}</td>
                  <td className="p-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      lyr.status === 'Published' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                    }`}>
                      {lyr.status}
                    </span>
                  </td>
                  <td className="p-2.5 text-right">
                    <Link
                      to={`/admin/gis-layers/${lyr.id}`}
                      className="px-3 py-1 bg-[#1D5D91] hover:bg-[#123B63] text-white font-bold rounded text-[11px] inline-flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>GIS Preview & Edit</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
