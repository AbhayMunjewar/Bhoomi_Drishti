import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  ArrowLeft,
  Calendar,
  Building2,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Database,
  BookOpen
} from 'lucide-react';
import { PUBLIC_PROJECTS, PUBLIC_OPEN_DATASETS, PUBLIC_RESEARCH_PAPERS } from '../../data/mockPublic';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';
import { PublicGISMap } from '../../components/maps/PublicGISMap';

export const PublicProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = PUBLIC_PROJECTS.find(p => p.id === id);

  if (!project) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-[#123B63]">Project Not Found</h2>
        <p className="text-sm text-slate-600">The requested public project identifier could not be found.</p>
        <Link
          to="/public/projects"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-[#1D5D91] text-white rounded-md font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects & Initiatives</span>
        </Link>
      </div>
    );
  }

  // Find linked datasets & research
  const linkedDatasets = PUBLIC_OPEN_DATASETS.filter(d => project.linkedDatasets.includes(d.id));
  const linkedResearch = PUBLIC_RESEARCH_PAPERS.filter(r => project.linkedResearch.includes(r.id));

  return (
    <div className="space-y-6 select-none">
      <button
        onClick={() => navigate('/public/projects')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1D5D91] hover:text-[#123B63] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Projects Catalogue</span>
      </button>

      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 text-xs font-bold uppercase rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
            Status: {project.status}
          </span>
          <DataSourceBadge status={project.dataStatus} size="md" />
        </div>

        <h1 className="text-2xl font-serif font-bold text-[#123B63] leading-tight">
          {project.name}
        </h1>

        <p className="text-sm text-slate-700 leading-relaxed">{project.description}</p>

        {/* Progress bar */}
        <div className="space-y-1 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="flex justify-between text-xs font-bold text-[#123B63]">
            <span>Implementation Progress</span>
            <span>{project.progressPercentage}% Completed</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-[#1D5D91] h-full rounded-full transition-all duration-500"
              style={{ width: `${project.progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Nodal Authority</span>
            <span className="font-bold text-slate-900">{project.department}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Timeline</span>
            <span className="font-bold text-slate-900">{project.startDate} to {project.targetCompletion || 'Ongoing'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
            <span className="font-bold text-slate-900">{project.location}</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Objectives */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-[#123B63] border-b border-slate-100 pb-2">Key Objectives</h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {project.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1D5D91] shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Outcomes Achieved */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-[#123B63] border-b border-slate-100 pb-2">Outcomes & Milestones Achieved</h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {project.outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Linked Datasets & Research */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <h3 className="text-base font-bold text-[#123B63] border-b border-slate-100 pb-2">Linked Datasets & Research</h3>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-700 flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-[#2E6B45]" />
                <span>Associated Public Datasets</span>
              </h4>
              {linkedDatasets.length > 0 ? (
                linkedDatasets.map(ds => (
                  <Link
                    key={ds.id}
                    to={`/public/open-data/${ds.id}`}
                    className="block p-3 bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 font-bold text-[#1D5D91]"
                  >
                    {ds.title} ({ds.format})
                  </Link>
                ))
              ) : (
                <p className="text-slate-500 italic">No linked datasets directly attached.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Location Map */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#123B63] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#C98A18]" />
              <span>Project Implementation Location</span>
            </h3>
            <PublicGISMap height="280px" initialDistrict={project.district} />
          </div>
        </div>
      </div>
    </div>
  );
};
