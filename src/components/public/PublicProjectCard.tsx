import React from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, MapPin, Calendar, Building2, ArrowRight } from 'lucide-react';
import { PublicProject } from '../../data/mockPublic';
import { DataSourceBadge } from '../common/DataSourceBadge';

interface PublicProjectCardProps {
  project: PublicProject;
}

export const PublicProjectCard: React.FC<PublicProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <span
            className={`px-2.5 py-0.5 text-[11px] font-bold uppercase rounded border ${
              project.status === 'Active'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : project.status === 'Pilot Phase'
                ? 'bg-sky-50 text-sky-800 border-sky-200'
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {project.status}
          </span>
          <DataSourceBadge status={project.dataStatus} size="sm" />
        </div>

        <h3 className="text-base font-bold text-[#123B63] hover:text-[#1D5D91] transition-colors line-clamp-2 mb-2">
          <Link to={`/public/projects/${project.id}`}>{project.name}</Link>
        </h3>

        <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Progress Bar */}
        <div className="mb-4 space-y-1">
          <div className="flex justify-between text-[11px] font-semibold text-slate-600">
            <span>Project Implementation Progress</span>
            <span>{project.progressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
            <div
              className="bg-[#1D5D91] h-full rounded-full transition-all duration-500"
              style={{ width: `${project.progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="flex items-center space-x-1 font-medium text-slate-700 truncate max-w-[220px]">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{project.department}</span>
          </span>
          <span className="flex items-center space-x-1 text-slate-500 shrink-0">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Started {project.startDate}</span>
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="flex items-center space-x-1 text-[11px] text-slate-500">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>{project.location}</span>
          </span>
          <Link
            to={`/public/projects/${project.id}`}
            className="inline-flex items-center space-x-1 text-xs font-bold text-[#1D5D91] hover:text-[#123B63]"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
