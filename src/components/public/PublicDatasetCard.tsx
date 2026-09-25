import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Calendar, HardDrive, FileCode, ArrowRight, Download } from 'lucide-react';
import { PublicDataset } from '../../data/mockPublic';
import { DataSourceBadge } from '../common/DataSourceBadge';

interface PublicDatasetCardProps {
  dataset: PublicDataset;
}

export const PublicDatasetCard: React.FC<PublicDatasetCardProps> = ({ dataset }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[11px] font-bold uppercase rounded bg-slate-100 text-[#123B63] border border-slate-200">
              {dataset.category}
            </span>
            <span className="px-2 py-0.5 text-[11px] font-semibold rounded bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
              <FileCode className="w-3 h-3" />
              {dataset.format}
            </span>
          </div>
          <DataSourceBadge status={dataset.dataStatus} size="sm" />
        </div>

        <h3 className="text-base font-bold text-[#123B63] hover:text-[#1D5D91] transition-colors line-clamp-2 mb-2">
          <Link to={`/public/open-data/${dataset.id}`}>{dataset.title}</Link>
        </h3>

        <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {dataset.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <span className="font-semibold text-slate-700 truncate max-w-[200px]">
            Pub: {dataset.publisher}
          </span>
          <div className="flex items-center space-x-3 text-slate-500">
            <span className="flex items-center space-x-1">
              <HardDrive className="w-3.5 h-3.5 text-slate-400" />
              <span>{dataset.fileSize}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{dataset.lastUpdated}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-slate-400 truncate max-w-[160px]" title={dataset.license}>
            License: {dataset.license}
          </span>
          <div className="flex items-center space-x-2">
            <Link
              to={`/public/open-data/${dataset.id}`}
              className="inline-flex items-center space-x-1 text-xs font-bold text-[#1D5D91] hover:text-[#123B63]"
            >
              <span>View & Preview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
