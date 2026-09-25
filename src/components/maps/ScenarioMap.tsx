import React, { useState } from 'react';
import { usePolicyStore } from '../../stores/policyStore';
import { scenarioAGeoJSON, scenarioBGeoJSON, scenarioCGeoJSON } from '../../data/maps/scenarios.geojson';
import { MapPin, Sliders, AlertTriangle, Layers, Info } from 'lucide-react';

export const ScenarioMap: React.FC = () => {
  const { activeScenario, setActiveScenario } = usePolicyStore();
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  const getGeoJSON = () => {
    switch (activeScenario) {
      case 'Scenario B':
        return scenarioBGeoJSON;
      case 'Scenario C':
        return scenarioCGeoJSON;
      default:
        return scenarioAGeoJSON;
    }
  };

  const currentGeo = getGeoJSON();
  const feature = currentGeo.features[0].properties;

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High Impact':
        return '#A33A32';
      case 'Medium Impact':
        return '#C98A18';
      default:
        return '#2E6B45';
    }
  };

  const impactColor = getImpactColor(feature.impactLevel);

  return (
    <div className="space-y-3 select-none">
      {/* Top Scenario Tabs */}
      <div className="flex space-x-2 bg-white p-1.5 rounded-md border border-[#D9DEE5] text-xs">
        <button
          onClick={() => setActiveScenario('Scenario A')}
          className={`flex-1 py-1.5 px-3 rounded font-bold transition-all text-center ${
            activeScenario === 'Scenario A'
              ? 'bg-[#123B63] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Scenario A (Current Policy)
        </button>
        <button
          onClick={() => setActiveScenario('Scenario B')}
          className={`flex-1 py-1.5 px-3 rounded font-bold transition-all text-center ${
            activeScenario === 'Scenario B'
              ? 'bg-[#123B63] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Scenario B (Proposed Policy)
        </button>
        <button
          onClick={() => setActiveScenario('Scenario C')}
          className={`flex-1 py-1.5 px-3 rounded font-bold transition-all text-center ${
            activeScenario === 'Scenario C'
              ? 'bg-[#123B63] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Scenario C (Alternative Policy)
        </button>
      </div>

      {/* Map Display Container */}
      <div className="relative h-[420px] bg-[#E3E8EE] rounded-lg border border-[#D9DEE5] p-6 flex flex-col justify-between overflow-hidden bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="flex justify-between items-start z-10">
          <div className="bg-white/95 px-3 py-1.5 rounded border border-[#D9DEE5] shadow-xs text-xs font-bold text-[#123B63]">
            Scenario Impact GIS Map ({activeScenario})
          </div>

          <div className="bg-white/95 px-3 py-1.5 rounded border border-[#D9DEE5] shadow-xs text-xs flex items-center space-x-3 text-slate-700">
            <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-[#2E6B45]"></span><span>Low</span></span>
            <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-[#C98A18]"></span><span>Medium</span></span>
            <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-[#A33A32]"></span><span>High</span></span>
          </div>
        </div>

        {/* Dynamic Polygon Zone */}
        <div className="my-auto flex items-center justify-center">
          <div
            onClick={() => setSelectedFeature(feature)}
            className="cursor-pointer bg-white p-6 rounded-lg border-2 shadow-xl max-w-md w-full transition-transform hover:scale-102"
            style={{ borderColor: impactColor }}
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-[#123B63]">{feature.name}</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded text-white" style={{ backgroundColor: impactColor }}>
                {feature.impactLevel} ({feature.impactScore}%)
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs bg-[#F5F7F9] p-3 rounded border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-500 block">Land Affected:</span>
                <span className="font-bold text-[#123B63]">{feature.affectedAreaHa} Hectares</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Pop Affected:</span>
                <span className="font-bold text-[#123B63]">{feature.populationAffectedLakhs} Lakhs</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 mt-2 font-medium">
              Key Driver: {feature.keyFactors}
            </p>
          </div>
        </div>

        {/* Illustrative Model Disclaimer */}
        <div className="flex justify-between items-center text-[11px] z-10">
          <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono font-bold border border-amber-300">
            Illustrative Model Output (Demo Data)
          </span>
          <span className="text-slate-500">Click zone to inspect scenario details.</span>
        </div>
      </div>

      {/* Selected Feature Inspector Modal / Card */}
      {selectedFeature && (
        <div className="bg-white p-4 rounded-md border border-[#D9DEE5] shadow-xs text-xs space-y-2">
          <div className="flex justify-between items-center border-b border-slate-200 pb-1">
            <span className="font-bold text-[#123B63] uppercase">Region Scenario Assessment</span>
            <button onClick={() => setSelectedFeature(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div><span className="text-slate-500 text-[10px] block">Scenario:</span><strong className="text-[#1D5D91]">{selectedFeature.scenario}</strong></div>
            <div><span className="text-slate-500 text-[10px] block">Impact Level:</span><strong style={{ color: impactColor }}>{selectedFeature.impactLevel}</strong></div>
            <div><span className="text-slate-500 text-[10px] block">Affected Area:</span><strong className="text-slate-800">{selectedFeature.affectedAreaHa} ha</strong></div>
          </div>
        </div>
      )}
    </div>
  );
};
