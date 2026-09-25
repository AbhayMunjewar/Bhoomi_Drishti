import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Lightbulb,
  BookOpen,
  Database,
  Layers,
  Target,
  Sliders,
  CheckCircle2,
  MapPin,
  Building,
  Users,
  Award,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  FileText
} from 'lucide-react';
import { MOCK_INNOVATION_DETAIL, MOCK_PILOT_PROJECTS } from '../../data/mockInnovation';

export const InnovationDetailPage: React.FC = () => {
  const detail = MOCK_INNOVATION_DETAIL;
  const pilot = MOCK_PILOT_PROJECTS[0];

  return (
    <div className="space-y-6">
      {/* BREADCRUMB & HEADER */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
          <Link to="/innovation" className="hover:underline">Innovation Hub</Link>
          <span>/</span>
          <Link to="/innovation/pilots" className="hover:underline">Pilots</Link>
          <span>/</span>
          <span className="text-[#123B63] font-bold">{detail.id}</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-2">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-bold">
                ID: {detail.id}
              </span>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{detail.geography}</span>
              </span>
            </div>
            <h1 className="text-2xl font-black text-[#123B63] font-serif mt-1">{detail.title}</h1>
            <p className="text-xs text-slate-500 font-medium">{detail.institution} • Team: {detail.team}</p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3.5 py-1.5 rounded-lg font-bold">
            Pilot Status: {detail.pilotStatus}
          </div>
        </div>
      </div>

      {/* EVIDENCE GRAPH LINKAGE BANNER */}
      <div className="bg-[#123B63] text-white p-4 rounded-xl shadow-md space-y-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4" />
          <span>BhoomiDrishti Integrated Evidence Ecosystem Graph</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono pt-1">
          <span className="bg-[#1D5D91] px-2.5 py-1 rounded border border-[#1D5D91]/60">Dataset</span>
          <span className="text-amber-400">↔</span>
          <span className="bg-[#1D5D91] px-2.5 py-1 rounded border border-[#1D5D91]/60">Research Paper</span>
          <span className="text-amber-400">↔</span>
          <span className="bg-[#C98A18] text-white font-bold px-2.5 py-1 rounded">Innovation Pilot</span>
          <span className="text-amber-400">↔</span>
          <span className="bg-[#1D5D91] px-2.5 py-1 rounded border border-[#1D5D91]/60">Policy Scenario</span>
          <span className="text-amber-400">↔</span>
          <span className="bg-[#2E6B45] text-white font-bold px-2.5 py-1 rounded">Empirical Outcome</span>
        </div>
      </div>

      {/* 2-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* MAIN DETAILS - LEFT 2 COLUMNS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* PROBLEM & SOLUTION */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#123B63] uppercase tracking-wider mb-1">Problem Statement</h3>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                {detail.problem}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#123B63] uppercase tracking-wider mb-1">Proposed Solution & Technical Architecture</h3>
              <p className="text-xs text-slate-700 leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                {detail.proposedSolution}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Core Technologies</span>
                <div className="font-semibold text-slate-800 mt-0.5">{detail.technology}</div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Research Basis</span>
                <div className="font-semibold text-[#1D5D91] mt-0.5">{detail.researchBasis}</div>
              </div>
            </div>
          </div>

          {/* PILOT PERFORMANCE COMPARISON */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-[#123B63] uppercase tracking-wider">Pilot Evaluation Results</h3>
              <span className="text-xs font-bold text-emerald-700 font-mono">Location: {pilot.location}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                <div className="font-bold text-slate-800">Detection Accuracy (%)</div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Predicted Target:</span>
                    <span className="font-bold text-slate-700">{pilot.predictedMetrics.detectionAccuracyPct}%</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-emerald-700 font-bold">
                    <span>Empirical Actual:</span>
                    <span>{pilot.actualMetrics?.detectionAccuracyPct}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                <div className="font-bold text-slate-800">False Positive Rate (%)</div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Predicted Target:</span>
                    <span className="font-bold text-slate-700">{pilot.predictedMetrics.falsePositivePct}%</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-emerald-700 font-bold">
                    <span>Empirical Actual:</span>
                    <span>{pilot.actualMetrics?.falsePositivePct}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/70 p-3 rounded-lg border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <strong className="block font-bold">Official Field Outcome & Recommendation:</strong>
              <p className="text-[11px] leading-relaxed">{detail.evaluationOutcome}</p>
            </div>
          </div>

          {/* EXPECTED VS ACTUAL IMPACT */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-[#123B63] uppercase tracking-wider">Expected Impact & Evidence Summary</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {detail.expectedImpact}
            </p>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
              <strong>Evidence Verification:</strong> Approved by Higher Land Authority (Dr. K. S. Rajan, IAS) for multi-district pilot expansion.
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN - LINKED EVIDENCE ECOSYSTEM CARDS */}
        <div className="space-y-4">
          
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#123B63] flex items-center space-x-1.5 border-b border-slate-100 pb-2">
              <BookOpen className="w-4 h-4 text-[#1D5D91]" />
              <span>Related Research Paper</span>
            </h4>
            <div className="text-xs space-y-1">
              <div className="font-bold text-[#123B63]">{detail.relatedResearchPaper}</div>
              <Link
                to="/research/papers"
                className="text-[11px] text-[#1D5D91] font-bold hover:underline block pt-1"
              >
                Read Research Abstract →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#123B63] flex items-center space-x-1.5 border-b border-slate-100 pb-2">
              <Database className="w-4 h-4 text-[#C98A18]" />
              <span>Related Dataset</span>
            </h4>
            <div className="text-xs space-y-1">
              <div className="font-bold text-[#123B63]">{detail.datasetUsed}</div>
              <Link
                to="/data/datasets"
                className="text-[11px] text-[#1D5D91] font-bold hover:underline block pt-1"
              >
                Inspect Dataset Attributes →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#123B63] flex items-center space-x-1.5 border-b border-slate-100 pb-2">
              <Sliders className="w-4 h-4 text-purple-700" />
              <span>Related Policy Scenario</span>
            </h4>
            <div className="text-xs space-y-1">
              <div className="font-bold text-[#123B63]">{detail.relatedPolicyScenario}</div>
              <Link
                to="/government/policy/simulator"
                className="text-[11px] text-[#1D5D91] font-bold hover:underline block pt-1"
              >
                Open in Policy Simulator →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#123B63] flex items-center space-x-1.5 border-b border-slate-100 pb-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>GIS Layer</span>
            </h4>
            <div className="text-xs space-y-1">
              <div className="font-bold text-[#123B63]">{detail.relatedGISLayer}</div>
              <Link
                to="/data/gis-map"
                className="text-[11px] text-[#1D5D91] font-bold hover:underline block pt-1"
              >
                Open GIS Map Layer →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
