import React, { useState } from 'react';
import { useMapStore } from '../../stores/mapStore';
import { districtsGeoJSON } from '../../data/maps/districts.geojson';
import { MapLegend } from './MapLegend';
import { LayerControl } from './LayerControl';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, MapPin, AlertTriangle, Layers, Info } from 'lucide-react';

export const LandGovernanceMap: React.FC = () => {
  const { selectedRegion, setSelectedRegion, activeLayers } = useMapStore();
  const [zoomLevel, setZoomLevel] = useState(1);

  const districts = districtsGeoJSON.features;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'VERY HIGH':
      case 'HIGH':
        return '#A33A32';
      case 'MODERATE':
        return '#C98A18';
      default:
        return '#2E6B45';
    }
  };

  return (
    <div className="relative w-full h-[520px] bg-[#123B63]/10 border border-[#D9DEE5] rounded-lg overflow-hidden select-none">
      {/* Map Canvas Background Container */}
      <div className="absolute inset-0 bg-[#E3E8EE] flex flex-col justify-between p-6 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]">
        
        {/* Top Floating Controls */}
        <div className="flex justify-between items-start z-10">
          <div className="bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded border border-[#D9DEE5] shadow-xs text-xs font-semibold text-[#123B63] flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2E6B45] animate-pulse"></span>
            <span>Interactive MapLibre GIS Layer: Maharashtra Region</span>
          </div>

          <div className="flex space-x-2">
            <LayerControl />
            <MapLegend />
          </div>
        </div>

        {/* INTERACTIVE DISTRICT REGION POLYGONS SIMULATION */}
        <div className="relative my-auto flex items-center justify-center min-h-[300px]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
            {districts.map((feat) => {
              const props = feat.properties;
              const isSelected = selectedRegion?.id === props.id;
              const color = getRiskColor(props.riskLevel);

              return (
                <div
                  key={props.id}
                  onClick={() => setSelectedRegion(props as any)}
                  className={`cursor-pointer p-4 rounded-md border-2 transition-all transform hover:-translate-y-1 shadow-md bg-white ${
                    isSelected ? 'ring-4 ring-[#1D5D91] border-[#1D5D91] scale-105 z-20' : 'border-slate-300 hover:border-[#1D5D91]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#123B63] truncate">{props.name}</span>
                    <span
                      className="w-3 h-3 rounded-full border border-white"
                      style={{ backgroundColor: color }}
                    ></span>
                  </div>
                  
                  <div className="mt-2 text-[11px] text-slate-600 space-y-1">
                    <p className="truncate font-medium">{props.landUse}</p>
                    <div className="flex justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>Area: {props.areaHa} ha</span>
                      <span className="font-mono font-bold" style={{ color }}>{props.riskLevel}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Floating Information Overlay */}
        <div className="flex justify-between items-end z-10 text-xs">
          <div className="bg-white/95 backdrop-blur-xs p-2.5 rounded border border-[#D9DEE5] shadow-xs text-[11px] text-slate-700 space-y-0.5">
            <p className="font-bold text-[#123B63]">Active Region Selected: {selectedRegion?.name || 'Nagpur'}</p>
            <p className="text-slate-500">Click any district polygon above to inspect land-use & risk vectors.</p>
          </div>

          {/* Map Controls */}
          <div className="flex items-center space-x-1 bg-white border border-[#D9DEE5] rounded p-1 shadow-xs">
            <button onClick={() => setZoomLevel(zoomLevel + 1)} className="p-1.5 hover:bg-slate-100 rounded text-slate-700" title="Zoom In">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button onClick={() => setZoomLevel(Math.max(1, zoomLevel - 1))} className="p-1.5 hover:bg-slate-100 rounded text-slate-700" title="Zoom Out">
              <ZoomOut className="w-4 h-4" />
            </button>
            <button onClick={() => setSelectedRegion(districts[0].properties as any)} className="p-1.5 hover:bg-slate-100 rounded text-slate-700" title="Reset View">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
