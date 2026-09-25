import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ArrowLeft,
  Calendar,
  Building2,
  MapPin,
  ExternalLink,
  FileText,
  ShieldCheck,
  Globe2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PUBLIC_RESEARCH_PAPERS } from '../../data/mockPublic';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';
import { PublicGISMap } from '../../components/maps/PublicGISMap';

export const PublicResearchDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const paper = PUBLIC_RESEARCH_PAPERS.find(p => p.id === id);

  if (!paper) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-[#123B63]">Research Record Not Found</h2>
        <p className="text-sm text-slate-600">The requested public research paper identifier could not be found.</p>
        <Link
          to="/public/research"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-[#1D5D91] text-white rounded-md font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Research Knowledge Portal</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 select-none">
      {/* Back Button */}
      <button
        onClick={() => navigate('/public/research')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1D5D91] hover:text-[#123B63] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Research Knowledge Portal</span>
      </button>

      {/* Main Paper Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {paper.topics.map((t, idx) => (
              <span key={idx} className="px-2.5 py-0.5 text-xs font-semibold rounded bg-amber-50 text-amber-900 border border-amber-200">
                {t}
              </span>
            ))}
          </div>
          <DataSourceBadge status={paper.dataStatus} size="md" />
        </div>

        <h1 className="text-2xl font-serif font-bold text-[#123B63] leading-tight">
          {paper.title}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Authors</span>
            <span className="font-bold text-slate-900">{paper.authors.join(', ')}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Institution / University</span>
            <span className="font-bold text-slate-900">{paper.institution}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Source & DOI</span>
            <span className="font-semibold text-slate-800">{paper.publisher} {paper.doi ? `(${paper.doi})` : ''}</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Full Abstract, Methodology, Findings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Abstract */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-[#123B63] border-b border-slate-100 pb-2">Abstract</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{paper.abstract}</p>
          </div>

          {/* Research Question & Methodology */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1D5D91] mb-1">Research Question</h4>
              <p className="text-xs text-slate-800 font-semibold italic bg-blue-50/60 p-3 rounded border border-blue-100">
                "{paper.researchQuestion}"
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1D5D91] mb-1">Methodology</h4>
              <p className="text-xs text-slate-700">{paper.methodology}</p>
            </div>
          </div>

          {/* Key Findings */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-[#123B63] border-b border-slate-100 pb-2">Key Findings</h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {paper.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Relevance & Limitations */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-[#123B63] mb-1">Policy Relevance</h4>
              <p className="text-slate-700 bg-amber-50/50 p-3 rounded border border-amber-200">{paper.policyRelevance}</p>
            </div>

            <div>
              <h4 className="font-bold text-[#123B63] mb-1">Limitations</h4>
              <p className="text-slate-600 bg-slate-50 p-3 rounded border border-slate-200">{paper.limitations}</p>
            </div>
          </div>
        </div>

        {/* Right Column: GIS Location & Metadata Sidebar */}
        <div className="space-y-6">
          {/* GIS Study Location */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#123B63] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#C98A18]" />
              <span>GIS Study Area Location</span>
            </h3>
            <div className="text-xs text-slate-600 space-y-1">
              <p>State: <strong>{paper.studyArea.state}</strong></p>
              <p>Districts: <strong>{paper.studyArea.districts.join(', ')}</strong></p>
              <p>Coordinates: <span className="font-mono text-slate-800">{paper.studyArea.lat}, {paper.studyArea.lng}</span></p>
            </div>
            <PublicGISMap height="240px" initialDistrict={paper.studyArea.districts[0]} />
          </div>

          {/* Data Used */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#123B63]">Input Datasets Used</h3>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {paper.dataUsed.map((data, idx) => (
                <li key={idx} className="p-2 bg-slate-50 rounded border border-slate-100 font-mono text-[11px]">
                  {data}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
