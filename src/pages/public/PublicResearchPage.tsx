import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, MapPin, Building2, Calendar, CheckCircle, RefreshCw } from 'lucide-react';
import { PUBLIC_RESEARCH_PAPERS, PublicResearchPaper } from '../../data/mockPublic';
import { PublicResearchCard } from '../../components/public/PublicResearchCard';

export const PublicResearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');

  const topics = [
    'All',
    'Land Records',
    'Land Acquisition',
    'Land Use',
    'Agriculture',
    'Urban Development',
    'Climate Resilience',
    'Land Disputes',
    'Digital Land Governance',
    'Remote Sensing',
    'Infrastructure',
    'Environmental Planning',
    'Policy Innovation'
  ];

  const filteredPapers = PUBLIC_RESEARCH_PAPERS.filter(paper => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
      paper.institution.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTopic =
      selectedTopic === 'All' || paper.topics.some(t => t.toLowerCase().includes(selectedTopic.toLowerCase()));

    const matchesDistrict =
      selectedDistrict === 'All' || paper.studyArea.districts.includes(selectedDistrict);

    const matchesYear =
      selectedYear === 'All' || paper.year.toString() === selectedYear;

    return matchesSearch && matchesTopic && matchesDistrict && matchesYear;
  });

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center space-x-2 text-[#1D5D91] text-xs font-bold uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4 text-[#C98A18]" />
          <span>Public Research Knowledge Discovery Portal</span>
        </div>
        <h1 className="text-2xl font-serif font-bold text-[#123B63]">
          Land Governance & Spatial Research Repository
        </h1>
        <p className="text-xs text-slate-600 max-w-3xl">
          Discover peer-reviewed academic publications, institution case studies, and policy research papers on digital land records, climate resilience, and cadastral GIS modeling.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search land governance research by title, author, keyword, or institution..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#1D5D91] focus:bg-white text-slate-800"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Topic Category</label>
            <select
              value={selectedTopic}
              onChange={e => setSelectedTopic(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md py-1.5 px-2 text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              {topics.map((t, idx) => (
                <option key={idx} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">District</label>
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md py-1.5 px-2 text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="All">All Districts</option>
              <option value="Raigad">Raigad</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Pune">Pune</option>
              <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar</option>
              <option value="Solapur">Solapur</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Publication Year</label>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md py-1.5 px-2 text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="All">All Years</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTopic('All');
                setSelectedDistrict('All');
                setSelectedYear('All');
              }}
              className="w-full py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md border border-slate-300 flex items-center justify-center space-x-1 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Showing {filteredPapers.length} of {PUBLIC_RESEARCH_PAPERS.length} published research records</span>
        <span>Public Domain Research Index</span>
      </div>

      {/* Research Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPapers.map(paper => (
          <PublicResearchCard key={paper.id} paper={paper} />
        ))}
      </div>
    </div>
  );
};
