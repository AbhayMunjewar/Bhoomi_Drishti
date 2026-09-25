import React from 'react';
import { Layers, Check } from 'lucide-react';
import { useMapStore } from '../../stores/mapStore';

export const LayerControl: React.FC = () => {
  const { activeLayers, toggleLayer } = useMapStore();

  const layersList = [
    { id: 'District Boundary', label: 'District Boundaries' },
    { id: 'Agricultural Land', label: 'Agricultural Land' },
    { id: 'Urban Area', label: 'Urban Built-up Area' },
    { id: 'Projects', label: 'Infrastructure Projects' },
    { id: 'Risk Zones', label: 'Land Governance Risk' },
    { id: 'Research Locations', label: 'Research Locations' }
  ];

  return (
    <div className="bg-white/95 backdrop-blur-xs p-3 rounded border border-[#D9DEE5] shadow-md text-xs select-none space-y-2 max-w-xs">
      <div className="flex items-center space-x-1.5 border-b border-slate-200 pb-1">
        <Layers className="w-4 h-4 text-[#1D5D91]" />
        <span className="font-bold text-[#123B63] text-[11px] uppercase tracking-wider">
          Map Layer Controls
        </span>
      </div>

      <div className="space-y-1.5">
        {layersList.map((layer) => {
          const isVisible = activeLayers.includes(layer.id);
          return (
            <label
              key={layer.id}
              onClick={() => toggleLayer(layer.id)}
              className="flex items-center space-x-2 cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors"
            >
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center ${
                  isVisible ? 'bg-[#1D5D91] border-[#1D5D91] text-white' : 'border-slate-300 bg-white'
                }`}
              >
                {isVisible && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className={`text-[11px] ${isVisible ? 'font-semibold text-slate-800' : 'text-slate-500'}`}>
                {layer.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
