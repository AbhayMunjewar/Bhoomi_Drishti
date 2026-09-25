import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  GitCompare,
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  Layers,
  MapPin
} from 'lucide-react';

export const DataVersionComparePage: React.FC = () => {
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  const [versionA, setVersionA] = useState<string>('v2.3');
  const [versionB, setVersionB] = useState<string>('v2.4');

  // Initialize MapLibre Comparison Map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [75.7139, 19.7515],
      zoom: 6.2
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    mapRef.current = map;

    map.on('load', () => {
      // Add version A fill (Red)
      map.addSource('ver-a-src', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [[[78.5, 20.8], [79.5, 20.8], [79.5, 21.5], [78.5, 21.5], [78.5, 20.8]]]
          }
        }
      });

      map.addLayer({
        id: 'ver-a-fill',
        type: 'fill',
        source: 'ver-a-src',
        paint: { 'fill-color': '#EF4444', 'fill-opacity': 0.3 }
      });

      // Add version B fill (Green)
      map.addSource('ver-b-src', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [[[78.5, 20.8], [79.6, 20.8], [79.6, 21.6], [78.5, 21.6], [78.5, 20.8]]]
          }
        }
      });

      map.addLayer({
        id: 'ver-b-fill',
        type: 'fill',
        source: 'ver-b-src',
        paint: { 'fill-color': '#10B981', 'fill-opacity': 0.3 }
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/data/versions')}
        className="inline-flex items-center space-x-1 text-xs text-[#1D5D91] hover:underline font-bold"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Version Control</span>
      </button>

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200">
        <div className="flex items-center space-x-2">
          <span className="bg-[#123B63] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            SIDE-BY-SIDE COMPARATOR
          </span>
          <span className="text-slate-500 text-xs font-semibold">Spatial & Tabular Diff</span>
        </div>
        <h1 className="text-xl font-bold text-[#123B63] mt-1">Dataset Version Comparison</h1>
        <p className="text-slate-600 text-xs mt-1">
          Comparing Maharashtra District Land Use & LULC Vector ({versionA} vs {versionB}).
        </p>
      </div>

      {/* Version Selectors & Stat Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Version A Panel */}
        <div className="bg-white p-4 rounded-lg border border-red-200 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-red-900 text-xs uppercase">Version A (Baseline)</span>
            <select
              value={versionA}
              onChange={(e) => setVersionA(e.target.value)}
              className="px-2 py-1 bg-slate-50 border border-slate-300 rounded text-xs"
            >
              <option value="v2.3">v2.3 (Nov 2025)</option>
              <option value="v2.2">v2.2 (Aug 2025)</option>
            </select>
          </div>
          <div className="text-xs space-y-1 text-slate-700 bg-red-50/50 p-3 rounded">
            <p><strong>Release Date:</strong> 10 Nov 2025</p>
            <p><strong>Record Volume:</strong> 36 Districts</p>
            <p><strong>Acreage Total:</strong> 30,771,300 ha</p>
            <p><strong>Geometry Status:</strong> 2 Overlapping Polygons (Unresolved)</p>
          </div>
        </div>

        {/* Version B Panel */}
        <div className="bg-white p-4 rounded-lg border border-emerald-200 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-emerald-900 text-xs uppercase">Version B (Updated)</span>
            <select
              value={versionB}
              onChange={(e) => setVersionB(e.target.value)}
              className="px-2 py-1 bg-slate-50 border border-slate-300 rounded text-xs"
            >
              <option value="v2.4">v2.4 (Jan 2026 - Active)</option>
            </select>
          </div>
          <div className="text-xs space-y-1 text-slate-700 bg-emerald-50/50 p-3 rounded">
            <p><strong>Release Date:</strong> 15 Jan 2026</p>
            <p><strong>Record Volume:</strong> 36 Districts</p>
            <p><strong>Acreage Total:</strong> 30,771,300 ha</p>
            <p><strong>Geometry Status:</strong> 100% Validated (0 Overlaps)</p>
          </div>
        </div>
      </div>

      {/* GIS Spatial Comparison Map */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#123B63] uppercase tracking-wider flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-[#C98A18]" />
            <span>Spatial Boundary Overlay (Red: {versionA} vs Green: {versionB})</span>
          </h2>
        </div>

        <div className="h-[380px] relative">
          <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
        </div>
      </div>
    </div>
  );
};
