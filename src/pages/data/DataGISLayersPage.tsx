import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Search,
  Filter,
  Layers,
  ChevronRight,
  Globe2,
  Lock,
  Plus
} from 'lucide-react';
import { MOCK_OFFICER_GIS_LAYERS } from '../../data/mockDataOfficer';

export const DataGISLayersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredLayers = MOCK_OFFICER_GIS_LAYERS.filter((lyr) => {
    const matchesSearch =
      lyr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lyr.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || lyr.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#123B63] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              GIS SPATIAL REGISTRY
            </span>
            <span className="text-slate-500 text-xs font-semibold">PostGIS Vector & Raster Catalogue</span>
          </div>
          <h1 className="text-xl font-bold text-[#123B63] mt-1">Spatial GIS Layers</h1>
          <p className="text-slate-600 text-xs mt-1">
            Manage vector polygons, lines, points, and raster grids available across BhoomiDrishti modules.
          </p>
        </div>

        <button
          onClick={() => navigate('/data/upload')}
          className="flex items-center space-x-2 bg-[#123B63] hover:bg-[#1D5D91] text-white px-4 py-2 rounded text-xs font-bold transition shadow-xs self-start md:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C98A18]" />
          <span>Import New GIS Layer</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search GIS layer name, source, or spatial feature..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#1D5D91]"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-semibold text-slate-700"
        >
          <option value="ALL">All Layer Groups</option>
          <option value="BOUNDARIES">Boundaries</option>
          <option value="LAND">Land Use / LULC</option>
          <option value="CLIMATE">Climate</option>
          <option value="ENVIRONMENT">Environment & Flood</option>
          <option value="INFRASTRUCTURE">Infrastructure</option>
          <option value="RESEARCH">Research</option>
        </select>
      </div>

      {/* GIS Layers Table */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold uppercase text-[10px]">
                <th className="p-3">Layer Name & Group</th>
                <th className="p-3">Type & Geometry</th>
                <th className="p-3">Source & CRS</th>
                <th className="p-3">Features & Extent</th>
                <th className="p-3">Visibility</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px]">
              {filteredLayers.map((lyr) => (
                <tr key={lyr.id} className="hover:bg-slate-50">
                  <td className="p-3 space-y-0.5">
                    <span className="font-bold text-slate-800 block text-xs">{lyr.name}</span>
                    <span className="text-[10px] font-bold text-[#1D5D91] uppercase">{lyr.category}</span>
                  </td>

                  <td className="p-3">
                    <p className="font-semibold text-slate-800">{lyr.type}</p>
                    <p className="text-[10px] text-slate-500">{lyr.geometryType}</p>
                  </td>

                  <td className="p-3">
                    <p className="font-medium text-slate-700">{lyr.source}</p>
                    <p className="text-[10px] font-mono text-slate-500">{lyr.crs}</p>
                  </td>

                  <td className="p-3">
                    <p className="font-bold text-slate-800">{lyr.featureCount} Features</p>
                    <p className="text-[10px] text-slate-500">{lyr.coverage}</p>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        lyr.visibility === 'Public'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {lyr.visibility}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        lyr.status === 'Available'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {lyr.status}
                    </span>
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => navigate(`/data/gis-layers/${lyr.id}`)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-[#123B63] hover:text-white text-slate-700 font-bold rounded text-[10px] transition inline-flex items-center space-x-1 border border-slate-300"
                    >
                      <MapPin className="w-3 h-3 text-[#C98A18]" />
                      <span>Map Preview</span>
                    </button>
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
