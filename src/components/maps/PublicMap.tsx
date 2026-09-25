import React from 'react';
import { projectsGeoJSON } from '../../data/maps/projects.geojson';
import { MapPin, Globe, CheckCircle2 } from 'lucide-react';

export const PublicMap: React.FC = () => {
  const publicProjects = projectsGeoJSON.features;

  return (
    <div className="space-y-4 select-none">
      <div className="bg-[#2E6B45]/10 border border-[#2E6B45]/30 p-3 rounded text-xs flex items-center justify-between text-[#2E6B45]">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4" />
          <span className="font-bold">Public Information Access Mode</span>
        </div>
        <span className="text-[10px] font-semibold bg-white px-2 py-0.5 rounded border border-[#2E6B45]/30">
          Showing Approved Published Layers Only
        </span>
      </div>

      <div className="relative h-[480px] bg-[#E3E8EE] rounded-lg border border-[#D9DEE5] p-6 flex flex-col justify-between overflow-hidden bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="bg-white/95 px-3 py-1.5 rounded border border-[#D9DEE5] shadow-xs text-xs font-bold text-[#123B63] self-start">
          Public GIS Portal: Approved Infrastructure & Published Studies Map
        </div>

        <div className="my-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {publicProjects.map((proj, idx) => {
            const props = proj.properties;
            return (
              <div key={idx} className="bg-white p-4 rounded-md border border-slate-300 shadow-xs space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#123B63]">{props.district}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1D5D91]/10 text-[#1D5D91]">
                    {props.category}
                  </span>
                </div>
                <h5 className="font-bold text-slate-800 text-xs">{props.title}</h5>
                <p className="text-[11px] text-slate-500">Dept: {props.department}</p>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">Status: <strong className="text-[#2E6B45]">{props.status}</strong></span>
                  <span className="font-mono font-bold text-[#123B63]">{props.budget}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-[10px] text-slate-500 bg-white/90 p-2 rounded self-start">
          * Restricted departmental data, unverified surveys, and private land titles are automatically excluded from public GIS access.
        </div>
      </div>
    </div>
  );
};
