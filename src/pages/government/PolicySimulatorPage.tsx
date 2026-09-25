import React from 'react';
import { usePolicyStore } from '../../stores/policyStore';
import { ScenarioMap } from '../../components/maps/ScenarioMap';
import { Sliders, Play, RotateCcw, AlertTriangle, Layers, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PolicySimulatorPage: React.FC = () => {
  const { params, setParams, activeScenario, setActiveScenario, getScenarioData } = usePolicyStore();

  const scenarioData = getScenarioData();

  const handleRunSimulation = () => {
    alert(`Simulation executed for ${params.district}, ${params.state} over ${params.timeHorizonYears}-Year Time Horizon! Output updated.`);
  };

  return (
    <div className="space-y-6 select-none">
      
      {/* Page Title & Navigation Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-md border border-[#D9DEE5] shadow-2xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D5D91] bg-[#1D5D91]/10 px-2 py-0.5 rounded">
            Government Portal &bull; Policy Maker
          </span>
          <h2 className="text-xl font-bold text-[#123B63] font-serif mt-1">
            Policy Simulator & Scenario Analytics
          </h2>
          <p className="text-xs text-[#5B6573]">
            Simulate policy parameter changes on land use, climate vulnerability & infrastructure stress
          </p>
        </div>

        <Link
          to="/government/policy/scenario-comparison"
          className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-4 py-2 rounded font-bold text-xs shadow-2xs transition-colors flex items-center space-x-2"
        >
          <BarChart3 className="w-4 h-4 text-[#C98A18]" />
          <span>Open Full Scenario Comparison</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT matching user reference image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT PANEL: POLICY PARAMETERS */}
        <div className="lg:col-span-4 bg-white p-5 rounded-lg border border-[#D9DEE5] shadow-xs space-y-4 text-xs">
          <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
            <Sliders className="w-4 h-4 text-[#1D5D91]" />
            <h3 className="font-bold text-sm text-[#123B63]">Policy Parameters</h3>
          </div>

          {/* Policy Select */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Policy Regulation Framework:</label>
            <select
              value={params.policyType}
              onChange={(e) => setParams({ policyType: e.target.value })}
              className="w-full p-2 bg-[#F5F7F9] border border-[#D9DEE5] rounded font-semibold text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="Land-use conversion regulation">Land-use conversion regulation</option>
              <option value="Eco-Buffer & Floodplain Preservation">Eco-Buffer & Floodplain Preservation</option>
              <option value="Cadastral Boundary Dispute Resolution">Cadastral Boundary Dispute Resolution</option>
            </select>
          </div>

          {/* State Select */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">State:</label>
            <select
              value={params.state}
              onChange={(e) => setParams({ state: e.target.value })}
              className="w-full p-2 bg-[#F5F7F9] border border-[#D9DEE5] rounded font-semibold text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>
          </div>

          {/* District Select */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">District:</label>
            <select
              value={params.district}
              onChange={(e) => setParams({ district: e.target.value })}
              className="w-full p-2 bg-[#F5F7F9] border border-[#D9DEE5] rounded font-semibold text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="Nagpur">Nagpur</option>
              <option value="Thane">Thane</option>
              <option value="Raigad">Raigad</option>
              <option value="Pune">Pune</option>
            </select>
          </div>

          {/* Time Horizon */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Time Horizon:</label>
            <select
              value={params.timeHorizonYears}
              onChange={(e) => setParams({ timeHorizonYears: parseInt(e.target.value) })}
              className="w-full p-2 bg-[#F5F7F9] border border-[#D9DEE5] rounded font-semibold text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value={5}>5 Years (2026–2031)</option>
              <option value={10}>10 Years (2026–2036)</option>
              <option value={15}>15 Years (2026–2041)</option>
            </select>
          </div>

          {/* Slider 1: Urban Expansion (%) */}
          <div className="space-y-1 pt-2 border-t border-slate-200">
            <div className="flex justify-between font-semibold text-slate-700">
              <span>Urban Expansion Rate (%):</span>
              <span className="font-mono font-bold text-[#1D5D91]">{params.urbanExpansionPct}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={params.urbanExpansionPct}
              onChange={(e) => setParams({ urbanExpansionPct: parseInt(e.target.value) })}
              className="w-full accent-[#1D5D91]"
            />
          </div>

          {/* Slider 2: Infrastructure Investment (Cr) */}
          <div className="space-y-1">
            <div className="flex justify-between font-semibold text-slate-700">
              <span>Infrastructure Investment (₹ Cr):</span>
              <span className="font-mono font-bold text-[#1D5D91]">₹{params.infrastructureInvestmentCr} Cr</span>
            </div>
            <input
              type="range"
              min="100"
              max="2000"
              step="50"
              value={params.infrastructureInvestmentCr}
              onChange={(e) => setParams({ infrastructureInvestmentCr: parseInt(e.target.value) })}
              className="w-full accent-[#1D5D91]"
            />
          </div>

          {/* Slider 3: Conservation Focus (%) */}
          <div className="space-y-1">
            <div className="flex justify-between font-semibold text-slate-700">
              <span>Eco-Conservation Mandate (%):</span>
              <span className="font-mono font-bold text-[#2E6B45]">{params.conservationFocusPct}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={params.conservationFocusPct}
              onChange={(e) => setParams({ conservationFocusPct: parseInt(e.target.value) })}
              className="w-full accent-[#2E6B45]"
            />
          </div>

          {/* Run Simulation Button */}
          <button
            onClick={handleRunSimulation}
            className="w-full bg-[#123B63] hover:bg-[#1D5D91] text-white py-2.5 rounded-md font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4 text-[#C98A18] fill-current" />
            <span>Run Simulation</span>
          </button>
        </div>

        {/* RIGHT PANEL: SCENARIO IMPACT MAP & KPI COUNTERS */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* SCENARIO IMPACT MAP CONTAINER */}
          <ScenarioMap />

          {/* KEY KPI COUNTERS BAR matching user reference image */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            
            <div className="bg-white p-4 rounded-lg border border-[#D9DEE5] shadow-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Land Affected</span>
              <p className="text-xl font-black text-[#123B63] mt-1">
                {scenarioData.landAffectedHectares.toLocaleString()} <span className="text-xs font-normal text-slate-500">ha</span>
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-[#D9DEE5] shadow-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Population Affected</span>
              <p className="text-xl font-black text-[#1D5D91] mt-1">
                {scenarioData.populationAffectedLakhs} <span className="text-xs font-normal text-slate-500">Lakh</span>
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-[#D9DEE5] shadow-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Environmental Risk</span>
              <p className={`text-xl font-black mt-1 ${
                scenarioData.environmentalRiskLevel === 'High' ? 'text-[#A33A32]' : scenarioData.environmentalRiskLevel === 'Moderate' ? 'text-[#C98A18]' : 'text-[#2E6B45]'
              }`}>
                {scenarioData.environmentalRiskLevel}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-[#D9DEE5] shadow-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Overall Vulnerability Risk</span>
              <p className={`text-xl font-black mt-1 ${
                scenarioData.overallRiskScorePct > 65 ? 'text-[#A33A32]' : scenarioData.overallRiskScorePct > 40 ? 'text-[#C98A18]' : 'text-[#2E6B45]'
              }`}>
                {scenarioData.overallRiskScorePct}%
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
