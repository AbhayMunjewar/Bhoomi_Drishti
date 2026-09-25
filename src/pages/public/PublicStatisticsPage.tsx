import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download, Filter, Layers, CloudRain, Building2, BookOpen, RefreshCw } from 'lucide-react';
import {
  PUBLIC_LAND_USE_DATA,
  PUBLIC_CLIMATE_DATA,
  PUBLIC_RESEARCH_PAPERS,
  PUBLIC_PROJECTS
} from '../../data/mockPublic';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const PublicStatisticsPage: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('2025');

  // Filtered Land Use Data
  const filteredLulc = selectedDistrict === 'All'
    ? PUBLIC_LAND_USE_DATA
    : PUBLIC_LAND_USE_DATA.filter(d => d.district === selectedDistrict);

  // Filtered Climate Data
  const filteredClimate = selectedDistrict === 'All'
    ? PUBLIC_CLIMATE_DATA
    : PUBLIC_CLIMATE_DATA.filter(d => d.district === selectedDistrict);

  // Aggregated LULC totals
  const totalAgri = filteredLulc.reduce((acc, curr) => acc + curr.agriculturalAreaKm2, 0);
  const totalForest = filteredLulc.reduce((acc, curr) => acc + curr.forestAreaKm2, 0);
  const totalBuiltUp = filteredLulc.reduce((acc, curr) => acc + curr.builtUpAreaKm2, 0);
  const totalWater = filteredLulc.reduce((acc, curr) => acc + curr.waterBodyAreaKm2, 0);
  const totalBarren = filteredLulc.reduce((acc, curr) => acc + curr.barrenLandKm2, 0);

  const lulcPieData = [
    { name: 'Agricultural', value: Math.round(totalAgri), color: '#84cc16' },
    { name: 'Forest Area', value: Math.round(totalForest), color: '#15803d' },
    { name: 'Built-up', value: Math.round(totalBuiltUp), color: '#dc2626' },
    { name: 'Water Bodies', value: Math.round(totalWater), color: '#0284c7' },
    { name: 'Barren Land', value: Math.round(totalBarren), color: '#94a3b8' }
  ];

  // Land-use Change 5-Year Trend simulation (2015-2025)
  const landChangeTrend = [
    { year: '2015', Agri: 45200, Forest: 13100, BuiltUp: 4200, Water: 2500 },
    { year: '2018', Agri: 44300, Forest: 12850, BuiltUp: 5100, Water: 2480 },
    { year: '2021', Agri: 43400, Forest: 12600, BuiltUp: 5800, Water: 2470 },
    { year: '2025', Agri: totalAgri, Forest: totalForest, BuiltUp: totalBuiltUp, Water: totalWater }
  ];

  // Research Topic Distribution Data
  const researchTopicCounts = [
    { topic: 'Land Use & Zoning', count: 4 },
    { topic: 'Digital Land Governance', count: 3 },
    { topic: 'Climate & Drought', count: 3 },
    { topic: 'Remote Sensing / AI', count: 2 },
    { topic: 'Infrastructure Policy', count: 2 }
  ];

  const handleDownloadCsv = () => {
    const csvHeader = 'District,Agricultural_Km2,Forest_Km2,BuiltUp_Km2,Water_Km2,Barren_Km2\n';
    const csvRows = PUBLIC_LAND_USE_DATA.map(d =>
      `${d.district},${d.agriculturalAreaKm2},${d.forestAreaKm2},${d.builtUpAreaKm2},${d.waterBodyAreaKm2},${d.barrenLandKm2}`
    ).join('\n');

    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bhoomidrishti_public_land_statistics_2025.csv';
    a.click();
  };

  return (
    <div className="space-y-6 select-none">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-700 text-xs font-bold uppercase tracking-wider mb-1">
              <BarChart3 className="w-4 h-4 text-[#C98A18]" />
              <span>Public Spatial & Land Governance Statistics</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63]">
              National Land & Climate Statistics Dashboard
            </h1>
            <p className="text-xs text-slate-600 max-w-3xl">
              Explore interactive statistical charts on land use distribution (LULC), 10-year land-use conversion trends, IMD rainfall departure matrices, and research publication distributions.
            </p>
          </div>
          <button
            onClick={handleDownloadCsv}
            className="px-4 py-2 bg-[#1D5D91] hover:bg-[#123B63] text-white font-bold text-xs rounded-md shadow-xs transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV Data</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Filter District</label>
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
            <label className="font-bold text-slate-700 block mb-1">Select Year</label>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded px-3 py-1.5 font-medium text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="2025">2025 Baseline</option>
              <option value="2024">2024 Historical</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <DataSourceBadge status="OFFICIAL_SOURCE" size="sm" />
          <span className="text-slate-400">Time Period: <strong>2015 - 2025</strong></span>
        </div>
      </div>

      {/* A. Land Statistics Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LULC Pie Distribution */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-sm text-[#123B63] flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#84cc16]" />
              <span>A. Land Use Distribution (LULC Acreage)</span>
            </h3>
            <span className="text-[10px] text-slate-400">Total: {Math.round(totalAgri + totalForest + totalBuiltUp + totalWater + totalBarren).toLocaleString()} km²</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={lulcPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(1)}%`}
                >
                  {lulcPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${val.toLocaleString()} km²`, 'Area']} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* B. Land-use Change 10-Year Line Chart */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-sm text-[#123B63] flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#1D5D91]" />
              <span>B. 10-Year Land Conversion Trend (2015-2025)</span>
            </h3>
            <span className="text-[10px] text-slate-400">Area in km²</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={landChangeTrend}>
                <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(val: any) => [`${Math.round(Number(val)).toLocaleString()} km²`, 'Area']} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="Agri" stroke="#84cc16" strokeWidth={2} name="Agriculture" />
                <Line type="monotone" dataKey="Forest" stroke="#15803d" strokeWidth={2} name="Forest" />
                <Line type="monotone" dataKey="BuiltUp" stroke="#dc2626" strokeWidth={2.5} name="Built-up Urban" />
                <Line type="monotone" dataKey="Water" stroke="#0284c7" strokeWidth={2} name="Water Bodies" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* C. Climate & Infrastructure Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Climate Rainfall & Anomaly */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-sm text-[#123B63] flex items-center gap-1.5">
              <CloudRain className="w-4 h-4 text-[#0284c7]" />
              <span>C. District Rainfall & Normal Departure Matrix</span>
            </h3>
            <DataSourceBadge status="OFFICIAL_SOURCE" size="sm" />
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredClimate}>
                <XAxis dataKey="district" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(val: any) => [`${val} mm`, 'Rainfall']} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="rainfallActualMm" fill="#0284c7" name="Actual Rainfall (mm)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rainfallNormalMm" fill="#94a3b8" name="Normal Baseline (mm)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* E. Research Topics Distribution */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-sm text-[#123B63] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-purple-700" />
              <span>E. Published Research by Domain Category</span>
            </h3>
            <span className="text-[10px] text-slate-400">Total Papers Indexed</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={researchTopicCounts}>
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="topic" type="category" width={140} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#7c3aed" radius={[0, 4, 4, 0]} name="Publications" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart Provenance Footer */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <span>Source: India Meteorological Department (IMD) & NRSC Bhuvan LULC Classified Vector Services.</span>
        <span>Last Updated: <strong>2026-02-15</strong></span>
      </div>
    </div>
  );
};
