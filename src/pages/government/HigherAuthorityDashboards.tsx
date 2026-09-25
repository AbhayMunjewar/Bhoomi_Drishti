import React, { useState } from 'react';
import { MOCK_DISTRICT_KPI } from '../../data/mockGovernment';
import { LandGovernanceMap } from '../../components/maps/LandGovernanceMap';
import { Building, MapPin, Search, ArrowRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const districtComparisonTable = [
  { district: 'Raigad', riskLevel: 'VERY HIGH', riskScore: 84.7, landUseChange: '+8.4%', activeProjects: 9, alertCount: 5, dataQuality: '86%' },
  { district: 'Mumbai Suburban', riskLevel: 'HIGH', riskScore: 69.9, landUseChange: '+7.2%', activeProjects: 28, alertCount: 8, dataQuality: '92%' },
  { district: 'Thane', riskLevel: 'MODERATE', riskScore: 62.4, landUseChange: '+5.8%', activeProjects: 18, alertCount: 4, dataQuality: '89%' },
  { district: 'Nagpur', riskLevel: 'LOW', riskScore: 28.3, landUseChange: '+3.1%', activeProjects: 12, alertCount: 1, dataQuality: '94%' },
  { district: 'Pune', riskLevel: 'LOW', riskScore: 22.9, landUseChange: '+4.2%', activeProjects: 34, alertCount: 2, dataQuality: '96%' },
  { district: 'Solapur', riskLevel: 'LOW', riskScore: 15.0, landUseChange: '+1.5%', activeProjects: 7, alertCount: 0, dataQuality: '91%' },
];

export const StateDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDistricts = districtComparisonTable.filter((d) =>
    d.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 select-none">
      
      {/* State Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-md border border-[#D9DEE5] shadow-2xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D5D91] bg-[#1D5D91]/10 px-2 py-0.5 rounded">
            Government Portal &bull; State Authority
          </span>
          <h2 className="text-xl font-bold text-[#123B63] font-serif mt-1">
            Maharashtra State Land Governance & Risk Heatmap
          </h2>
          <p className="text-xs text-[#5B6573]">
            Multi-district monitoring, land-use change vector analysis & priority resource allocation
          </p>
        </div>

        <div className="text-right text-xs">
          <span className="font-bold text-[#123B63] block">36 Districts Monitored</span>
          <span className="text-slate-500 font-mono">Department of Revenue & Land Reforms</span>
        </div>
      </div>

      {/* State Map */}
      <div className="space-y-2">
        <h3 className="font-bold text-sm text-[#123B63]">State Overview GIS Heatmap</h3>
        <LandGovernanceMap />
      </div>

      {/* District Comparison Table */}
      <div className="bg-white p-5 rounded-lg border border-[#D9DEE5] shadow-xs space-y-4 text-xs">
        <div className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-200 pb-3">
          <h3 className="font-bold text-sm text-[#123B63]">District-wise Vulnerability & Project Comparison</h3>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Filter district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1 bg-[#F5F7F9] border border-[#D9DEE5] rounded text-xs focus:outline-none focus:border-[#1D5D91] w-48"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F5F7F9] text-[#123B63] font-bold border-b border-[#D9DEE5]">
                <th className="p-2.5">District</th>
                <th className="p-2.5">Risk Level</th>
                <th className="p-2.5">Risk Score</th>
                <th className="p-2.5">Land-use Change Rate</th>
                <th className="p-2.5">Active Projects</th>
                <th className="p-2.5">Alerts</th>
                <th className="p-2.5">Data Quality</th>
                <th className="p-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDistricts.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-[#123B63]">{row.district}</td>
                  <td className="p-2.5">
                    <span className={`govt-badge ${
                      row.riskLevel === 'VERY HIGH' || row.riskLevel === 'HIGH'
                        ? 'bg-[#A33A32]/10 text-[#A33A32] border border-[#A33A32]/30'
                        : row.riskLevel === 'MODERATE'
                        ? 'bg-[#A56A00]/10 text-[#A56A00] border border-[#A56A00]/30'
                        : 'bg-[#2E6B45]/10 text-[#2E6B45] border border-[#2E6B45]/30'
                    }`}>
                      {row.riskLevel}
                    </span>
                  </td>
                  <td className="p-2.5 font-mono font-bold text-slate-800">{row.riskScore}%</td>
                  <td className="p-2.5 font-mono text-[#1D5D91] font-semibold">{row.landUseChange}</td>
                  <td className="p-2.5 font-bold text-slate-700">{row.activeProjects}</td>
                  <td className="p-2.5 font-mono font-bold text-[#A33A32]">{row.alertCount}</td>
                  <td className="p-2.5 font-mono font-bold text-[#2E6B45]">{row.dataQuality}</td>
                  <td className="p-2.5 text-right">
                    <Link
                      to="/government/district"
                      className="text-[#1D5D91] font-bold hover:underline inline-flex items-center space-x-1"
                    >
                      <span>Drill-down</span>
                      <ArrowRight className="w-3 h-3" />
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

export const NationalDashboard: React.FC = () => {
  return (
    <div className="space-y-6 select-none">
      <div className="bg-white p-4 rounded-md border border-[#D9DEE5] shadow-2xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D5D91] bg-[#1D5D91]/10 px-2 py-0.5 rounded">
          Government Portal &bull; National Authority
        </span>
        <h2 className="text-xl font-bold text-[#123B63] font-serif mt-1">
          National Land Governance Overview & Inter-State Benchmarking
        </h2>
        <p className="text-xs text-[#5B6573]">
          NITI Aayog & Ministry of Housing & Urban Affairs National Decision Support System
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-white p-4 rounded-lg border border-[#D9DEE5]">
          <span className="text-slate-500 font-semibold block">Total Monitored States</span>
          <p className="text-2xl font-black text-[#123B63] mt-1">28 States / 8 UTs</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#D9DEE5]">
          <span className="text-slate-500 font-semibold block">High Vulnerability Corridors</span>
          <p className="text-2xl font-black text-[#A33A32] mt-1">42 Districts</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#D9DEE5]">
          <span className="text-slate-500 font-semibold block">Harmonized Digitized Parcels</span>
          <p className="text-2xl font-black text-[#2E6B45] mt-1">3.4 Crore</p>
        </div>
      </div>

      <LandGovernanceMap />
    </div>
  );
};
