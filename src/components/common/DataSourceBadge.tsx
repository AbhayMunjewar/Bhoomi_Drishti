import React from 'react';

export type DataSourceStatus = 'OFFICIAL_SOURCE' | 'PROTOTYPE_DERIVED' | 'SYNTHETIC_PROTOTYPE';

interface DataSourceBadgeProps {
  status: DataSourceStatus;
  sourceName?: string;
  lastUpdated?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const DataSourceBadge: React.FC<DataSourceBadgeProps> = ({ status, sourceName, lastUpdated, size = 'sm' }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'OFFICIAL_SOURCE':
        return 'bg-[#2E6B45]/10 text-[#2E6B45] border-[#2E6B45]/30';
      case 'PROTOTYPE_DERIVED':
        return 'bg-[#1D5D91]/10 text-[#1D5D91] border-[#1D5D91]/30';
      case 'SYNTHETIC_PROTOTYPE':
      default:
        return 'bg-[#C98A18]/10 text-[#A56A00] border-[#C98A18]/30';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'OFFICIAL_SOURCE':
        return 'OFFICIAL SOURCE';
      case 'PROTOTYPE_DERIVED':
        return 'PROTOTYPE-DERIVED';
      case 'SYNTHETIC_PROTOTYPE':
      default:
        return 'SYNTHETIC PROTOTYPE DATA';
    }
  };

  return (
    <div className="inline-flex items-center space-x-2 text-[10px]">
      <span className={`px-2 py-0.5 rounded font-mono font-bold border ${getBadgeStyle()}`}>
        {getLabel()}
      </span>
      {sourceName && (
        <span className="text-slate-500 font-medium">
          Source: <strong className="text-slate-700">{sourceName}</strong>
        </span>
      )}
      {lastUpdated && (
        <span className="text-slate-400 font-mono hidden sm:inline">
          Updated: {lastUpdated}
        </span>
      )}
    </div>
  );
};
