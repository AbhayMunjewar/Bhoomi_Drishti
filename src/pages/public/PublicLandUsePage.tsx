import React, { useState } from 'react';
import { Layers, MapPin, TrendingUp, Filter, BarChart3, ArrowRight, Download, ShieldCheck } from 'lucide-react';
import { PUBLIC_LAND_USE_DATA, DistrictLandUseData } from '../../data/mockPublic';
import { PublicGISMap } from '../../components/maps/PublicGISMap';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const PublicLandUsePage: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('2025');

  const filteredData = selectedDistrict === 'All'
    ? PUBLIC_LAND_USE_DATA
    : PUBLIC_LAND_USE_DATA.filter(d => d.district === selectedDistrict);

  // Bar chart format
  const chartData = filteredData.map(d => ({
    district: d.district,
    Agriculture: d.agriculturalAreaKm2,
    Forest: d.forestAreaKm2,
    BuiltUp: d.builtUpAreaKm2,
    Water: d.waterBodyAreaKm2,
    Barren: d.barrenLandKm2
  }));

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#84cc16] text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4 text-[#2E6B45]" />
              <span>Public Spatial Land-Use Analytics Portal</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63]">
              Land Use & Land Cover (LULC) Trends
            </h1>
            <p className="text-xs text-slate-600 max-w-3xl">
              Track spatial changes in agricultural cropland, reserved forest cover, urban expansion, and surface water bodies across districts in Maharashtra.
            </p>
          </div>
          <DataSourceBadge status="OFFICIAL_SOURCE" size="md" />
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">State</label>
            <select className="bg-slate-50 border border-slate-300 rounded px-3 py-1.5 font-medium text-slate-800 focus:outline-none">
              <option>Maharashtra</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">District</label>
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded px-3 py-1.5 font-medium text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="All">All Maharashtra Districts</option>
              {PUBLIC_LAND_USE_DATA.map((d, idx) => (
                <option key={idx} value={d.district}>{d.district}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded px-3 py-1.5 font-medium text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="2025">2025 LULC Classification</option>
              <option value="2020">2020 LULC Classification</option>
            </select>
          </div>
        </div>

        <span className="text-slate-400">Classification Scale: <strong>1:50,000 Vector</strong></span>
      </div>

      {/* Interactive Map Section */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-[#123B63]">Spatial Land Use Distribution Map</h3>
        <PublicGISMap height="520px" initialDistrict={selectedDistrict} />
      </div>

      {/* Charts Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#123B63] border-b border-slate-100 pb-2">District LULC Acreage Comparison (km²)</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="district" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(val: any) => [`${Number(val).toLocaleString()} km²`, 'Area']} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="Agriculture" fill="#84cc16" stackId="a" />
              <Bar dataKey="Forest" fill="#15803d" stackId="a" />
              <Bar dataKey="BuiltUp" fill="#dc2626" stackId="a" />
              <Bar dataKey="Water" fill="#0284c7" stackId="a" />
              <Bar dataKey="Barren" fill="#94a3b8" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* District Comparison Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-base font-bold text-[#123B63] border-b border-slate-100 pb-2">Detailed District LULC & 5-Year Urban Expansion Table</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold">
                <th className="p-2.5">District</th>
                <th className="p-2.5">Agri (km²)</th>
                <th className="p-2.5">Forest (km²)</th>
                <th className="p-2.5">Built-up (km²)</th>
                <th className="p-2.5">Water (km²)</th>
                <th className="p-2.5">Total Area (km²)</th>
                <th className="p-2.5">5-Yr Built-up Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-[#123B63]">{row.district}</td>
                  <td className="p-2.5 text-slate-800">{row.agriculturalAreaKm2.toLocaleString()}</td>
                  <td className="p-2.5 text-slate-800">{row.forestAreaKm2.toLocaleString()}</td>
                  <td className="p-2.5 font-bold text-red-700">{row.builtUpAreaKm2.toLocaleString()}</td>
                  <td className="p-2.5 text-slate-800">{row.waterBodyAreaKm2.toLocaleString()}</td>
                  <td className="p-2.5 font-mono text-slate-600">{row.totalAreaKm2.toLocaleString()}</td>
                  <td className="p-2.5 font-bold text-[#1D5D91]">+{row.builtUpChangePercentage5Yr}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Source Attribution */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <span>Source & Methodology: NRSC Bhuvan Multispectral Classification (Sentinel-2 10m spatial resolution).</span>
        <DataSourceBadge status="OFFICIAL_SOURCE" size="sm" />
      </div>
    </div>
  );
};
