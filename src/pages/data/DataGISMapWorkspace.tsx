import React, { useState, useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  Layers,
  MapPin,
  Search,
  Filter,
  Maximize2,
  Info,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import { MOCK_OFFICER_GIS_LAYERS } from '../../data/mockDataOfficer';

export const DataGISMapWorkspace: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  const [activeLayerIds, setActiveLayerIds] = useState<string[]>([
    'lyr-ofc-01',
    'lyr-ofc-02',
    'lyr-ofc-05'
  ]);

  const [inspectInfo, setInspectInfo] = useState<string>(
    'Click on any district polygon or vector feature on the map canvas to view PostGIS spatial attributes.'
  );

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [75.7139, 19.7515],
      zoom: 6.5
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const toggleLayer = (id: string) => {
    if (activeLayerIds.includes(id)) {
      setActiveLayerIds(activeLayerIds.filter((l) => l !== id));
    } else {
      setActiveLayerIds([...activeLayerIds, id]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="bg-[#123B63] text-white p-4 rounded-lg shadow-md flex items-center justify-between">
        <div>
          <span className="bg-[#C98A18] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
            GIS WORKSPACE
          </span>
          <h1 className="text-lg font-bold mt-0.5">PostGIS Layer Integration & Spatial Workspace</h1>
        </div>

        <div className="text-xs text-slate-300 font-semibold">
          Active Layers Rendered: <span className="text-[#C98A18] font-bold">{activeLayerIds.length} Layers</span>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-[540px]">
        {/* Left Layer Control Panel (1 Col) */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-4 flex flex-col">
          <h2 className="text-xs font-bold text-[#123B63] uppercase tracking-wider flex items-center space-x-2 border-b border-slate-200 pb-2">
            <Layers className="w-4 h-4 text-[#1D5D91]" />
            <span>Layer Selector & Groups</span>
          </h2>

          <div className="space-y-2 flex-1 overflow-y-auto max-h-[460px] text-xs">
            {['BOUNDARIES', 'LAND', 'CLIMATE', 'ENVIRONMENT', 'INFRASTRUCTURE', 'RESEARCH'].map((cat) => {
              const catLayers = MOCK_OFFICER_GIS_LAYERS.filter((l) => l.category === cat);
              if (catLayers.length === 0) return null;

              return (
                <div key={cat} className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block pt-1">
                    {cat}
                  </span>
                  {catLayers.map((lyr) => {
                    const isChecked = activeLayerIds.includes(lyr.id);

                    return (
                      <div
                        key={lyr.id}
                        onClick={() => toggleLayer(lyr.id)}
                        className={`p-2 rounded border flex items-center justify-between cursor-pointer transition ${
                          isChecked ? 'bg-blue-50 border-blue-300 text-blue-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="font-semibold truncate text-[11px]">{lyr.name}</span>
                        {isChecked ? <Eye className="w-3.5 h-3.5 text-[#1D5D91]" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Center GIS Canvas (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 overflow-hidden relative min-h-[480px]">
          <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
        </div>

        {/* Right Feature Inspection Panel (1 Col) */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3 flex flex-col text-xs">
          <h2 className="text-xs font-bold text-[#123B63] uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center space-x-2">
            <Info className="w-4 h-4 text-[#C98A18]" />
            <span>Feature Attribute Inspector</span>
          </h2>

          <div className="bg-slate-50 p-3 rounded border border-slate-200 text-slate-700 leading-relaxed flex-1">
            <p className="text-[11px]">{inspectInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
