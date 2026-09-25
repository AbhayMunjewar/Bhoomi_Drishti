import React, { useState } from 'react';
import { reportService, ReportPayload } from '../../services/reportService';
import { FileText, Download, Printer, CheckCircle, X, Loader2 } from 'lucide-react';

interface ReportGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  district?: string;
  state?: string;
}

export const ReportGeneratorModal: React.FC<ReportGeneratorModalProps> = ({
  isOpen,
  onClose,
  district = 'Nagpur',
  state = 'Maharashtra'
}) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ReportPayload | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    const data = await reportService.generateReport(district, state);
    setReport(data);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg border border-[#D9DEE5] shadow-xl max-w-2xl w-full overflow-hidden text-xs">
        
        {/* Modal Header */}
        <div className="bg-[#123B63] text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#C98A18]" />
            <h3 className="font-bold text-sm">BhoomiDristi Automated Evidence Report Generator</h3>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {!report && !loading && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#123B63]/10 text-[#123B63] flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-[#1D5D91]" />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#123B63]">Generate Comprehensive Land Governance Report</h4>
                <p className="text-slate-600 text-xs mt-1">
                  Target District: <span className="font-bold text-[#1D5D91]">{district}, {state}</span>
                </p>
                <p className="text-slate-500 text-[11px] mt-2 max-w-md mx-auto">
                  Aggregates IMD rainfall metrics, ISRO Bhuvan satellite vectors, peer-reviewed research findings, and policy simulation risk indices into an institutional report.
                </p>
              </div>

              <button
                onClick={handleGenerate}
                className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-6 py-2.5 rounded-md font-bold text-xs shadow-md transition-colors inline-flex items-center space-x-2"
              >
                <FileText className="w-4 h-4 text-[#C98A18]" />
                <span>Generate Official Report Preview</span>
              </button>
            </div>
          )}

          {loading && (
            <div className="text-center py-12 space-y-3">
              <Loader2 className="w-8 h-8 text-[#1D5D91] animate-spin mx-auto" />
              <p className="font-bold text-[#123B63]">Synthesizing GIS Layers & Peer-Reviewed Evidence...</p>
              <p className="text-slate-500 text-[11px]">Compiling IMD Operational Metrics & PostGIS Vectors</p>
            </div>
          )}

          {report && (
            <div className="space-y-4 border border-slate-200 rounded p-4 bg-[#F5F7F9]">
              {/* Document Header */}
              <div className="border-b border-slate-300 pb-3 flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-[#C98A18] uppercase tracking-wider">Official Decision Support Summary</span>
                  <h4 className="font-bold text-sm text-[#123B63]">
                    Land Governance & Climate Risk Assessment Report
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono">
                    District: {report.district} &bull; Generated: {report.generatedDate}
                  </p>
                </div>
                <span className="govt-badge bg-[#A33A32]/10 text-[#A33A32] border border-[#A33A32]/30 text-xs px-2.5 py-1">
                  RISK: {report.riskCategory} ({report.riskScore}%)
                </span>
              </div>

              {/* Summary */}
              <div>
                <span className="font-bold text-slate-700 block text-[11px] mb-1">Executive Summary:</span>
                <p className="text-slate-600 leading-relaxed bg-white p-3 rounded border border-slate-200">
                  {report.summary}
                </p>
              </div>

              {/* Statutory Recommendations */}
              <div className="space-y-1.5">
                <span className="font-bold text-[#123B63] block text-[11px]">Statutory Policy Recommendations:</span>
                <ul className="space-y-1.5">
                  {report.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-slate-700 bg-white p-2 rounded border border-slate-200/80">
                      <CheckCircle className="w-4 h-4 text-[#2E6B45] flex-shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-[10px] text-slate-400 italic pt-2 border-t border-slate-200">
                * Note: Generated as an illustrative decision support document for SIH 2026 Prototype.
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {report && (
          <div className="bg-slate-100 p-4 border-t border-[#D9DEE5] flex justify-between items-center">
            <button onClick={onClose} className="px-3 py-1.5 text-slate-600 hover:text-slate-800 font-semibold">
              Close Preview
            </button>
            <div className="flex space-x-2">
              <button
                onClick={() => alert('Printing Official Report PDF...')}
                className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded font-semibold inline-flex items-center space-x-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print PDF</span>
              </button>
              <button
                onClick={() => alert('Exporting Report Document...')}
                className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-4 py-1.5 rounded font-bold inline-flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5 text-[#C98A18]" />
                <span>Download Executive Brief</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
