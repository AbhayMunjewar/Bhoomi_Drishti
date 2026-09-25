import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Play,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Database,
  Layers,
  ChevronRight,
  Info,
  Sliders,
  Clock,
  ArrowRight,
  X,
  FileText
} from 'lucide-react';
import { MOCK_PIPELINE_RUNS, PipelineRunItem } from '../../data/mockDataOfficer';

export const DataPipelinePage: React.FC = () => {
  const navigate = useNavigate();
  const [pipelineRuns, setPipelineRuns] = useState<PipelineRunItem[]>(MOCK_PIPELINE_RUNS);
  const [selectedRun, setSelectedRun] = useState<PipelineRunItem | null>(null);
  const [activePipelineId, setActivePipelineId] = useState<string>(MOCK_PIPELINE_RUNS[0].id);
  const [isExecuting, setIsExecuting] = useState(false);

  const activeRun = pipelineRuns.find((p) => p.id === activePipelineId) || pipelineRuns[0];

  const handleRunPipeline = (id: string) => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setPipelineRuns((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: 'Completed', lastRun: 'Just now', recordsProcessed: item.recordsRead }
            : item
        )
      );
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-xs border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-[#123B63] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                AUTOMATED INGESTION & PROCESSING
              </span>
              <span className="text-slate-500 text-xs font-semibold">PostGIS Data Pipeline</span>
            </div>
            <h1 className="text-xl font-bold text-[#123B63] mt-1">Data Pipeline Engine</h1>
            <p className="text-slate-600 text-xs mt-1">
              Monitor automated data ingestion, validation, processing, and storage across BhoomiDrishti data sources.
            </p>
          </div>

          <button
            onClick={() => handleRunPipeline(activePipelineId)}
            disabled={isExecuting}
            className="flex items-center space-x-2 bg-[#123B63] hover:bg-[#1D5D91] text-white px-4 py-2 rounded text-xs font-bold transition shadow-xs disabled:opacity-50 self-start md:self-auto"
          >
            <Play className={`w-4 h-4 text-[#C98A18] ${isExecuting ? 'animate-spin' : ''}`} />
            <span>{isExecuting ? 'Running Pipeline...' : 'Run All Active Pipelines'}</span>
          </button>
        </div>
      </div>

      {/* Prototype Architectural Banner */}
      <div className="bg-blue-50 border-l-4 border-[#1D5D91] p-4 rounded-r-lg shadow-xs space-y-1.5 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#123B63] font-bold">
            <Info className="w-4 h-4 text-[#1D5D91]" />
            <span className="uppercase text-[11px] tracking-wider">Prototype Data Source Architecture</span>
          </div>
          <span className="bg-blue-200 text-blue-900 px-2 py-0.5 rounded text-[10px] font-bold">
            CSV Source Layer Mode
          </span>
        </div>
        <p className="text-slate-700 leading-relaxed text-[11px]">
          This prototype uses prepared CSV datasets to simulate incoming government data feeds. In production, the same pipeline can connect to authorized government APIs and data services without altering downstream PostGIS or policy simulation layers.
        </p>
      </div>

      {/* Top Dynamic KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500">Active Pipelines</span>
          <p className="text-2xl font-bold text-[#123B63] mt-0.5">6</p>
          <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">Automated Runs Active</p>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500">Successful Runs</span>
          <p className="text-2xl font-bold text-emerald-800 mt-0.5">142</p>
          <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">100% Ingested</p>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500">Validation Passed</span>
          <p className="text-2xl font-bold text-blue-800 mt-0.5">98.7%</p>
          <p className="text-[10px] text-slate-500 font-medium mt-0.5">Topology & Schema QA</p>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500">Data Quality Score</span>
          <p className="text-2xl font-bold text-purple-800 mt-0.5">98.5%</p>
          <p className="text-[10px] text-slate-500 font-medium mt-0.5">High Integrity</p>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500">Failed / Warnings</span>
          <p className="text-2xl font-bold text-amber-600 mt-0.5">1</p>
          <p className="text-[10px] text-amber-700 font-medium mt-0.5">Requires QA Review</p>
        </div>
      </div>

      {/* Pipeline Stage Visualization */}
      <div className="bg-white p-5 rounded-lg shadow-xs border border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xs font-bold text-[#123B63] uppercase tracking-wider flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-[#C98A18]" />
              <span>Automated Pipeline Stage Flow</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Active Focus: <strong>{activeRun.datasetName}</strong> ({activeRun.sourceFile})
            </p>
          </div>

          <select
            value={activePipelineId}
            onChange={(e) => setActivePipelineId(e.target.value)}
            className="px-3 py-1 bg-slate-50 border border-slate-300 rounded text-xs font-semibold text-slate-800"
          >
            {pipelineRuns.map((run) => (
              <option key={run.id} value={run.id}>
                {run.datasetName} ({run.sourceType})
              </option>
            ))}
          </select>
        </div>

        {/* Stage Visualization Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2 text-xs">
          {activeRun.stages.map((stg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded border text-center space-y-1 relative ${
                stg.status === 'Completed' || stg.status === 'Passed'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : stg.status === 'Warning'
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <span className="text-[9px] font-bold uppercase tracking-wider block text-slate-500">
                Stage {idx + 1}
              </span>
              <span className="font-bold block text-xs truncate">{stg.stage}</span>

              <span
                className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold ${
                  stg.status === 'Completed' || stg.status === 'Passed'
                    ? 'bg-emerald-200 text-emerald-900'
                    : 'bg-amber-200 text-amber-900'
                }`}
              >
                {stg.status}
              </span>

              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200/60 mt-1">
                <p>{stg.recordsCount} Records</p>
                <p className="font-mono text-[9px] text-slate-400">{stg.durationMs}ms</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Source Pipeline Table */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#123B63] uppercase tracking-wider">
            Data Source Pipeline Registry
          </h2>
          <span className="text-[11px] text-slate-500 font-medium">PostgreSQL / PostGIS Target Engine</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#123B63] text-white font-bold uppercase text-[10px]">
                <th className="p-3">Dataset Name</th>
                <th className="p-3">Source Type</th>
                <th className="p-3">Source File / Feed</th>
                <th className="p-3">Records Ingested</th>
                <th className="p-3">Last Pipeline Run</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px]">
              {pipelineRuns.map((run) => (
                <tr key={run.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-slate-800">{run.datasetName}</td>

                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-900 border border-blue-300 rounded font-bold text-[10px]">
                      {run.sourceType}
                    </span>
                  </td>

                  <td className="p-3 font-mono text-[11px] text-slate-700">{run.sourceFile}</td>

                  <td className="p-3 font-semibold text-slate-800">{run.recordsRead} Records</td>

                  <td className="p-3 text-slate-600">{run.lastRun}</td>

                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        run.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : run.status === 'Validation Required'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-red-100 text-red-800 border border-red-300'
                      }`}
                    >
                      {run.status}
                    </span>
                  </td>

                  <td className="p-3 text-right space-x-1">
                    <button
                      onClick={() => handleRunPipeline(run.id)}
                      disabled={isExecuting}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-[#123B63] hover:text-white text-slate-700 font-bold rounded text-[10px] transition border border-slate-300"
                    >
                      Run Pipeline
                    </button>
                    <button
                      onClick={() => setSelectedRun(run)}
                      className="px-2.5 py-1 bg-[#123B63] hover:bg-[#1D5D91] text-white font-bold rounded text-[10px] transition shadow-xs"
                    >
                      View Run Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Failure / Error Handling Section */}
      <div className="bg-white p-5 rounded-lg shadow-xs border border-slate-200 space-y-3">
        <h2 className="text-xs font-bold text-red-800 uppercase tracking-wider flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <span>Pipeline Exception & Failure Log</span>
        </h2>

        <div className="p-3.5 bg-red-50 border border-red-200 rounded text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-red-900">coastal_crz_buffer.csv - Schema Warning</span>
            <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
              Validation Required
            </span>
          </div>
          <p className="text-slate-700 text-[11px]">
            Validation engine flagged 4 records with null mangrove density classifications. Output held prior to PostGIS publication.
          </p>
          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={() => handleRunPipeline('pipe-run-104')}
              className="px-3 py-1 bg-red-800 text-white rounded text-[10px] font-bold hover:bg-red-900"
            >
              Retry Pipeline
            </button>
            <button
              onClick={() => navigate('/data/validation')}
              className="px-3 py-1 bg-white border border-slate-300 text-slate-700 rounded text-[10px] font-semibold"
            >
              View Validation Suite
            </button>
          </div>
        </div>
      </div>

      {/* PIPELINE RUN DETAILS MODAL */}
      {selectedRun && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 max-w-2xl w-full overflow-hidden space-y-4">
            <div className="p-4 bg-[#123B63] text-white flex items-center justify-between">
              <div>
                <span className="bg-[#C98A18] text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded">
                  PIPELINE RUN DETAILS
                </span>
                <h3 className="text-sm font-bold mt-0.5">{selectedRun.datasetName}</h3>
              </div>
              <button
                onClick={() => setSelectedRun(null)}
                className="text-slate-300 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded border border-slate-200">
                <p><strong className="text-slate-700">Pipeline Run ID:</strong> {selectedRun.id}</p>
                <p><strong className="text-slate-700">Source File:</strong> {selectedRun.sourceFile}</p>
                <p><strong className="text-slate-700">Source Type:</strong> {selectedRun.sourceType}</p>
                <p><strong className="text-slate-700">Production Target:</strong> {selectedRun.productionTarget}</p>
                <p><strong className="text-slate-700">Last Execution:</strong> {selectedRun.lastRun}</p>
                <p><strong className="text-slate-700">Pipeline Duration:</strong> {selectedRun.durationSeconds}s</p>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2.5 bg-blue-50 border border-blue-200 rounded">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Read</span>
                  <p className="text-base font-bold text-blue-900 mt-0.5">{selectedRun.recordsRead}</p>
                </div>
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Validated</span>
                  <p className="text-base font-bold text-emerald-900 mt-0.5">{selectedRun.recordsValidated}</p>
                </div>
                <div className="p-2.5 bg-purple-50 border border-purple-200 rounded">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Quality Score</span>
                  <p className="text-base font-bold text-purple-900 mt-0.5">{selectedRun.qualityScore}%</p>
                </div>
                <div className="p-2.5 bg-slate-100 border border-slate-300 rounded">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Rejected</span>
                  <p className="text-base font-bold text-slate-800 mt-0.5">{selectedRun.recordsRejected}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-slate-800">Target Database Storage:</p>
                <p className="text-slate-600">Relational Database: <strong>PostgreSQL 15</strong> · Spatial Extension: <strong>PostGIS 3.3</strong></p>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-200">
                <button
                  onClick={() => setSelectedRun(null)}
                  className="px-4 py-2 bg-slate-700 text-white font-bold rounded text-xs hover:bg-slate-800"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
