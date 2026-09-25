import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  Layers,
  Search,
  Maximize2,
  Minimize2,
  Info,
  MapPin,
  Check,
  Globe2,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Filter,
  Eye,
  Calendar,
  Building2
} from 'lucide-react';
import { DataSourceBadge } from '../common/DataSourceBadge';
import { PUBLIC_CLIMATE_DATA, PUBLIC_LAND_USE_DATA, PUBLIC_RESEARCH_PAPERS, PUBLIC_PROJECTS } from '../../data/mockPublic';

interface PublicGISMapProps {
  height?: string;
  initialDistrict?: string;
  onFeatureSelect?: (feature: any) => void;
}

export interface MapLayerConfig {
  id: string;
  name: string;
  category: 'LAND' | 'CLIMATE' | 'INFRASTRUCTURE' | 'RESEARCH';
  source: string;
  status: 'OFFICIAL_SOURCE' | 'PROTOTYPE_DERIVED' | 'SYNTHETIC_PROTOTYPE';
  lastUpdated: string;
  color: string;
  active: boolean;
}

export const PublicGISMap: React.FC<PublicGISMapProps> = ({
  height = '620px',
  initialDistrict = 'All',
  onFeatureSelect
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);

  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialDistrict);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeBasemap, setActiveBasemap] = useState<'streets' | 'satellite' | 'terrain'>('streets');
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'layers' | 'legend' | 'provenance'>('layers');

  // Map Layers state
  const [layers, setLayers] = useState<MapLayerConfig[]>([
    // LAND & LAND USE
    { id: 'district-bnd', name: 'District Boundaries', category: 'LAND', source: 'Survey of India / Census', status: 'OFFICIAL_SOURCE', lastUpdated: '2025-01-01', color: '#1D5D91', active: true },
    { id: 'state-bnd', name: 'State Boundaries', category: 'LAND', source: 'Survey of India', status: 'OFFICIAL_SOURCE', lastUpdated: '2025-01-01', color: '#123B63', active: true },
    { id: 'lulc-class', name: 'Land-use / LULC', category: 'LAND', source: 'NRSC Bhuvan 50k', status: 'OFFICIAL_SOURCE', lastUpdated: '2025-10-15', color: '#2E6B45', active: true },
    { id: 'agri-land', name: 'Agricultural Land', category: 'LAND', source: 'State Dept of Agriculture', status: 'OFFICIAL_SOURCE', lastUpdated: '2025-09-20', color: '#84cc16', active: true },
    { id: 'forest-area', name: 'Forest Areas', category: 'LAND', source: 'Forest Survey of India', status: 'OFFICIAL_SOURCE', lastUpdated: '2025-06-12', color: '#15803d', active: true },
    { id: 'water-bodies', name: 'Water Bodies', category: 'LAND', source: 'Central Ground Water Board', status: 'OFFICIAL_SOURCE', lastUpdated: '2025-11-05', color: '#0284c7', active: true },
    { id: 'built-up', name: 'Built-up Areas', category: 'LAND', source: 'NRSC / OpenStreetMap', status: 'PROTOTYPE_DERIVED', lastUpdated: '2025-12-01', color: '#dc2626', active: false },

    // CLIMATE & ENVIRONMENT
    { id: 'rainfall-map', name: 'Rainfall Grids', category: 'CLIMATE', source: 'India Meteorological Dept (IMD)', status: 'OFFICIAL_SOURCE', lastUpdated: '2026-02-10', color: '#0284c7', active: true },
    { id: 'rainfall-anomaly', name: 'Rainfall Anomaly', category: 'CLIMATE', source: 'IMD Operational Data', status: 'OFFICIAL_SOURCE', lastUpdated: '2026-02-10', color: '#d97706', active: false },
    { id: 'temp-layer', name: 'Temperature Max/Min', category: 'CLIMATE', source: 'IMD Climatology', status: 'OFFICIAL_SOURCE', lastUpdated: '2026-02-01', color: '#ea580c', active: false },
    { id: 'drought-spi', name: 'Drought / SPI', category: 'CLIMATE', source: 'BhoomiDrishti / IMD SPI Matrix', status: 'PROTOTYPE_DERIVED', lastUpdated: '2026-01-20', color: '#c98a18', active: true },
    { id: 'flood-hazard', name: 'Flood Hazard Zones', category: 'CLIMATE', source: 'BhoomiDrishti Multi-Criteria Model', status: 'PROTOTYPE_DERIVED', lastUpdated: '2026-01-15', color: '#9333ea', active: false },
    { id: 'climate-vuln', name: 'Climate Vulnerability', category: 'CLIMATE', source: 'State Disaster Management Authority', status: 'OFFICIAL_SOURCE', lastUpdated: '2025-11-30', color: '#b91c1c', active: false },

    // INFRASTRUCTURE
    { id: 'roads-hw', name: 'Roads & Highways', category: 'INFRASTRUCTURE', source: 'Public Works Department (PWD)', status: 'OFFICIAL_SOURCE', lastUpdated: '2025-08-14', color: '#475569', active: true },
    { id: 'railways', name: 'Railways & Freight Corridors', category: 'INFRASTRUCTURE', source: 'Indian Railways GIS Portal', status: 'OFFICIAL_SOURCE', lastUpdated: '2025-05-10', color: '#334155', active: false },
    { id: 'airports', name: 'Airports & Logistics Hubs', category: 'INFRASTRUCTURE', source: 'AAI & MIDC Infrastructure', status: 'OFFICIAL_SOURCE', lastUpdated: '2025-07-01', color: '#4f46e5', active: false },
    { id: 'pub-projects', name: 'Public Projects', category: 'INFRASTRUCTURE', source: 'BhoomiDrishti Open Portal', status: 'PROTOTYPE_DERIVED', lastUpdated: '2026-02-15', color: '#059669', active: true },

    // RESEARCH
    { id: 'res-locations', name: 'Published Research Locations', category: 'RESEARCH', source: 'BhoomiDrishti Research Registry', status: 'PROTOTYPE_DERIVED', lastUpdated: '2026-02-18', color: '#7c3aed', active: true },
    { id: 'case-studies', name: 'Case Studies & Pilots', category: 'RESEARCH', source: 'IIT / VJTI Geoinformatics', status: 'PROTOTYPE_DERIVED', lastUpdated: '2026-01-10', color: '#db2777', active: true }
  ]);

  const toggleLayer = (layerId: string) => {
    setLayers(prev => prev.map(l => l.id === layerId ? { ...l, active: !l.active } : l));
  };

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize MapLibre map centered on Maharashtra
    const mapInstance = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm-tiles': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | BhoomiDrishti GIS'
          }
        },
        layers: [
          {
            id: 'osm-tiles-layer',
            type: 'raster',
            source: 'osm-tiles',
            minzoom: 0,
            maxzoom: 19
          }
        ]
      },
      center: [75.7139, 19.7515], // Center of Maharashtra
      zoom: 6.2
    });

    mapInstance.addControl(new maplibregl.NavigationControl(), 'top-right');
    mapInstance.addControl(new maplibregl.ScaleControl({ maxWidth: 100, unit: 'metric' }), 'bottom-right');

    map.current = mapInstance;

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    const climate = PUBLIC_CLIMATE_DATA.find(d => d.district === district);
    if (climate && map.current) {
      map.current.flyTo({
        center: [climate.lng, climate.lat],
        zoom: 9.5,
        essential: true
      });
      setSelectedFeature({
        title: `${climate.district} District Profile`,
        type: 'District GIS Record',
        location: `${climate.district}, ${climate.state}`,
        source: 'IMD & NRSC Bhuvan',
        date: climate.lastUpdated,
        status: climate.dataStatus,
        details: {
          'Actual Rainfall': `${climate.rainfallActualMm} mm`,
          'Normal Rainfall': `${climate.rainfallNormalMm} mm`,
          'Departure %': `${climate.departurePercentage > 0 ? '+' : ''}${climate.departurePercentage}%`,
          'SPI Category': climate.spiDroughtCategory,
          'Flood Hazard': climate.floodHazard,
          'Temp (Max/Min)': `${climate.tempMaxC}°C / ${climate.tempMinC}°C`,
          'Primary LULC': climate.lulcPrimary
        }
      });
    }
  };

  const activeLayers = layers.filter(l => l.active);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden select-none flex flex-col">
      {/* Top Banner Notice */}
      <div className="bg-[#123B63] text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-[#1D5D91]">
        <div className="flex items-center space-x-2">
          <Globe2 className="w-4 h-4 text-[#C98A18]" />
          <span className="font-bold uppercase tracking-wider text-[11px]">Public Approved GIS Map Portal</span>
          <span className="bg-[#1D5D91] text-amber-200 px-2 py-0.5 rounded text-[10px] font-semibold border border-amber-500/30">
            Read-Only Approved Data Access
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] text-slate-300">
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Restricted Departmental Layers & Personal Data Excluded</span>
          </span>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="relative flex flex-col md:flex-row" style={{ height }}>
        {/* Left Side Control Panel */}
        <div className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-12'} bg-slate-900 text-slate-200 border-r border-slate-700 transition-all duration-300 flex flex-col z-10 shrink-0`}>
          {/* Panel Header */}
          <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            {isSidebarOpen && (
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#C98A18]" />
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Layer Controls</h4>
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title={isSidebarOpen ? 'Collapse Layer Control' : 'Expand Layer Control'}
            >
              {isSidebarOpen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

          {isSidebarOpen && (
            <>
              {/* Tab Navigation */}
              <div className="flex border-b border-slate-800 text-xs font-semibold bg-slate-900/80">
                <button
                  onClick={() => setActiveTab('layers')}
                  className={`flex-1 py-2 text-center border-b-2 transition-colors ${
                    activeTab === 'layers' ? 'border-[#C98A18] text-amber-300 font-bold bg-slate-800/50' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Layers ({activeLayers.length})
                </button>
                <button
                  onClick={() => setActiveTab('legend')}
                  className={`flex-1 py-2 text-center border-b-2 transition-colors ${
                    activeTab === 'legend' ? 'border-[#C98A18] text-amber-300 font-bold bg-slate-800/50' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Legend
                </button>
                <button
                  onClick={() => setActiveTab('provenance')}
                  className={`flex-1 py-2 text-center border-b-2 transition-colors ${
                    activeTab === 'provenance' ? 'border-[#C98A18] text-amber-300 font-bold bg-slate-800/50' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Provenance
                </button>
              </div>

              {/* District Filter & Search */}
              <div className="p-3 border-b border-slate-800 space-y-2 bg-slate-950/40">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Select District</label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded text-xs py-1.5 px-2 text-white focus:outline-none focus:border-[#C98A18]"
                  >
                    <option value="All">All Maharashtra Districts</option>
                    {PUBLIC_CLIMATE_DATA.map((d, i) => (
                      <option key={i} value={d.district}>{d.district}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tab Contents */}
              <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
                {activeTab === 'layers' && (
                  <>
                    {(['LAND', 'CLIMATE', 'INFRASTRUCTURE', 'RESEARCH'] as const).map(category => {
                      const categoryLayers = layers.filter(l => l.category === category);
                      const catTitles: Record<string, string> = {
                        LAND: 'LAND & LAND USE',
                        CLIMATE: 'CLIMATE & ENVIRONMENT',
                        INFRASTRUCTURE: 'INFRASTRUCTURE',
                        RESEARCH: 'RESEARCH'
                      };

                      return (
                        <div key={category} className="space-y-1.5">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90 pb-1 border-b border-slate-800 flex items-center justify-between">
                            <span>{catTitles[category]}</span>
                            <span className="text-[9px] text-slate-500">{categoryLayers.filter(l => l.active).length}/{categoryLayers.length}</span>
                          </div>
                          <div className="space-y-1">
                            {categoryLayers.map(l => (
                              <label
                                key={l.id}
                                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                                  l.active ? 'bg-slate-800 text-white font-medium border border-slate-700' : 'text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                                }`}
                              >
                                <div className="flex items-center space-x-2 truncate pr-2">
                                  <input
                                    type="checkbox"
                                    checked={l.active}
                                    onChange={() => toggleLayer(l.id)}
                                    className="accent-[#C98A18] rounded"
                                  />
                                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: l.color }}></span>
                                  <span className="truncate text-[11px]">{l.name}</span>
                                </div>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 shrink-0 font-mono">
                                  {l.status === 'OFFICIAL_SOURCE' ? 'Govt' : 'Proto'}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}

                {activeTab === 'legend' && (
                  <div className="space-y-3 text-xs">
                    <h5 className="font-bold text-amber-400 text-xs">Active Layer Legends</h5>
                    {activeLayers.map(l => (
                      <div key={l.id} className="p-2 bg-slate-800/60 rounded border border-slate-700 space-y-1">
                        <div className="flex items-center space-x-2 font-bold text-slate-200">
                          <span className="w-3 h-3 rounded" style={{ backgroundColor: l.color }}></span>
                          <span>{l.name}</span>
                        </div>
                        <p className="text-[10px] text-slate-400">Source: {l.source}</p>
                        <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-slate-700/50">
                          <span>Status: {l.status}</span>
                          <span>Updated: {l.lastUpdated}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'provenance' && (
                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/60 rounded space-y-1">
                      <div className="flex items-center space-x-1.5 font-bold text-emerald-400">
                        <ShieldCheck className="w-4 h-4" />
                        <span>OFFICIAL SOURCE</span>
                      </div>
                      <p className="text-[10px] text-emerald-200/80">
                        Sourced directly from authorized government APIs and spatial catalogues (IMD, NRSC Bhuvan, Survey of India, Census).
                      </p>
                    </div>

                    <div className="p-2.5 bg-blue-950/40 border border-blue-800/60 rounded space-y-1">
                      <div className="flex items-center space-x-1.5 font-bold text-blue-400">
                        <Info className="w-4 h-4" />
                        <span>PROTOTYPE-DERIVED</span>
                      </div>
                      <p className="text-[10px] text-blue-200/80">
                        Derived by BhoomiDrishti analytics processing combining multiple public data feeds.
                      </p>
                    </div>

                    <div className="p-2.5 bg-amber-950/40 border border-amber-800/60 rounded space-y-1">
                      <div className="flex items-center space-x-1.5 font-bold text-amber-400">
                        <Info className="w-4 h-4" />
                        <span>SYNTHETIC PROTOTYPE</span>
                      </div>
                      <p className="text-[10px] text-amber-200/80">
                        Generated specifically for SIH hackathon benchmarking. Not government verified.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Right Map Canvas Container */}
        <div className="flex-1 relative bg-slate-100 min-h-[400px]">
          {/* Map Target Div */}
          <div ref={mapContainer} className="w-full h-full" />

          {/* District Pins Overlay on Map */}
          <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-xs p-2 rounded-lg border border-slate-200 shadow-md flex items-center space-x-2 text-xs">
            <MapPin className="w-4 h-4 text-[#1D5D91]" />
            <span className="font-bold text-[#123B63]">Active Location:</span>
            <span className="font-semibold text-slate-700">{selectedDistrict} District</span>
          </div>

          {/* Quick Feature Pins list overlay for easy inspection */}
          <div className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-slate-200 shadow-lg max-w-sm w-full text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 font-bold text-[#123B63]">
              <span className="flex items-center space-x-1">
                <Globe2 className="w-4 h-4 text-[#C98A18]" />
                <span>Featured Public Spatial Locations</span>
              </span>
              <span className="text-[10px] text-slate-500">Click to Fly</span>
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {PUBLIC_CLIMATE_DATA.map((dist, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDistrictChange(dist.district)}
                  className={`w-full text-left p-1.5 rounded transition-colors flex items-center justify-between ${
                    selectedDistrict === dist.district ? 'bg-[#1D5D91] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="truncate">{dist.district}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    selectedDistrict === dist.district ? 'bg-amber-400 text-slate-900 font-bold' : 'bg-slate-200 text-slate-600'
                  }`}>
                    SPI: {dist.spiDroughtCategory}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Feature Modal / Popup Drawer */}
          {selectedFeature && (
            <div className="absolute top-16 left-4 z-20 bg-white rounded-lg border border-slate-200 shadow-2xl p-4 max-w-sm w-full space-y-3 animate-in fade-in slide-in-from-left-4">
              <div className="flex items-start justify-between border-b border-slate-100 pb-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D5D91]">
                    {selectedFeature.type}
                  </span>
                  <h4 className="font-bold text-sm text-[#123B63]">{selectedFeature.title}</h4>
                </div>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-sm px-1.5"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <p className="flex items-center space-x-1.5 text-slate-700 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#C98A18]" />
                  <span>{selectedFeature.location}</span>
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                  {Object.entries(selectedFeature.details || {}).map(([key, val]) => (
                    <div key={key} className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="text-slate-400 text-[10px] block">{key}</span>
                      <span className="font-bold text-slate-800">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span>Source: {selectedFeature.source}</span>
                <DataSourceBadge status={selectedFeature.status} size="sm" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Map Footer Layer Metadata Bar */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-[#123B63]">Active Layers Displayed:</span>
          <span className="text-slate-700 font-medium">
            {activeLayers.map(l => l.name).slice(0, 4).join(', ')} {activeLayers.length > 4 ? `+${activeLayers.length - 4} more` : ''}
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] text-slate-500">
          <span>Map Engine: <strong>MapLibre GL JS v6.11</strong></span>
          <span>•</span>
          <span>Last Platform Sync: <strong>2026-02-25</strong></span>
        </div>
      </div>
    </div>
  );
};
