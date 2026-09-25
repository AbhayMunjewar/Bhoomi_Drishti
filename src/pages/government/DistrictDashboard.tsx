import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useMapStore } from '../../stores/mapStore';
import { MOCK_DISTRICT_KPI, MOCK_RISK_BREAKDOWN, MOCK_EVIDENCE_CARDS, MOCK_DATA_CONFLICTS } from '../../data/mockGovernment';
import { LandGovernanceMap } from '../../components/maps/LandGovernanceMap';
import { EvidenceCard } from '../../components/common/EvidenceCard';
import { DataConflictCard } from '../../components/common/DataConflictCard';
import { ReportGeneratorModal } from '../../components/common/ReportGeneratorModal';
import { LandUseTrendChart } from '../../components/charts/LandUseTrendChart';
import {
  MapPin,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle,
  FileText,
  Filter,
  Layers,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

export const DistrictDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { selectedRegion, selectedDistrict, setSelectedDistrict } = useMapStore();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="space-y-6 select-none">
      
      {/* Top Header & Filters Bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-md border border-[#D9DEE5] shadow-2xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D5D91] bg-[#1D5D91]/10 px-2 py-0.5 rounded">
            Government Portal &bull; District Level
          </span>
          <h2 className="text-xl font-bold text-[#123B63] font-serif mt-1">
            District Land Governance Dashboard
          </h2>
          <p className="text-xs text-[#5B6573]">
            Assigned Jurisdiction: <strong className="text-[#123B63]">{user?.jurisdictionDistrict || 'Nagpur'} District, {user?.jurisdictionState || 'Maharashtra'}</strong>
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1 bg-[#F5F7F9] px-2.5 py-1.5 rounded border border-[#D9DEE5]">
            <Filter className="w-3.5 h-3.5 text-[#1D5D91]" />
            <span className="font-semibold text-slate-700">District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-transparent font-bold text-[#123B63] focus:outline-none"
            >
              <option value="Nagpur">Nagpur</option>
              <option value="Mumbai Suburban">Mumbai Suburban</option>
              <option value="Thane">Thane</option>
              <option value="Raigad">Raigad</option>
              <option value="Pune">Pune</option>
              <option value="Solapur">Solapur</option>
            </select>
          </div>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-3.5 py-1.5 rounded font-bold text-xs shadow-2xs transition-colors flex items-center space-x-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#C98A18]" />
            <span>Generate Evidence Report</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD KPI CARDS matching user reference image */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-xs">
        
        <div className="govt-card p-3 rounded-md border border-[#D9DEE5]">
          <span className="text-[10px] text-slate-500 font-semibold block truncate">Total Area</span>
          <p className="text-base font-black text-[#123B63] mt-0.5">12,432 <span className="text-[10px] font-normal text-slate-500">sq.km</span></p>
        </div>

        <div className="govt-card p-3 rounded-md border border-[#D9DEE5]">
          <span className="text-[10px] text-slate-500 font-semibold block truncate">Agricultural Land</span>
          <p className="text-base font-black text-[#2E6B45] mt-0.5">8,124 <span className="text-[10px] font-normal text-slate-500">sq.km</span></p>
        </div>

        <div className="govt-card p-3 rounded-md border border-[#D9DEE5]">
          <span className="text-[10px] text-slate-500 font-semibold block truncate">Urban Land</span>
          <p className="text-base font-black text-[#1D5D91] mt-0.5">2,341 <span className="text-[10px] font-normal text-slate-500">sq.km</span></p>
        </div>

        <div className="govt-card p-3 rounded-md border border-[#D9DEE5]">
          <span className="text-[10px] text-slate-500 font-semibold block truncate">Active Projects</span>
          <p className="text-base font-black text-[#C98A18] mt-0.5">28</p>
        </div>

        <div className="govt-card p-3 rounded-md border border-[#D9DEE5]">
          <span className="text-[10px] text-slate-500 font-semibold block truncate">Land Disputes</span>
          <p className="text-base font-black text-[#A33A32] mt-0.5">14</p>
        </div>

        <div className="govt-card p-3 rounded-md border border-[#D9DEE5]">
          <span className="text-[10px] text-slate-500 font-semibold block truncate">Climate Risk</span>
          <p className="text-base font-black text-[#A33A32] mt-0.5">High</p>
        </div>

        <div className="govt-card p-3 rounded-md border border-[#D9DEE5]">
          <span className="text-[10px] text-slate-500 font-semibold block truncate">Data Quality</span>
          <p className="text-base font-black text-[#2E6B45] mt-0.5">92%</p>
        </div>

        <div className="govt-card p-3 rounded-md border border-[#D9DEE5]">
          <span className="text-[10px] text-slate-500 font-semibold block truncate">Land-use Change</span>
          <p className="text-base font-black text-[#1D5D91] mt-0.5">+6.2%</p>
        </div>

      </div>

      {/* MAIN LAYOUT: LEFT GIS MAP | RIGHT RISK SUMMARY CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT GIS MAP */}
        <div className="lg:col-span-8 space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-[#123B63] flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-[#1D5D91]" />
              <span>District Land Governance Map</span>
            </h3>
            <span className="text-[11px] text-slate-500">Live Satellite Vector Overlay</span>
          </div>

          <LandGovernanceMap />
        </div>

        {/* RIGHT RISK SUMMARY CARD matching user reference image */}
        <div className="lg:col-span-4 bg-white p-5 rounded-lg border border-[#D9DEE5] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="font-bold text-sm text-[#123B63]">Risk Summary</h3>
            <span className="text-[10px] text-slate-500 font-mono">ID: NGP-RISK-2026</span>
          </div>

          {/* Big Risk Circular Indicator */}
          <div className="flex items-center justify-center p-4 bg-[#F5F7F9] rounded-lg border border-slate-200">
            <div className="relative w-28 h-28 flex items-center justify-center rounded-full border-8 border-[#A33A32]/20 bg-white">
              <div className="text-center">
                <span className="text-2xl font-black text-[#A33A32] block">78%</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#A33A32]">HIGH RISK</span>
              </div>
            </div>
          </div>

          {/* Breakdown of Risk Factors */}
          <div className="space-y-2 text-xs">
            <p className="font-bold text-[#123B63] text-[11px] uppercase tracking-wider">Risk Factor Breakdown:</p>
            
            <div className="space-y-1.5">
              <div>
                <div className="flex justify-between text-[11px] text-slate-700 font-medium">
                  <span>Population Pressure</span>
                  <span className="font-bold text-[#A33A32]">82%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-[#A33A32] h-full" style={{ width: '82%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-700 font-medium">
                  <span>Land-use Change Rate</span>
                  <span className="font-bold text-[#A33A32]">76%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-[#A33A32] h-full" style={{ width: '76%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-700 font-medium">
                  <span>Climate Vulnerability (IMD)</span>
                  <span className="font-bold text-[#C98A18]">68%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-[#C98A18] h-full" style={{ width: '68%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-700 font-medium">
                  <span>Infrastructure Stress</span>
                  <span className="font-bold text-[#C98A18]">71%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-[#C98A18] h-full" style={{ width: '71%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-700 font-medium">
                  <span>Data Record Conflicts</span>
                  <span className="font-bold text-[#2E6B45]">55%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-[#2E6B45] h-full" style={{ width: '55%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <a
            href="/government/risk"
            className="w-full block text-center bg-[#123B63] hover:bg-[#1D5D91] text-white py-2 rounded text-xs font-bold transition-colors shadow-2xs"
          >
            Inspect AI Land Risk Analysis Details
          </a>
        </div>

      </div>

      {/* LOWER SECTION: LAND USE TRENDS | EVIDENCE CARDS | DATA CONFLICTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Land-use Trend Chart */}
        <div className="lg:col-span-6 bg-white p-5 rounded-lg border border-[#D9DEE5] shadow-xs space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-sm text-[#123B63]">Land-use Trends (2020–2026)</h4>
            <span className="text-[10px] text-slate-500">Sq. Kilometers</span>
          </div>

          <LandUseTrendChart />
        </div>

        {/* AI Evidence Card */}
        <div className="lg:col-span-6 space-y-3">
          <h4 className="font-bold text-sm text-[#123B63]">AI Evidence Decision Support</h4>
          <EvidenceCard
            data={MOCK_EVIDENCE_CARDS[0]}
            onViewSources={() => (window.location.href = '/government/research-evidence')}
          />
        </div>

      </div>

      {/* DATA CONFLICT DETECTOR */}
      <div className="space-y-3">
        <h4 className="font-bold text-sm text-[#123B63]">Flagged Data Discrepancies & Conflict Detector</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataConflictCard item={MOCK_DATA_CONFLICTS[0]} />
          <DataConflictCard item={MOCK_DATA_CONFLICTS[1]} />
        </div>
      </div>

      {/* Report Generator Modal */}
      <ReportGeneratorModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        district={selectedDistrict}
        state="Maharashtra"
      />

    </div>
  );
};
