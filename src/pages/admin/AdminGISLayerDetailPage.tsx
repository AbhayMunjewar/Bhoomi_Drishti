import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft, ShieldCheck, Layers, CheckCircle2, Lock, Eye, EyeOff } from 'lucide-react';
import { MOCK_ADMIN_GIS_LAYERS } from '../../data/mockAdmin';
import { PublicGISMap } from '../../components/maps/PublicGISMap';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const AdminGISLayerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const lyr = MOCK_ADMIN_GIS_LAYERS.find(l => l.id === id) || MOCK_ADMIN_GIS_LAYERS[0];
  const [status, setStatus] = useState<string>(lyr.status);
  const [visibility, setVisibility] = useState<string>(lyr.visibility);
  const [actionDoneMsg, setActionDoneMsg] = useState<string | null>(null);

  const handleTogglePublish = () => {
    const nextStatus = status === 'Published' ? 'Restricted' : 'Published';
    setStatus(nextStatus);
    setActionDoneMsg(`Layer access updated to ${nextStatus}. Audit event logged.`);
    setTimeout(() => setActionDoneMsg(null), 4000);
  };

  return (
    <div className="space-y-6 select-none">
      <button
        onClick={() => navigate('/admin/gis-layers')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1D5D91] hover:text-[#123B63] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to GIS Spatial Layers Catalog</span>
      </button>

      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 text-xs font-bold uppercase rounded bg-blue-50 text-blue-800 border border-blue-200">
            Geometry: {lyr.geometryType}
          </span>
          <DataSourceBadge status="OFFICIAL_SOURCE" size="md" />
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63] leading-tight">
              {lyr.name}
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">Source: {lyr.source} • Coverage: {lyr.coverage}</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleTogglePublish}
              className={`px-4 py-2 text-white font-bold text-xs rounded shadow-xs ${
                status === 'Published' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {status === 'Published' ? 'Unpublish / Restrict Layer' : 'Publish Layer to Public Portal'}
            </button>
          </div>
        </div>

        {actionDoneMsg && (
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded text-xs text-emerald-900 flex items-center space-x-2 font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionDoneMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Feature Count</span>
            <span className="font-bold text-slate-900">{lyr.featureCount} Polygons / Lines</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Coordinate System</span>
            <span className="font-bold font-mono text-slate-900">EPSG:4326 (WGS 84)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Visibility Scope</span>
            <span className="font-bold text-[#1D5D91]">{visibility}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Publication Status</span>
            <span className={`font-bold ${status === 'Published' ? 'text-emerald-700' : 'text-red-700'}`}>{status}</span>
          </div>
        </div>
      </div>

      {/* MapLibre GIS Map Preview */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-[#123B63]">Full Interactive MapLibre Spatial Layer Preview</h3>
        <PublicGISMap height="550px" />
      </div>
    </div>
  );
};
