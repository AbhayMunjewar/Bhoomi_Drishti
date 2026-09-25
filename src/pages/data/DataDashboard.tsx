import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  Database,
  Layers,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Globe2,
  Sliders,
  Search,
  Upload,
  RefreshCw,
  ShieldCheck,
  ChevronRight,
  Info,
  MapPin,
  Clock,
  ArrowRight,
  Filter,
  Maximize2
} from 'lucide-react';
import {
  MOCK_DATA_PIPELINE_STATUS,
  MOCK_OFFICER_DATASETS,
  MOCK_OFFICER_GIS_LAYERS,
  MOCK_OFFICER_CONFLICTS,
  MOCK_DATA_SOURCES
} from '../../data/mockDataOfficer';

export const DataDashboard: React.FC = () => {
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    districts: true,
    agriculture: true,
    builtup: false,
    infrastructure: true,
    flood: false,
    research: true
  });

  const [selectedFeature, setSelectedFeature] = useState<{
    name: string;
    location: string;
    dataset: string;
    source: string;
    version: string;
    lastUpdated: string;
    geometry: string;
    attributes: Record<string, string>;
  } | null>(null);

  // Initialize MapLibre GL JS Map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [75.7139, 19.7515], // Center of Maharashtra
      zoom: 6.2
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    mapRef.current = map;

    map.on('load', () => {
      // Add district boundary source
      map.addSource('mh-districts', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: { name: 'Nagpur District', code: 'MH-27', agri_ha: '640,200', built_ha: '112,400', source: 'NRSC Bhuvan LULC 2025' },
              geometry: {
                type: 'Polygon',
                coordinates: [[[78.5, 20.8], [79.6, 20.8], [79.6, 21.6], [78.5, 21.6], [78.5, 20.8]]]
              }
            },
            {
              type: 'Feature',
              properties: { name: 'Mumbai Suburban', code: 'MH-21', agri_ha: '12,400', built_ha: '445,000', source: 'State Revenue Vector v2.4' },
              geometry: {
                type: 'Polygon',
                coordinates: [[[72.7, 18.9], [73.1, 18.9], [73.1, 19.3], [72.7, 19.3], [72.7, 18.9]]]
              }
            },
            {
              type: 'Feature',
              properties: { name: 'Thane Coastal Sector', code: 'MH-22', agri_ha: '142,000', built_ha: '188,200', source: 'NRSC Bhuvan LULC 2025' },
              geometry: {
                type: 'Polygon',
                coordinates: [[[72.8, 19.2], [73.4, 19.2], [73.4, 19.8], [72.8, 19.8], [72.8, 19.2]]]
              }
            }
          ]
        }
      });

      // Add district fills
      map.addLayer({
        id: 'mh-districts-fill',
        type: 'fill',
        source: 'mh-districts',
        paint: {
          'fill-color': '#1D5D91',
          'fill-opacity': 0.2
        }
      });

      // Add district outline
      map.addLayer({
        id: 'mh-districts-line',
        type: 'line',
        source: 'mh-districts',
        paint: {
          'line-color': '#123B63',
          'line-width': 2
        }
      });

      // Click event for feature inspection
      map.on('click', 'mh-districts-fill', (e: any) => {
        if (!e.features || e.features.length === 0) return;
        const feat = e.features[0];
        const props = feat.properties || {};

        setSelectedFeature({
          name: props.name || 'Maharashtra District Vector',
          location: 'Maharashtra Region',
          dataset: 'Maharashtra District Land Use & LULC Acreage Vector',
          source: props.source || 'NRSC Bhuvan & State Revenue Dept',
          version: 'v2.4',
          lastUpdated: '15 Jan 2026',
          geometry: 'MultiPolygon (EPSG:4326)',
          attributes: {
            'District Code': props.code || 'MH-REG',
            'Agricultural Area': `${props.agri_ha || '450,000'} ha`,
            'Built-up Footprint': `${props.built_ha || '120,000'} ha`,
            'Topology Status': '100% Validated (0 self-intersections)'
          }
        });
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const toggleLayer = (layerKey: string) => {
    setActiveLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#123B63] text-white p-6 rounded-lg shadow-md border-b-4 border-[#C98A18]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-[#C98A18] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                ROLE 2 · DATA & GIS OFFICER PORTAL
              </span>
              <span className="text-slate-300 text-xs font-semibold">State Remote Sensing & Cadastral GIS Cell</span>
            </div>
            <h1 className="text-2xl font-bold mt-1 text-white">
              Data Quality, PostGIS Integration & Conflict Management
            </h1>
            <p className="text-slate-200 text-xs mt-1">
              Manage dataset quality, spatial layers, provenance, geometry validation, conflicts, and data freshness.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/data/upload')}
              className="flex items-center space-x-2 bg-[#C98A18] hover:bg-[#a67113] text-white px-4 py-2 rounded text-xs font-bold transition shadow-xs"
            >
              <Upload className="w-4 h-4" />
              <span>Upload New Dataset / Layer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Pipeline Health & Status Area */}
      <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200">
        <h2 className="text-xs font-bold text-[#123B63] uppercase tracking-wider mb-3 flex items-center space-x-2">
          <Globe2 className="w-4 h-4 text-[#1D5D91]" />
          <span>Real-time Data Pipeline & External Source Status</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {MOCK_DATA_PIPELINE_STATUS.map((item, idx) => (
            <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 truncate">{item.service}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.status === 'Healthy' || item.status === 'Available'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : item.status.includes('Restricted')
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 truncate">{item.details}</p>
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/60 mt-1">
                <span>Last Sync: {item.lastSync}</span>
                <span>{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition">
          <p className="text-[10px] font-bold uppercase text-slate-500">Active Datasets</p>
          <p className="text-xl font-bold text-[#123B63] mt-0.5">340</p>
          <p className="text-[10px] text-emerald-700 font-semibold mt-1">Validated & Live</p>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition">
          <p className="text-[10px] font-bold uppercase text-slate-500">GIS Layers</p>
          <p className="text-xl font-bold text-[#123B63] mt-0.5">42</p>
          <p className="text-[10px] text-slate-600 font-medium mt-1">PostGIS Vector/Raster</p>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition">
          <p className="text-[10px] font-bold uppercase text-slate-500">Pending Validation</p>
          <p className="text-xl font-bold text-amber-600 mt-0.5">5</p>
          <p className="text-[10px] text-amber-700 font-medium mt-1">Requires Officer Action</p>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition">
          <p className="text-[10px] font-bold uppercase text-slate-500">Data Conflicts</p>
          <p className="text-xl font-bold text-red-600 mt-0.5">18</p>
          <p className="text-[10px] text-red-700 font-medium mt-1">Discrepancy Flags</p>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition">
          <p className="text-[10px] font-bold uppercase text-slate-500">Invalid Geometries</p>
          <p className="text-xl font-bold text-slate-700 mt-0.5">0</p>
          <p className="text-[10px] text-emerald-700 font-semibold mt-1">0% Self-Intersections</p>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition">
          <p className="text-[10px] font-bold uppercase text-slate-500">Stale Datasets</p>
          <p className="text-xl font-bold text-amber-600 mt-0.5">2</p>
          <p className="text-[10px] text-slate-600 font-medium mt-1">Due for Update</p>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition">
          <p className="text-[10px] font-bold uppercase text-slate-500">Missing Metadata</p>
          <p className="text-xl font-bold text-slate-700 mt-0.5">1</p>
          <p className="text-[10px] text-amber-700 font-medium mt-1">Needs Metadata</p>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition">
          <p className="text-[10px] font-bold uppercase text-slate-500">Last Sync</p>
          <p className="text-xs font-bold text-emerald-800 mt-1">Today 16:00</p>
          <p className="text-[10px] text-slate-600 font-medium mt-1">Bhuvan / PostGIS</p>
        </div>
      </div>

      {/* Quick Action Navigation Bar */}
      <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200">
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Officer Operational Shortcuts
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate('/data/upload')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-[#1D5D91] hover:text-white text-slate-700 rounded text-xs font-semibold transition border border-slate-300"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Dataset</span>
          </button>

          <button
            onClick={() => navigate('/data/gis-layers')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-[#1D5D91] hover:text-white text-slate-700 rounded text-xs font-semibold transition border border-slate-300"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Import GIS Layer</span>
          </button>

          <button
            onClick={() => navigate('/data/validation')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-[#1D5D91] hover:text-white text-slate-700 rounded text-xs font-semibold transition border border-slate-300"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Run Validation</span>
          </button>

          <button
            onClick={() => navigate('/data/conflicts')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-[#1D5D91] hover:text-white text-slate-700 rounded text-xs font-semibold transition border border-slate-300"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span>Review Conflicts</span>
          </button>

          <button
            onClick={() => navigate('/data/quality')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-[#1D5D91] hover:text-white text-slate-700 rounded text-xs font-semibold transition border border-slate-300"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Check Data Quality</span>
          </button>

          <button
            onClick={() => navigate('/data/sources')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-[#1D5D91] hover:text-white text-slate-700 rounded text-xs font-semibold transition border border-slate-300"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>View Data Sources</span>
          </button>

          <button
            onClick={() => navigate('/data/gis-map')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#123B63] hover:bg-[#1D5D91] text-white rounded text-xs font-semibold transition border border-[#123B63]"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C98A18]" />
            <span>View Full GIS Map</span>
          </button>
        </div>
      </div>

      {/* Dataset Health Summary & Provenance Badges */}
      <div className="bg-white p-4 rounded-lg shadow-xs border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold text-[#123B63] uppercase tracking-wider flex items-center space-x-2">
            <Database className="w-4 h-4 text-[#1D5D91]" />
            <span>Dataset Provenance & Verification Classification</span>
          </h2>
          <span className="text-[11px] text-slate-500 font-medium">Standardized National Land Data Lineage</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-xs">
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded">
            <span className="font-bold text-emerald-800 text-[10px] uppercase block">OFFICIAL SOURCE</span>
            <span className="text-slate-700 text-xs font-semibold block mt-0.5">IMD / NRSC / State Revenue</span>
            <span className="text-[10px] text-emerald-700 font-medium">284 Datasets</span>
          </div>

          <div className="p-2.5 bg-blue-50 border border-blue-200 rounded">
            <span className="font-bold text-blue-800 text-[10px] uppercase block">VERIFIED</span>
            <span className="text-slate-700 text-xs font-semibold block mt-0.5">Passed Officer QA</span>
            <span className="text-[10px] text-blue-700 font-medium">42 Datasets</span>
          </div>

          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded">
            <span className="font-bold text-amber-800 text-[10px] uppercase block">UNDER REVIEW</span>
            <span className="text-slate-700 text-xs font-semibold block mt-0.5">Pending Officer Action</span>
            <span className="text-[10px] text-amber-700 font-medium">8 Datasets</span>
          </div>

          <div className="p-2.5 bg-purple-50 border border-purple-200 rounded">
            <span className="font-bold text-purple-800 text-[10px] uppercase block">PROTOTYPE-DERIVED</span>
            <span className="text-slate-700 text-xs font-semibold block mt-0.5">Model Simulation Output</span>
            <span className="text-[10px] text-purple-700 font-medium">4 Datasets</span>
          </div>

          <div className="p-2.5 bg-slate-100 border border-slate-300 rounded">
            <span className="font-bold text-slate-800 text-[10px] uppercase block">SYNTHETIC PROTOTYPE</span>
            <span className="text-slate-700 text-xs font-semibold block mt-0.5">SIH Benchmark Test</span>
            <span className="text-[10px] text-slate-600 font-medium">2 Datasets</span>
          </div>

          <div className="p-2.5 bg-red-50 border border-red-200 rounded">
            <span className="font-bold text-red-800 text-[10px] uppercase block">DEPRECATED</span>
            <span className="text-slate-700 text-xs font-semibold block mt-0.5">Superseded Version</span>
            <span className="text-[10px] text-red-700 font-medium">0 Datasets Active</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Map & Discrepancies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive GIS Overview Map (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-xs border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#123B63] flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#C98A18]" />
                <span>Interactive GIS Layer Overview (MapLibre GL JS)</span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Click any feature to inspect polygon attributes, geometry details, and dataset provenance.
              </p>
            </div>
            <button
              onClick={() => navigate('/data/gis-map')}
              className="flex items-center space-x-1 text-xs text-[#1D5D91] hover:underline font-semibold"
            >
              <span>Full Workspace</span>
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Map Layer Controls Bar */}
          <div className="p-2.5 bg-slate-100 border-b border-slate-200 flex flex-wrap gap-2 text-xs">
            <span className="font-bold text-slate-600 self-center mr-1">Layer Visibility:</span>
            {Object.keys(activeLayers).map((key) => (
              <label key={key} className="inline-flex items-center space-x-1.5 bg-white px-2.5 py-1 rounded border border-slate-300 text-[11px] cursor-pointer hover:border-[#1D5D91]">
                <input
                  type="checkbox"
                  checked={activeLayers[key]}
                  onChange={() => toggleLayer(key)}
                  className="rounded text-[#1D5D91] focus:ring-0"
                />
                <span className="capitalize font-semibold text-slate-700">{key}</span>
              </label>
            ))}
          </div>

          {/* Map & Feature Details Area */}
          <div className="grid grid-cols-1 md:grid-cols-3 flex-1 min-h-[380px]">
            <div className="md:col-span-2 relative min-h-[380px]">
              <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
            </div>

            {/* Feature Inspection Side Panel */}
            <div className="p-4 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-200 space-y-3 overflow-y-auto text-xs">
              <h3 className="font-bold text-[#123B63] border-b border-slate-200 pb-2">
                Feature Inspection Panel
              </h3>

              {selectedFeature ? (
                <div className="space-y-2.5">
                  <div className="bg-white p-3 rounded border border-slate-200">
                    <p className="font-bold text-slate-800 text-sm">{selectedFeature.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{selectedFeature.location}</p>
                  </div>

                  <div className="space-y-1 text-[11px]">
                    <p><strong className="text-slate-700">Source:</strong> {selectedFeature.source}</p>
                    <p><strong className="text-slate-700">Dataset:</strong> {selectedFeature.dataset}</p>
                    <p><strong className="text-slate-700">Version:</strong> {selectedFeature.version}</p>
                    <p><strong className="text-slate-700">Updated:</strong> {selectedFeature.lastUpdated}</p>
                    <p><strong className="text-slate-700">CRS Geometry:</strong> {selectedFeature.geometry}</p>
                  </div>

                  <div className="bg-slate-100 p-2.5 rounded border border-slate-200">
                    <p className="font-bold text-slate-700 text-[11px] mb-1">Feature Attributes:</p>
                    <div className="space-y-1 text-[11px]">
                      {Object.entries(selectedFeature.attributes).map(([k, v], i) => (
                        <div key={i} className="flex justify-between border-b border-slate-200/60 pb-0.5">
                          <span className="text-slate-600">{k}:</span>
                          <span className="font-semibold text-slate-800">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <Info className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-xs">Click on any district polygon or parcel vector on the map to inspect feature attributes.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cadastral vs Satellite Discrepancy Flags (1 Col) */}
        <div className="bg-white rounded-lg shadow-xs border border-slate-200 flex flex-col">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#123B63] flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Discrepancy Flags</span>
            </h2>
            <button
              onClick={() => navigate('/data/conflicts')}
              className="text-xs text-[#1D5D91] hover:underline font-semibold"
            >
              View All (18)
            </button>
          </div>

          <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[440px]">
            {MOCK_OFFICER_CONFLICTS.map((conf) => (
              <div key={conf.id} className="p-3 bg-red-50/50 border border-red-200 rounded text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-900">{conf.parcelId} - {conf.district}</span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold rounded">
                    {conf.severity} Severity
                  </span>
                </div>

                <p className="text-[11px] text-slate-700 leading-snug">
                  {conf.description}
                </p>

                <div className="grid grid-cols-2 gap-2 bg-white p-2 rounded border border-slate-200 text-[11px]">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Dataset A (Revenue)</span>
                    <span className="font-bold text-slate-800">{conf.revenueAreaHa} ha</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Dataset B (Satellite)</span>
                    <span className="font-bold text-slate-800">{conf.satelliteAreaHa} ha</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-500">Variance: <strong>+{conf.differenceAreaHa} ha</strong></span>
                  <button
                    onClick={() => navigate(`/data/conflicts/${conf.id}`)}
                    className="flex items-center space-x-1 text-xs text-[#1D5D91] hover:underline font-bold"
                  >
                    <span>Inspect GIS Mismatch</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
