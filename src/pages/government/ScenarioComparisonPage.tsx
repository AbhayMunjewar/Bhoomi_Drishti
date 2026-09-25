import React from 'react';
import { MOCK_SCENARIOS } from '../../data/mockPolicy';
import { ScenarioComparisonChart } from '../../components/charts/ScenarioComparisonChart';
import { ScenarioMap } from '../../components/maps/ScenarioMap';
import { BarChart3, ArrowLeft, CheckCircle, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ScenarioComparisonPage: React.FC = () => {
  return (
    <div className="space-y-6 select-none">
      
      {/* Top Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-md border border-[#D9DEE5] shadow-2xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D5D91] bg-[#1D5D91]/10 px-2 py-0.5 rounded">
            Government Portal &bull; Policy Analytics
          </span>
          <h2 className="text-xl font-bold text-[#123B63] font-serif mt-1">
            Policy Scenario Side-by-Side Comparison
          </h2>
          <p className="text-xs text-[#5B6573]">
            Comparative evaluation of baseline, proposed, and alternative land governance policies
          </p>
        </div>

        <Link
          to="/government/policy/simulator"
          className="border border-[#1D5D91] text-[#1D5D91] hover:bg-[#1D5D91] hover:text-white px-3.5 py-1.5 rounded font-bold text-xs transition-colors flex items-center space-x-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Simulator</span>
        </Link>
      </div>

      {/* THREE SCENARIOS COMPARISON CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        
        {/* Scenario A Card */}
        <div className="bg-white p-5 rounded-lg border-2 border-[#A33A32]/60 shadow-xs space-y-3">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="font-bold text-xs text-[#A33A32] uppercase">Scenario A</span>
            <span className="govt-badge bg-[#A33A32]/10 text-[#A33A32]">Baseline</span>
          </div>
          <h3 className="font-bold text-sm text-[#123B63]">{MOCK_SCENARIOS['Scenario A'].scenarioName}</h3>
          <p className="text-slate-600 text-[11px] leading-relaxed">{MOCK_SCENARIOS['Scenario A'].description}</p>
          
          <div className="space-y-1.5 bg-[#F5F7F9] p-3 rounded border border-slate-200">
            <div className="flex justify-between"><span>Land Affected:</span><strong className="text-[#123B63]">{MOCK_SCENARIOS['Scenario A'].landAffectedHectares} ha</strong></div>
            <div className="flex justify-between"><span>Population Affected:</span><strong className="text-[#123B63]">{MOCK_SCENARIOS['Scenario A'].populationAffectedLakhs} Lakh</strong></div>
            <div className="flex justify-between"><span>Overall Risk:</span><strong className="text-[#A33A32]">{MOCK_SCENARIOS['Scenario A'].overallRiskScorePct}%</strong></div>
          </div>
        </div>

        {/* Scenario B Card */}
        <div className="bg-white p-5 rounded-lg border-2 border-[#C98A18]/80 shadow-xs space-y-3">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="font-bold text-xs text-[#C98A18] uppercase">Scenario B</span>
            <span className="govt-badge bg-[#C98A18]/10 text-[#C98A18]">Proposed</span>
          </div>
          <h3 className="font-bold text-sm text-[#123B63]">{MOCK_SCENARIOS['Scenario B'].scenarioName}</h3>
          <p className="text-slate-600 text-[11px] leading-relaxed">{MOCK_SCENARIOS['Scenario B'].description}</p>

          <div className="space-y-1.5 bg-[#F5F7F9] p-3 rounded border border-slate-200">
            <div className="flex justify-between"><span>Land Affected:</span><strong className="text-[#123B63]">{MOCK_SCENARIOS['Scenario B'].landAffectedHectares} ha</strong></div>
            <div className="flex justify-between"><span>Population Affected:</span><strong className="text-[#123B63]">{MOCK_SCENARIOS['Scenario B'].populationAffectedLakhs} Lakh</strong></div>
            <div className="flex justify-between"><span>Overall Risk:</span><strong className="text-[#C98A18]">{MOCK_SCENARIOS['Scenario B'].overallRiskScorePct}%</strong></div>
          </div>
        </div>

        {/* Scenario C Card */}
        <div className="bg-white p-5 rounded-lg border-2 border-[#2E6B45]/80 shadow-xs space-y-3">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="font-bold text-xs text-[#2E6B45] uppercase">Scenario C</span>
            <span className="govt-badge bg-[#2E6B45]/10 text-[#2E6B45]">Conservation</span>
          </div>
          <h3 className="font-bold text-sm text-[#123B63]">{MOCK_SCENARIOS['Scenario C'].scenarioName}</h3>
          <p className="text-slate-600 text-[11px] leading-relaxed">{MOCK_SCENARIOS['Scenario C'].description}</p>

          <div className="space-y-1.5 bg-[#F5F7F9] p-3 rounded border border-slate-200">
            <div className="flex justify-between"><span>Land Affected:</span><strong className="text-[#123B63]">{MOCK_SCENARIOS['Scenario C'].landAffectedHectares} ha</strong></div>
            <div className="flex justify-between"><span>Population Affected:</span><strong className="text-[#123B63]">{MOCK_SCENARIOS['Scenario C'].populationAffectedLakhs} Lakh</strong></div>
            <div className="flex justify-between"><span>Overall Risk:</span><strong className="text-[#2E6B45]">{MOCK_SCENARIOS['Scenario C'].overallRiskScorePct}%</strong></div>
          </div>
        </div>

      </div>

      {/* MAP & CHART COMPARISON GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-2">
          <h4 className="font-bold text-sm text-[#123B63]">Scenario Spatial Impact Map</h4>
          <ScenarioMap />
        </div>

        <div className="lg:col-span-6 bg-white p-5 rounded-lg border border-[#D9DEE5] shadow-xs space-y-3">
          <h4 className="font-bold text-sm text-[#123B63]">Comparative Indicator Metrics</h4>
          <ScenarioComparisonChart />
        </div>
      </div>

    </div>
  );
};
