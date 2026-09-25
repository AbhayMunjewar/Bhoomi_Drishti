import React, { useState } from 'react';
import { MOCK_RESEARCH_PAPERS, MOCK_RESEARCH_DATASETS, MOCK_RESEARCH_PROJECTS } from '../../data/mockResearch';
import { ResearchMap } from '../../components/maps/ResearchMap';
import { BookOpen, Search, MapPin, Database, FolderKanban, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResearchOverview: React.FC = () => {
  return (
    <div className="space-y-6 select-none">
      
      {/* Header */}
      <div className="bg-white p-4 rounded-md border border-[#D9DEE5] shadow-2xs flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D5D91] bg-[#1D5D91]/10 px-2 py-0.5 rounded">
            Research Portal &bull; Institutional Knowledge Base
          </span>
          <h2 className="text-xl font-bold text-[#123B63] font-serif mt-1">
            National Land Governance Research Hub
          </h2>
          <p className="text-xs text-[#5B6573]">
            Peer-reviewed literature, open datasets, and GIS spatial research mapping
          </p>
        </div>

        <Link
          to="/research/search"
          className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-4 py-2 rounded font-bold text-xs shadow-2xs flex items-center space-x-2 transition-colors"
        >
          <Search className="w-4 h-4 text-[#C98A18]" />
          <span>Launch AI Research Search</span>
        </Link>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-4 rounded-lg border border-[#D9DEE5] shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Research Papers</span>
          <p className="text-2xl font-black text-[#123B63] mt-1">1,420</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#D9DEE5] shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Open GIS Datasets</span>
          <p className="text-2xl font-black text-[#2E6B45] mt-1">340</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#D9DEE5] shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Active Projects</span>
          <p className="text-2xl font-black text-[#1D5D91] mt-1">86</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#D9DEE5] shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Partner Institutions</span>
          <p className="text-2xl font-black text-[#C98A18] mt-1">42</p>
        </div>
      </div>

      {/* Research Map Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm text-[#123B63] flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-[#1D5D91]" />
            <span>Geographic Distribution of Research Studies</span>
          </h3>
          <Link to="/research/map" className="text-xs font-bold text-[#1D5D91] hover:underline">
            View Full Screen Research Map &rarr;
          </Link>
        </div>

        <ResearchMap />
      </div>

    </div>
  );
};

export const ResearchSearch: React.FC = () => {
  const [query, setQuery] = useState('What are the challenges of land record digitization in India?');

  return (
    <div className="space-y-6 select-none">
      <div className="bg-white p-4 rounded-md border border-[#D9DEE5] shadow-2xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D5D91] bg-[#1D5D91]/10 px-2 py-0.5 rounded">
          Research Portal &bull; AI Semantic Search Engine
        </span>
        <h2 className="text-xl font-bold text-[#123B63] font-serif mt-1">
          AI-Powered Land Research Discovery
        </h2>
        <p className="text-xs text-[#5B6573]">
          Natural language semantic search across peer-reviewed literature, satellite studies & policy briefs
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-[#D9DEE5] shadow-xs space-y-4">
        <label className="font-bold text-sm text-[#123B63] block">Ask a Research Question:</label>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question..."
            className="w-full pl-11 pr-32 py-3 bg-[#F5F7F9] border border-[#D9DEE5] rounded-md text-sm font-medium focus:outline-none focus:border-[#1D5D91]"
          />
          <Sparkles className="w-5 h-5 text-[#C98A18] absolute left-3.5 top-3.5" />
          <button className="absolute right-2 top-2 bg-[#123B63] hover:bg-[#1D5D91] text-white px-5 py-2 rounded-md font-bold text-xs shadow-xs transition-colors">
            Run AI Search
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_RESEARCH_PAPERS.map((paper) => (
          <div key={paper.id} className="bg-white p-5 rounded-lg border border-[#D9DEE5] shadow-2xs space-y-3 text-xs">
            <h3 className="font-bold text-sm text-[#123B63]">{paper.title}</h3>
            <p className="text-[11px] text-slate-500">{paper.authors.join(', ')} ({paper.year}) &bull; {paper.publisherOrSource}</p>
            <p className="text-slate-600 bg-[#F5F7F9] p-3 rounded border border-slate-200">{paper.abstract}</p>
            <div className="flex justify-between items-center pt-2">
              <Link to={`/research/papers/${paper.id}`} className="text-[#1D5D91] font-bold hover:underline">
                View Paper Details &rarr;
              </Link>
              <Link to="/research/map" className="text-[#2E6B45] font-bold hover:underline">
                View Geographic Location on Map &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
