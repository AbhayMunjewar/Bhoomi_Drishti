import React, { useState } from 'react';
import { CloudRain, Thermometer, ShieldCheck, MapPin, AlertCircle, BarChart2, Filter } from 'lucide-react';
import { PUBLIC_CLIMATE_DATA, DistrictClimateData } from '../../data/mockPublic';
import { PublicGISMap } from '../../components/maps/PublicGISMap';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const PublicClimatePage: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Nagpur');

  const districtData = PUBLIC_CLIMATE_DATA.find(d => d.district === selectedDistrict) || PUBLIC_CLIMATE_DATA[0];

  const chartData = PUBLIC_CLIMATE_DATA.map(d => ({
    district: d.district,
    Actual: d.rainfallActualMm,
    Normal: d.rainfallNormalMm,
    Departure: d.departurePercentage
  }));

  return (
    <div className="space-y-6 select-none">
      {/* Header Notice */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-sky-700 text-xs font-bold uppercase tracking-wider mb-1">
              <CloudRain className="w-4 h-4 text-[#0284c7]" />
              <span>Public Spatial Climate & Disaster Risk Portal</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63]">
              Land Governance Climate Indicators
            </h1>
            <p className="text-xs text-slate-600 max-w-3xl">
              Monitor operational rainfall departures, Standardized Precipitation Index (SPI) drought categories, flood hazard zones, and surface temperatures affecting land suitability.
            </p>
          </div>
          <DataSourceBadge status="OFFICIAL_SOURCE" size="md" />
        </div>
      </div>

      {/* Critical Disclaimer Banner */}
      <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl text-xs text-amber-900 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-amber-950">Official Source Notice & Non-Warning Declaration</h4>
          <p className="leading-relaxed">
            Climate indicators displayed on this portal combine operational feeds from the <strong>India Meteorological Department (IMD)</strong> with spatial analytics processed by BhoomiDrishti. BhoomiDrishti-derived risk scores are research and planning support indicators only and DO NOT constitute official emergency government warnings. For statutory disaster warnings, refer to IMD and State Disaster Management Authorities.
          </p>
        </div>
      </div>

      {/* District Selector & Details Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-3">
            <label className="font-bold text-xs text-[#123B63]">Select District Profile:</label>
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs font-bold text-[#1D5D91] focus:outline-none focus:border-[#1D5D91]"
            >
              {PUBLIC_CLIMATE_DATA.map((d, idx) => (
                <option key={idx} value={d.district}>{d.district}</option>
              ))}
            </select>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Last Synced: {districtData.lastUpdated}
          </div>
        </div>

        {/* Selected District Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Actual Rainfall</span>
            <span className="text-lg font-bold text-[#0284c7]">{districtData.rainfallActualMm} mm</span>
            <span className="text-[10px] text-slate-500 block">Monsoon Season</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Normal Baseline</span>
            <span className="text-lg font-bold text-slate-700">{districtData.rainfallNormalMm} mm</span>
            <span className="text-[10px] text-slate-500 block">30-Year Average</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Departure %</span>
            <span className={`text-lg font-bold ${districtData.departurePercentage >= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
              {districtData.departurePercentage > 0 ? '+' : ''}{districtData.departurePercentage}%
            </span>
            <span className="text-[10px] text-slate-500 block">IMD Deviation</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">SPI Drought Status</span>
            <span className="text-sm font-bold text-[#C98A18] block mt-1">{districtData.spiDroughtCategory}</span>
            <span className="text-[10px] text-slate-500 block">3-Month SPI</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Flood Hazard Level</span>
            <span className={`text-sm font-bold block mt-1 ${districtData.floodHazard === 'Very High' ? 'text-red-700' : 'text-slate-800'}`}>
              {districtData.floodHazard}
            </span>
            <span className="text-[10px] text-slate-500 block">Terrain Inundation</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Temperature Range</span>
            <span className="text-sm font-bold text-orange-700 block mt-1">
              {districtData.tempMaxC}°C / {districtData.tempMinC}°C
            </span>
            <span className="text-[10px] text-slate-500 block">Max / Min</span>
          </div>
        </div>
      </div>

      {/* Interactive GIS Map */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-[#123B63]">Spatial Climate Information Map</h3>
        <PublicGISMap height="500px" initialDistrict={selectedDistrict} />
      </div>

      {/* Bar Chart Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-base font-bold text-[#123B63] border-b border-slate-100 pb-2">Monsoon Rainfall vs Normal Baseline Across Districts</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="district" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(val: any) => [`${val} mm`, 'Rainfall']} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="Actual" fill="#0284c7" name="Recorded Actual (mm)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Normal" fill="#94a3b8" name="Climatological Normal (mm)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
