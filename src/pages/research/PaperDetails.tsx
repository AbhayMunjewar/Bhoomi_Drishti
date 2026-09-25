import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_RESEARCH_PAPERS } from '../../data/mockResearch';
import { BookOpen, MapPin, ExternalLink, ArrowLeft, CheckCircle, FileText } from 'lucide-react';

export const PaperDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const paper = MOCK_RESEARCH_PAPERS.find((p) => p.id === id) || MOCK_RESEARCH_PAPERS[0];

  return (
    <div className="space-y-6 select-none text-xs">
      
      {/* Header Bar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-md border border-[#D9DEE5] shadow-2xs">
        <Link
          to="/research/search"
          className="border border-[#1D5D91] text-[#1D5D91] hover:bg-[#1D5D91] hover:text-white px-3 py-1.5 rounded font-bold transition-colors flex items-center space-x-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Search</span>
        </Link>

        <Link
          to="/research/map"
          className="bg-[#2E6B45] hover:bg-[#2E6B45]/90 text-white px-4 py-1.5 rounded font-bold shadow-2xs flex items-center space-x-1.5 transition-colors"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>View Geographic Relevance on Map</span>
        </Link>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Paper Info */}
        <div className="lg:col-span-8 bg-white p-6 rounded-lg border border-[#D9DEE5] shadow-xs space-y-4">
          <div>
            <span className="text-[10px] font-bold text-[#1D5D91] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase">
              {paper.publisherOrSource} &bull; {paper.year}
            </span>
            <h1 className="text-lg font-bold text-[#123B63] leading-snug mt-2">{paper.title}</h1>
            <p className="text-slate-600 font-medium mt-1">Authors: {paper.authors.join(', ')}</p>
            {paper.doi && <p className="text-slate-400 font-mono text-[10px] mt-0.5">DOI: {paper.doi}</p>}
          </div>

          <div className="border-t border-slate-200 pt-4 space-y-2">
            <h3 className="font-bold text-sm text-[#123B63]">Abstract</h3>
            <p className="text-slate-600 leading-relaxed bg-[#F5F7F9] p-4 rounded border border-slate-200">
              {paper.abstract}
            </p>
          </div>

          <div className="border-t border-slate-200 pt-4 space-y-2">
            <h3 className="font-bold text-sm text-[#123B63]">Key Findings & Evidence</h3>
            <ul className="space-y-2">
              {paper.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-slate-700 bg-emerald-50/50 p-2.5 rounded border border-emerald-200/60">
                  <CheckCircle className="w-4 h-4 text-[#2E6B45] flex-shrink-0 mt-0.5" />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-200 pt-4 space-y-2">
            <h3 className="font-bold text-sm text-[#123B63]">Methodology & GIS Vectors</h3>
            <p className="text-slate-600">{paper.methodology}</p>
          </div>
        </div>

        {/* Right Column: Geographic & Policy Metadata */}
        <div className="lg:col-span-4 bg-white p-5 rounded-lg border border-[#D9DEE5] shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <h3 className="font-bold text-sm text-[#123B63]">Geographic & Policy Relevance</h3>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">State & Districts:</span>
            <p className="font-bold text-[#123B63]">{paper.geographicRelevance.state}</p>
            <div className="flex flex-wrap gap-1">
              {paper.geographicRelevance.districts.map((d, idx) => (
                <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-700">
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Policy Application:</span>
            <p className="text-slate-600 bg-amber-50 p-3 rounded border border-amber-200 text-[11px]">
              {paper.policyRelevance}
            </p>
          </div>

          <Link
            to="/research/map"
            className="w-full text-center bg-[#123B63] hover:bg-[#1D5D91] text-white py-2.5 rounded font-bold text-xs block transition-colors shadow-2xs"
          >
            Open Interactive Research Map
          </Link>
        </div>

      </div>

    </div>
  );
};
