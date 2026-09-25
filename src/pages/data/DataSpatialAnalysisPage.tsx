import React, { useState } from 'react';
import {
  BarChart3,
  Play,
  Layers,
  CheckCircle2,
  Download,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { MOCK_OFFICER_SPATIAL_ANALYSIS_JOBS } from '../../data/mockDataOfficer';

export const DataSpatialAnalysisPage: React.FC = () => {
  const [selectedOperation, setSelectedOperation] = useState<string>('Buffer');
  const [sourceLayer, setSourceLayer] = useState<string>('Industrial Corridors Vector');
  const [bufferDistance, setBufferDistance] = useState<string>('5.0');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<string | null>(null);

  const handleRunSpatialJob = () => {
    setIsExecuting(true);
    setExecutionResult(null);

    setTimeout(() => {
      setIsExecuting(false);
      setExecutionResult('Spatial operation successfully executed. 124 village settlement features generated within 5.0 km buffer geometry.');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200">
        <div className="flex items-center space-x-2">
          <span className="bg-[#123B63] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            SPATIAL PROCESSING ENGINE
          </span>
          <span className="text-slate-500 text-xs font-semibold">PostGIS Vector Operations</span>
        </div>
        <h1 className="text-xl font-bold text-[#123B63] mt-1">Spatial Operations & Analytical Workflows</h1>
        <p className="text-slate-600 text-xs mt-1">
          Perform spatial buffers, intersections, clips, spatial joins, point-in-polygon queries, and area calculations.
        </p>
      </div>

      {/* Spatial Workflow Setup Form */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200 space-y-4">
        <h2 className="text-sm font-bold text-[#123B63] border-b border-slate-200 pb-2">
          Configure Spatial Analysis Job
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Spatial Operation</label>
            <select
              value={selectedOperation}
              onChange={(e) => setSelectedOperation(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded font-semibold text-slate-800"
            >
              <option value="Buffer">Buffer (Proximity Calculation)</option>
              <option value="Intersect">Intersect (Polygon Overlay)</option>
              <option value="Spatial Join">Spatial Join (Attribute Transfer)</option>
              <option value="Distance">Distance & Area Measurement</option>
              <option value="Clip">Clip (Bounding Box Extraction)</option>
              <option value="Point-in-Polygon">Point-in-Polygon Query</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Primary Source Layer</label>
            <select
              value={sourceLayer}
              onChange={(e) => setSourceLayer(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded font-semibold text-slate-800"
            >
              <option value="Industrial Corridors Vector">Industrial Corridors Vector</option>
              <option value="Maharashtra District Boundaries">Maharashtra District Boundaries</option>
              <option value="CWC Flood Hazard Polygons">CWC Flood Hazard Polygons</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Buffer Distance (km)</label>
            <input
              type="number"
              value={bufferDistance}
              onChange={(e) => setBufferDistance(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded font-semibold text-slate-800"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleRunSpatialJob}
            disabled={isExecuting}
            className="px-5 py-2 bg-[#123B63] hover:bg-[#1D5D91] text-white text-xs font-bold rounded shadow-xs transition inline-flex items-center space-x-1.5 disabled:opacity-50"
          >
            <Play className={`w-4 h-4 ${isExecuting ? 'animate-spin' : ''}`} />
            <span>{isExecuting ? 'Processing PostGIS Job...' : 'Execute Spatial Job'}</span>
          </button>
        </div>

        {executionResult && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-900 font-semibold space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{executionResult}</span>
            </div>
            <button className="px-3 py-1 bg-emerald-700 text-white rounded text-[11px] font-bold">
              Export Output GeoJSON
            </button>
          </div>
        )}
      </div>

      {/* Historical Jobs Log */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <h2 className="text-xs font-bold text-[#123B63] uppercase tracking-wider">
            Completed Spatial Analysis Jobs
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold uppercase text-[10px]">
                <th className="p-3">Job Name</th>
                <th className="p-3">Operation</th>
                <th className="p-3">Source & Target</th>
                <th className="p-3">Parameters</th>
                <th className="p-3">Executed Date</th>
                <th className="p-3">Output Features</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px]">
              {MOCK_OFFICER_SPATIAL_ANALYSIS_JOBS.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{job.title}</td>
                  <td className="p-3 font-semibold text-[#1D5D91]">{job.operation}</td>
                  <td className="p-3 text-slate-700">{job.sourceLayer} → {job.targetLayer}</td>
                  <td className="p-3 font-mono text-[10px] text-slate-600">{job.parameters}</td>
                  <td className="p-3 text-slate-600">{job.executedDate}</td>
                  <td className="p-3 font-bold">{job.outputFeaturesCount} Features</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold rounded text-[10px]">
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
