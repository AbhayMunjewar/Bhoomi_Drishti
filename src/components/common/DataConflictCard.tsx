import React, { useState } from 'react';
import { DataConflictItem } from '../../types/government';
import { AlertCircle, CheckCircle2, Flag, FileSearch, ArrowRightLeft } from 'lucide-react';

interface DataConflictCardProps {
  item: DataConflictItem;
}

export const DataConflictCard: React.FC<DataConflictCardProps> = ({ item }) => {
  const [flagged, setFlagged] = useState(false);

  return (
    <div className="govt-card p-4 rounded-md border border-[#D9DEE5] bg-white shadow-2xs space-y-3">
      {/* Title & Status */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded bg-[#A33A32]/10 text-[#A33A32] flex items-center justify-center flex-shrink-0">
            <ArrowRightLeft className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-[#1F2933]">{item.title}</h4>
            <p className="text-[10px] text-slate-500 font-mono">
              {item.district} District &bull; Taluka: {item.taluka} &bull; Survey No: {item.surveyNo}
            </p>
          </div>
        </div>

        <span className={`govt-badge text-[10px] ${
          item.status === 'Needs Verification'
            ? 'bg-[#A56A00]/10 text-[#A56A00] border border-[#A56A00]/30'
            : 'bg-[#1D5D91]/10 text-[#1D5D91] border border-[#1D5D91]/30'
        }`}>
          {item.status}
        </span>
      </div>

      {/* Discrepancy Box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-[#F5F7F9] p-2.5 rounded border border-slate-200">
        <div className="border-r border-slate-200/80 pr-2 space-y-0.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Source A: {item.sourceA.name}</span>
          <p className="font-semibold text-[#123B63]">{item.sourceA.value}</p>
        </div>
        <div className="pl-1 space-y-0.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Source B: {item.sourceB.name}</span>
          <p className="font-semibold text-[#123B63]">{item.sourceB.value}</p>
        </div>
      </div>

      {/* Variance summary */}
      <div className="flex items-center justify-between text-xs bg-amber-50 text-amber-900 px-3 py-1.5 rounded border border-amber-200">
        <span className="font-bold text-[11px]">Discrepancy Variance:</span>
        <span className="font-mono font-bold text-[#A33A32]">{item.discrepancy}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <span className="text-[10px] text-slate-400">Flagged: {item.flaggedDate}</span>
        
        <div className="flex space-x-2">
          <button className="px-2.5 py-1 text-xs font-semibold text-[#1D5D91] hover:bg-blue-50 rounded border border-[#1D5D91] flex items-center space-x-1">
            <FileSearch className="w-3 h-3" />
            <span>View Vector Sources</span>
          </button>
          
          <button
            onClick={() => setFlagged(!flagged)}
            className={`px-2.5 py-1 text-xs font-semibold rounded flex items-center space-x-1 border transition-colors ${
              flagged
                ? 'bg-[#2E6B45] text-white border-[#2E6B45]'
                : 'bg-[#A33A32] text-white hover:bg-[#A33A32]/90 border-[#A33A32]'
            }`}
          >
            <Flag className="w-3 h-3" />
            <span>{flagged ? 'Flagged for Review' : 'Flag Discrepancy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
