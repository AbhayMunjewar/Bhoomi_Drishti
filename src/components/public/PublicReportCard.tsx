import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, Building2, MapPin, ArrowRight } from 'lucide-react';
import { PublicReport } from '../../data/mockPublic';
import { DataSourceBadge } from '../common/DataSourceBadge';

interface PublicReportCardProps {
  report: PublicReport;
}

export const PublicReportCard: React.FC<PublicReportCardProps> = ({ report }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
            {report.reportType}
          </span>
          <DataSourceBadge status={report.dataStatus} size="sm" />
        </div>

        <h3 className="text-base font-bold text-[#123B63] hover:text-[#1D5D91] transition-colors line-clamp-2 mb-2">
          <Link to={`/public/reports/${report.id}`}>{report.title}</Link>
        </h3>

        <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {report.summary}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="flex items-center space-x-1 font-medium text-slate-700 truncate max-w-[200px]">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{report.organization}</span>
          </span>
          <span className="flex items-center space-x-1 text-slate-500 shrink-0">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{report.publicationDate}</span>
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="flex items-center space-x-1 text-[11px] text-slate-500">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>{report.coverage}</span>
          </span>
          <Link
            to={`/public/reports/${report.id}`}
            className="inline-flex items-center space-x-1 text-xs font-bold text-[#1D5D91] hover:text-[#123B63]"
          >
            <span>View Full Report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
