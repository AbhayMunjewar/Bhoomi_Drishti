import React from 'react';
import { EvidenceCardData } from '../../types/government';
import { AlertTriangle, CheckCircle, FileText, Database, ShieldAlert, ChevronRight } from 'lucide-react';

interface EvidenceCardProps {
  data: EvidenceCardData;
  onViewSources?: () => void;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({ data, onViewSources }) => {
  const getBadgeStyle = (level: string) => {
    switch (level) {
      case 'VERY HIGH':
        return 'bg-[#A33A32]/10 text-[#A33A32] border-[#A33A32]/30';
      case 'HIGH':
        return 'bg-[#A33A32]/10 text-[#A33A32] border-[#A33A32]/30';
      case 'MODERATE':
        return 'bg-[#A56A00]/10 text-[#A56A00] border-[#A56A00]/30';
      default:
        return 'bg-[#2E6B45]/10 text-[#2E6B45] border-[#2E6B45]/30';
    }
  };

  return (
    <div className="govt-card p-4 rounded-md border border-[#D9DEE5] shadow-2xs bg-white space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D5D91] bg-[#1D5D91]/10 px-2 py-0.5 rounded">
              AI Decision Support Finding
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              ID: {data.id}
            </span>
          </div>
          <h4 className="font-bold text-sm text-[#1F2933] leading-snug">
            {data.findingTitle}
          </h4>
        </div>

        {/* Risk Level Badge */}
        <div className="text-right flex-shrink-0">
          <span className={`govt-badge text-xs px-2.5 py-1 border ${getBadgeStyle(data.riskLevel)}`}>
            {data.riskLevel} RISK
          </span>
          <p className="text-[10px] font-semibold text-slate-500 mt-1">
            Confidence: <span className="font-bold text-[#123B63]">{data.confidencePct}%</span>
          </p>
        </div>
      </div>

      {/* Key Factors List */}
      <div className="bg-[#F5F7F9] p-3 rounded border border-slate-200/60 text-xs space-y-1.5">
        <p className="font-bold text-[#123B63] text-[11px] uppercase tracking-wide">Key Risk Factors Identified:</p>
        <ul className="space-y-1 text-[#5B6573]">
          {data.keyFactors.map((factor, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <span className="text-[#C98A18] font-bold text-sm leading-none">•</span>
              <span>{factor}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Data Sources & Period */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs border-t border-slate-100 pt-2">
        <div>
          <span className="text-[10px] text-slate-500 font-semibold block">Data Sources:</span>
          <p className="text-slate-700 font-medium truncate">{data.sources.join(', ')}</p>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 font-semibold block">Data Period:</span>
          <p className="text-slate-700 font-mono font-semibold">{data.dataPeriod}</p>
        </div>
      </div>

      {/* Action Footer & Disclaimer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
        <span className="text-[10px] text-slate-400 italic">
          * Illustrative / Demo Data Output
        </span>
        <button
          onClick={onViewSources}
          className="inline-flex items-center space-x-1 text-[#1D5D91] hover:text-[#123B63] font-bold text-xs hover:underline"
        >
          <span>View Research Evidence</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
