import React, { useState } from 'react';
import { FolderKanban, Search, Filter, MapPin, Calendar, Building2 } from 'lucide-react';
import { PUBLIC_PROJECTS } from '../../data/mockPublic';
import { PublicProjectCard } from '../../components/public/PublicProjectCard';

export const PublicProjectsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredProjects = PUBLIC_PROJECTS.filter(project => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center space-x-2 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-1">
          <FolderKanban className="w-4 h-4 text-[#C98A18]" />
          <span>Approved Public Projects & Initiatives</span>
        </div>
        <h1 className="text-2xl font-serif font-bold text-[#123B63]">
          National Land Governance Projects & Pilot Initiatives
        </h1>
        <p className="text-xs text-slate-600 max-w-3xl">
          Explore approved public sector projects, digital cadastral resurvey initiatives, watershed resilience pilots, and spatial research deployments across Maharashtra. Confidential inter-departmental budget notes are excluded.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, department, or district..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#1D5D91] text-slate-800"
          />
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-slate-700">Filter Status:</span>
            {['All', 'Active', 'Pilot Phase', 'Completed'].map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1 rounded-full font-semibold transition-colors ${
                  selectedStatus === status
                    ? 'bg-[#1D5D91] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <span className="text-slate-400 font-medium">Showing {filteredProjects.length} public initiatives</span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map(proj => (
          <PublicProjectCard key={proj.id} project={proj} />
        ))}
      </div>
    </div>
  );
};
