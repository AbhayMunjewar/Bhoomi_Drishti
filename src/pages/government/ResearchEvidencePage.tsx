import React, { useState } from 'react';
import { MOCK_RESEARCH_PAPERS } from '../../data/mockResearch';
import { Search, BookOpen, MapPin, ExternalLink, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResearchEvidencePage: React.FC = () => {
  const [query, setQuery] = useState('What are the challenges of land record digitization in India?');

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="bg-white p-4 rounded-md border border-[#D9DEE5] shadow-2xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D5D91] bg-[#1D5D91]/10 px-2 py-0.5 rounded">
          Government Portal &bull; Research Evidence Explorer
        </span>
        <h2 className="text-xl font-bold text-[#123B63] font-serif mt-1">
          Evidence Explorer & Research Repository
        </h2>
        <p className="text-xs text-[#5B6573]">
          Search peer-reviewed studies, institutional reports, and case studies for statutory policy decisions
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-[#D9DEE5] shadow-xs space-y-2">
        <label className="font-bold text-xs text-[#123B63] block">AI Evidence Search Query:</label>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-24 py-2.5 bg-[#F5F7F9] border border-[#D9DEE5] rounded-md text-xs font-medium focus:outline-none focus:border-[#1D5D91]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <button className="absolute right-2 top-1.5 bg-[#123B63] hover:bg-[#1D5D91] text-white px-4 py-1.5 rounded font-bold text-xs transition-colors">
            Search Evidence
          </button>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {MOCK_RESEARCH_PAPERS.map((paper) => (
          <div key={paper.id} className="bg-white p-5 rounded-lg border border-[#D9DEE5] shadow-2xs space-y-3 text-xs">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#1D5D91] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Relevance Score: {paper.relevanceScore}%
                </span>
                <h3 className="font-bold text-sm text-[#123B63] leading-snug">{paper.title}</h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  {paper.authors.join(', ')} ({paper.year}) &bull; {paper.publisherOrSource}
                </p>
              </div>

              <span className="govt-badge bg-[#2E6B45]/10 text-[#2E6B45] border border-[#2E6B45]/30">
                {paper.status}
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed bg-[#F5F7F9] p-3 rounded border border-slate-200 text-[11px]">
              {paper.abstract}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <div className="flex space-x-2">
                {paper.topics.map((t, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px]">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex space-x-3">
                <Link
                  to={`/research/papers/${paper.id}`}
                  className="text-[#1D5D91] font-bold hover:underline inline-flex items-center space-x-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Full Paper</span>
                </Link>
                <Link
                  to="/research/map"
                  className="text-[#2E6B45] font-bold hover:underline inline-flex items-center space-x-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>View Geographic Location on Map</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
