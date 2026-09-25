import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, MapPin, ExternalLink, ArrowRight, UserCheck } from 'lucide-react';
import { PublicResearchPaper } from '../../data/mockPublic';
import { DataSourceBadge } from '../common/DataSourceBadge';

interface PublicResearchCardProps {
  paper: PublicResearchPaper;
}

export const PublicResearchCard: React.FC<PublicResearchCardProps> = ({ paper }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex flex-wrap gap-1">
            {paper.topics.slice(0, 2).map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] font-semibold rounded bg-amber-50 text-amber-800 border border-amber-200"
              >
                {t}
              </span>
            ))}
          </div>
          <DataSourceBadge status={paper.dataStatus} size="sm" />
        </div>

        <h3 className="text-base font-bold text-[#123B63] hover:text-[#1D5D91] transition-colors line-clamp-2 mb-2">
          <Link to={`/public/research/${paper.id}`}>{paper.title}</Link>
        </h3>

        <p className="text-xs text-slate-500 mb-2 flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-medium text-slate-700 truncate">{paper.authors.join(', ')}</span>
        </p>

        <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {paper.abstract}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="truncate max-w-[200px] text-slate-600 font-medium">{paper.institution}</span>
          <span className="flex items-center space-x-1 text-slate-500 shrink-0">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{paper.year}</span>
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="flex items-center space-x-1 text-[11px] text-slate-500">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>{paper.studyArea.state} ({paper.studyArea.districts.join(', ')})</span>
          </span>
          <Link
            to={`/public/research/${paper.id}`}
            className="inline-flex items-center space-x-1 text-xs font-bold text-[#1D5D91] hover:text-[#123B63]"
          >
            <span>Read Abstract</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
