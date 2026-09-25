import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  MapPin,
  ChevronLeft,
  Layers,
  Globe2,
  Lock,
  CheckCircle2,
  Info
} from 'lucide-react';
import { MOCK_OFFICER_GIS_LAYERS } from '../../data/mockDataOfficer';

export const DataGISLayerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  const layer = MOCK_OFFICER_GIS_LAYERS.find((l) => l.id === id) || MOCK_OFFICER_GIS_LAYERS[0];

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

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/data/gis-layers')}
        className="inline-flex items-center space-x-1 text-xs text-[#1D5D91] hover:underline font-bold"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to GIS Layer Registry</span>
      </button>

      {/* Layer Header Card */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#123B63] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              {layer.category}
            </span>
            <span className="text-slate-500 text-xs font-semibold">{layer.type}</span>
          </div>
          <h1 className="text-xl font-bold text-[#123B63] mt-1">{layer.name}</h1>
          <p className="text-slate-600 text-xs mt-1">Source: {layer.source} · Updated: {layer.lastUpdated}</p>
        </div>

        <div className="flex items-center space-x-2">
          <button className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded shadow-xs">
            Publish Layer
          </button>
          <button className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded shadow-xs">
            Restrict Access
          </button>
        </div>
      </div>

      {/* Map & Metadata Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Preview Canvas (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-3 bg-slate-50 border-b border-slate-200">
            <span className="text-xs font-bold text-[#123B63] uppercase tracking-wider flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#C98A18]" />
              <span>Full Layer Interactive Map Preview</span>
            </span>
          </div>
          <div className="h-[420px] relative">
            <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
          </div>
        </div>

        {/* Layer Information Side Panel (1 Col) */}
        <div className="bg-white p-5 rounded-lg shadow-xs border border-slate-200 space-y-4 text-xs">
          <h2 className="text-sm font-bold text-[#123B63] border-b border-slate-200 pb-2">
            Layer Technical Metadata
          </h2>

          <div className="space-y-2 text-slate-700">
            <p><strong>Coordinate System (CRS):</strong> <span className="font-mono text-[#1D5D91]">{layer.crs}</span></p>
            <p><strong>Geometry Type:</strong> {layer.geometryType}</p>
            <p><strong>Feature Count:</strong> {layer.featureCount} Features</p>
            <p><strong>Spatial Coverage:</strong> {layer.coverage}</p>
            <p><strong>Visibility Status:</strong> {layer.visibility}</p>
            <p><strong>Validation State:</strong> {layer.status}</p>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
            <span className="font-bold text-slate-700 block text-[11px]">Bounding Box (BBOX):</span>
            <p className="font-mono text-[10px] text-slate-600 break-all">
              [{layer.boundingBox.join(', ')}]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
