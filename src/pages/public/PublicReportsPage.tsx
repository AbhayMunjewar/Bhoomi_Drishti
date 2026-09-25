import React, { useState } from 'react';
import { FileText, Search, Filter, Calendar, Building2, MapPin } from 'lucide-react';
import { PUBLIC_REPORTS } from '../../data/mockPublic';
import { PublicReportCard } from '../../components/public/PublicReportCard';

export const PublicReportsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');

  const reportTypes = [
    'All',
    'Land Governance',
    'Climate',
    'Land Use',
    'Infrastructure',
    'Research',
    'Policy Analysis',
    'Project Outcomes'
  ];

  const filteredReports = PUBLIC_REPORTS.filter(report => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.organization.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'All' || report.reportType === selectedType;
    const matchesYear = selectedYear === 'All' || report.year.toString() === selectedYear;

    return matchesSearch && matchesType && matchesYear;
  });

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center space-x-2 text-purple-700 text-xs font-bold uppercase tracking-wider mb-1">
          <FileText className="w-4 h-4 text-[#C98A18]" />
          <span>Approved Public Government & Platform Reports</span>
        </div>
        <h1 className="text-2xl font-serif font-bold text-[#123B63]">
          Public Reports & Governance Audits
        </h1>
        <p className="text-xs text-slate-600 max-w-3xl">
          Access published state land governance reports, annual digital transformation reviews, and regional climate vulnerability impact assessments. Confidential internal policy decision files are excluded.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search reports by title, organization, or keywords..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#1D5D91] text-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Report Category</label>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md py-1.5 px-2 text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              {reportTypes.map((type, idx) => (
                <option key={idx} value={type}>{type}</option>
              ))}
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
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('All');
                setSelectedYear('All');
              }}
              className="w-full py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md border border-slate-300 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReports.map(report => (
          <PublicReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
};
