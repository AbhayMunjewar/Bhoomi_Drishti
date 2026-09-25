import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  Database,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Layers,
  ChevronLeft,
  ShieldCheck,
  Globe2,
  Clock,
  Info,
  Download,
  Share2
} from 'lucide-react';
import { MOCK_OFFICER_DATASETS } from '../../data/mockDataOfficer';

export const DataDatasetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  const [activeTab, setActiveTab] = useState<'overview' | 'preview' | 'schema' | 'quality' | 'metadata' | 'versions' | 'gis' | 'usage' | 'activity'>('overview');

  const dataset = MOCK_OFFICER_DATASETS.find((d) => d.id === id) || MOCK_OFFICER_DATASETS[0];

  // Initialize GIS Preview Map when GIS tab is selected
  useEffect(() => {
    if (activeTab !== 'gis' || !mapContainer.current || mapRef.current) return;

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
  }, [activeTab]);

  return (
    <div className="space-y-6">
      {/* Top Back Navigation */}
      <button
        onClick={() => navigate('/data/datasets')}
        className="inline-flex items-center space-x-1.5 text-xs text-[#1D5D91] hover:underline font-bold"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Dataset Inventory</span>
      </button>

      {/* Dataset Header Card */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  dataset.verificationStatus === 'OFFICIAL_SOURCE'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : dataset.verificationStatus === 'PROTOTYPE_DERIVED'
                    ? 'bg-purple-100 text-purple-800 border border-purple-300'
                    : 'bg-slate-200 text-slate-800 border border-slate-300'
                }`}
              >
                {dataset.verificationStatus}
              </span>
              <span className="text-slate-500 text-xs font-semibold">{dataset.category}</span>
            </div>
            <h1 className="text-xl font-bold text-[#123B63] mt-1">{dataset.title}</h1>
            <p className="text-slate-600 text-xs mt-1 max-w-3xl">{dataset.description}</p>
          </div>

          <div className="flex items-center space-x-2">
            <span
              className={`px-3 py-1 rounded text-xs font-bold ${
                dataset.status === 'Verified'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}
            >
              {dataset.status}
            </span>
          </div>
        </div>

        {/* Quick Attribute Bar */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-3 border-t border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px]">Publisher Source</span>
            <span className="font-semibold text-slate-800">{dataset.source}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px]">Spatial Coverage</span>
            <span className="font-semibold text-slate-800">{dataset.coverage}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px]">Records Count</span>
            <span className="font-semibold text-slate-800">{dataset.records} Records</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px]">File Format</span>
            <span className="font-semibold text-slate-800">{dataset.format}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px]">Version</span>
            <span className="font-semibold text-slate-800">{dataset.version}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px]">Quality Score</span>
            <span className="font-bold text-emerald-700">{dataset.qualityScore}% Passed</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
        <div className="flex flex-wrap border-b border-slate-200 bg-slate-50 text-xs font-bold">
          {(['overview', 'preview', 'schema', 'quality', 'metadata', 'versions', 'gis', 'usage', 'activity'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 transition border-b-2 capitalize ${
                activeTab === tab
                  ? 'border-[#123B63] text-[#123B63] bg-white font-bold'
                  : 'border-transparent text-slate-600 hover:text-[#123B63]'
              }`}
            >
              {tab === 'gis' ? 'GIS Preview' : tab}
            </button>
          ))}
        </div>

        {/* Tab Content Panel */}
        <div className="p-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs">
              <h2 className="text-sm font-bold text-[#123B63]">Dataset Overview & Provenance Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-2">
                  <h3 className="font-bold text-slate-800">Administrative Governance</h3>
                  <p><strong className="text-slate-700">Source Organization:</strong> {dataset.source}</p>
                  <p><strong className="text-slate-700">License Type:</strong> {dataset.license}</p>
                  <p><strong className="text-slate-700">Verification State:</strong> {dataset.verificationStatus}</p>
                  <p><strong className="text-slate-700">Last Synced Date:</strong> {dataset.lastUpdated}</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-2">
                  <h3 className="font-bold text-slate-800">Technical Specifications</h3>
                  <p><strong className="text-slate-700">Payload Format:</strong> {dataset.format}</p>
                  <p><strong className="text-slate-700">Record Volume:</strong> {dataset.records} Entries</p>
                  <p><strong className="text-slate-700">Coordinate Reference:</strong> EPSG:4326 (WGS84)</p>
                  <p><strong className="text-slate-700">Quality Score:</strong> {dataset.qualityScore}%</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DATA PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-[#123B63]">Data Sample Preview (First 5 Records)</h2>
              <div className="overflow-x-auto border border-slate-200 rounded">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                      {dataset.schema.map((sc, i) => (
                        <th key={i} className="p-2.5 border-b border-slate-200">{sc.column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-[11px]">
                    <tr>
                      <td className="p-2.5 font-bold">MH-27</td>
                      <td className="p-2.5">Nagpur</td>
                      <td className="p-2.5">640,200</td>
                      <td className="p-2.5">112,400</td>
                      <td className="p-2.5">142,000</td>
                      <td className="p-2.5">24,500</td>
                      <td className="p-2.5 font-mono text-[10px]">Polygon(...)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">MH-21</td>
                      <td className="p-2.5">Mumbai Suburban</td>
                      <td className="p-2.5">12,400</td>
                      <td className="p-2.5">445,000</td>
                      <td className="p-2.5">4,200</td>
                      <td className="p-2.5">12,800</td>
                      <td className="p-2.5 font-mono text-[10px]">Polygon(...)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">MH-22</td>
                      <td className="p-2.5">Thane Coastal</td>
                      <td className="p-2.5">142,000</td>
                      <td className="p-2.5">188,200</td>
                      <td className="p-2.5">88,400</td>
                      <td className="p-2.5">45,100</td>
                      <td className="p-2.5 font-mono text-[10px]">Polygon(...)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: SCHEMA */}
          {activeTab === 'schema' && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-[#123B63]">Column Data Types & Schema Definitions</h2>
              <div className="overflow-x-auto border border-slate-200 rounded">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-[#123B63] text-white font-bold uppercase text-[10px]">
                      <th className="p-3">Column Name</th>
                      <th className="p-3">Data Type</th>
                      <th className="p-3">Nullable</th>
                      <th className="p-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-[11px]">
                    {dataset.schema.map((col, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-800">{col.column}</td>
                        <td className="p-3 font-mono text-[#1D5D91] font-semibold">{col.dataType}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              col.nullable ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {col.nullable ? 'Yes' : 'No (Required)'}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600">{col.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: QUALITY */}
          {activeTab === 'quality' && (
            <div className="space-y-4 text-xs">
              <h2 className="text-sm font-bold text-[#123B63]">Automated Quality & Integrity Indicators</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded">
                  <span className="font-bold text-emerald-800 block text-[11px]">COMPLETENESS</span>
                  <span className="text-xl font-bold text-emerald-900 mt-1 block">{dataset.quality.completeness}%</span>
                  <span className="text-[10px] text-emerald-700">0 Missing Mandatory Records</span>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <span className="font-bold text-blue-800 block text-[11px]">SPATIAL INTEGRITY</span>
                  <span className="text-xl font-bold text-blue-900 mt-1 block">{dataset.quality.spatialIntegrity}%</span>
                  <span className="text-[10px] text-blue-700">0 Self-Intersections</span>
                </div>

                <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                  <span className="font-bold text-purple-800 block text-[11px]">FRESHNESS STATE</span>
                  <span className="text-xl font-bold text-purple-900 mt-1 block">{dataset.quality.freshnessStatus}</span>
                  <span className="text-[10px] text-purple-700">Last Synced: {dataset.lastUpdated}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: GIS PREVIEW */}
          {activeTab === 'gis' && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-[#123B63]">GIS Spatial Preview (MapLibre Canvas)</h2>
              <div className="h-[400px] rounded border border-slate-300 relative overflow-hidden">
                <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
              </div>
            </div>
          )}

          {/* OTHER TABS FALLBACK */}
          {(activeTab === 'metadata' || activeTab === 'versions' || activeTab === 'usage' || activeTab === 'activity') && (
            <div className="text-xs text-slate-600 space-y-2">
              <h2 className="text-sm font-bold text-[#123B63] capitalize">{activeTab} Details</h2>
              <p className="bg-slate-50 p-4 border border-slate-200 rounded">
                Official governance record for {dataset.title}. Version {dataset.version}, last updated {dataset.lastUpdated}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
