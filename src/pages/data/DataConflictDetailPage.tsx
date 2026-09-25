import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  AlertTriangle,
  ChevronLeft,
  MapPin,
  CheckCircle2,
  Sliders,
  MessageSquare
} from 'lucide-react';
import { MOCK_OFFICER_CONFLICTS } from '../../data/mockDataOfficer';

export const DataConflictDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const [opacityA, setOpacityA] = useState<number>(0.5);
  const [opacityB, setOpacityB] = useState<number>(0.5);
  const [commentText, setCommentText] = useState('');
  const [status, setStatus] = useState<string>('New');

  const conflict = MOCK_OFFICER_CONFLICTS.find((c) => c.id === id) || MOCK_OFFICER_CONFLICTS[0];

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [conflict.lng, conflict.lat],
      zoom: 14.5
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    mapRef.current = map;

    map.on('load', () => {
      // Dataset A: Revenue Parcel Boundary (Red)
      map.addSource('revenue-src', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { name: 'Revenue RoR Boundary (10.4 ha)' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [conflict.lng - 0.005, conflict.lat - 0.005],
                [conflict.lng + 0.003, conflict.lat - 0.005],
                [conflict.lng + 0.003, conflict.lat + 0.003],
                [conflict.lng - 0.005, conflict.lat + 0.003],
                [conflict.lng - 0.005, conflict.lat - 0.005]
              ]
            ]
          }
        }
      });

      map.addLayer({
        id: 'revenue-fill',
        type: 'fill',
        source: 'revenue-src',
        paint: {
          'fill-color': '#EF4444',
          'fill-opacity': opacityA
        }
      });

      map.addLayer({
        id: 'revenue-line',
        type: 'line',
        source: 'revenue-src',
        paint: {
          'line-color': '#B91C1C',
          'line-width': 2
        }
      });

      // Dataset B: Satellite Polygon Boundary (Orange)
      map.addSource('satellite-src', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { name: 'Satellite Derived Boundary (12.1 ha)' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [conflict.lng - 0.005, conflict.lat - 0.005],
                [conflict.lng + 0.005, conflict.lat - 0.005],
                [conflict.lng + 0.005, conflict.lat + 0.005],
                [conflict.lng - 0.005, conflict.lat + 0.005],
                [conflict.lng - 0.005, conflict.lat - 0.005]
              ]
            ]
          }
        }
      });

      map.addLayer({
        id: 'satellite-fill',
        type: 'fill',
        source: 'satellite-src',
        paint: {
          'fill-color': '#F59E0B',
          'fill-opacity': opacityB
        }
      });

      map.addLayer({
        id: 'satellite-line',
        type: 'line',
        source: 'satellite-src',
        paint: {
          'line-color': '#D97706',
          'line-width': 2,
          'line-dasharray': [2, 2]
        }
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [conflict]);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/data/conflicts')}
        className="inline-flex items-center space-x-1 text-xs text-[#1D5D91] hover:underline font-bold"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Discrepancy Registry</span>
      </button>

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-red-700 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                DISCREPANCY ID: {conflict.parcelId}
              </span>
              <span className="text-slate-500 text-xs font-semibold">{conflict.district}</span>
            </div>
            <h1 className="text-xl font-bold text-[#123B63] mt-1">{conflict.location}</h1>
            <p className="text-slate-600 text-xs mt-1 leading-relaxed max-w-3xl">
              {conflict.description}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded text-xs font-bold">
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* GIS Spatial Comparison Canvas & Opacity Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Canvas (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-[#123B63] uppercase tracking-wider flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#C98A18]" />
              <span>GIS Discrepancy Overlay (Red: Revenue vs Orange: Satellite)</span>
            </span>
            <span className="text-[11px] text-red-700 font-bold">Spatial Variance: +{conflict.differenceAreaHa} ha</span>
          </div>

          {/* Opacity Controls Bar */}
          <div className="p-2.5 bg-slate-100 border-b border-slate-200 grid grid-cols-2 gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-red-800 text-[11px]">Dataset A (Red):</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={opacityA}
                onChange={(e) => setOpacityA(parseFloat(e.target.value))}
                className="w-24"
              />
              <span className="text-[10px]">{Math.round(opacityA * 100)}%</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-bold text-amber-800 text-[11px]">Dataset B (Orange):</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={opacityB}
                onChange={(e) => setOpacityB(parseFloat(e.target.value))}
                className="w-24"
              />
              <span className="text-[10px]">{Math.round(opacityB * 100)}%</span>
            </div>
          </div>

          <div className="h-[420px] relative">
            <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
          </div>
        </div>

        {/* Resolution Workflow Panel (1 Col) */}
        <div className="bg-white p-5 rounded-lg shadow-xs border border-slate-200 space-y-4 text-xs">
          <h2 className="text-sm font-bold text-[#123B63] border-b border-slate-200 pb-2">
            Discrepancy Resolution Workflow
          </h2>

          <div className="space-y-2 bg-slate-50 p-3 rounded border border-slate-200">
            <p><strong className="text-slate-700">Assigned Officer:</strong> {conflict.assignedOfficer}</p>
            <p><strong className="text-slate-700">Detected Date:</strong> {conflict.detectedDate}</p>
            <p><strong className="text-slate-700">Revenue Acreage:</strong> {conflict.revenueAreaHa} ha</p>
            <p><strong className="text-slate-700">Satellite Acreage:</strong> {conflict.satelliteAreaHa} ha</p>
          </div>

          <div className="space-y-2">
            <label className="font-bold text-slate-700 block">Add Resolution Comment / Audit Rationale</label>
            <textarea
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Enter rationale or attach survey document verification reference..."
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#1D5D91]"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-200">
            <button
              onClick={() => setStatus('Under Investigation')}
              className="w-full py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded text-xs transition"
            >
              Mark Under Investigation
            </button>
            <button
              onClick={() => setStatus('Resolved')}
              className="w-full py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-xs transition"
            >
              Mark Discrepancy Resolved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
