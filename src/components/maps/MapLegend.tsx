import React from 'react';

export const MapLegend: React.FC = () => {
  return (
    <div className="bg-white/95 backdrop-blur-xs p-3 rounded border border-[#D9DEE5] shadow-md text-xs select-none space-y-2 max-w-xs">
      <p className="font-bold text-[#123B63] text-[11px] uppercase tracking-wider border-b border-slate-200 pb-1">
        GIS Map Layer Legend
      </p>

      {/* Risk Colors */}
      <div className="space-y-1 text-[11px]">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-xs bg-[#A33A32] inline-block border border-[#A33A32]"></span>
          <span className="font-medium text-slate-700">Very High / High Flood Risk</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-xs bg-[#C98A18] inline-block border border-[#C98A18]"></span>
          <span className="font-medium text-slate-700">Moderate Risk Zone</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-xs bg-[#2E6B45] inline-block border border-[#2E6B45]"></span>
          <span className="font-medium text-slate-700">Low Risk Zone</span>
        </div>
      </div>

      {/* Marker Legend */}
      <div className="border-t border-slate-200 pt-2 space-y-1 text-[11px]">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1D5D91] inline-block"></span>
          <span className="text-slate-600">Infrastructure & Project Sites</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C98A18] inline-block"></span>
          <span className="text-slate-600">Research Locations</span>
        </div>
      </div>
    </div>
  );
};
