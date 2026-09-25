import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  ArrowLeft,
  Calendar,
  Building2,
  MapPin,
  Download,
  CheckCircle2,
  AlertCircle,
  BarChart2
} from 'lucide-react';
import { PUBLIC_REPORTS } from '../../data/mockPublic';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const PublicReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const report = PUBLIC_REPORTS.find(r => r.id === id);

  if (!report) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-[#123B63]">Report Not Found</h2>
        <p className="text-sm text-slate-600">The requested public report identifier could not be found.</p>
        <Link
          to="/public/reports"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-[#1D5D91] text-white rounded-md font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Public Reports</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 select-none">
      <button
        onClick={() => navigate('/public/reports')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1D5D91] hover:text-[#123B63] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Public Reports Catalog</span>
      </button>

      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 text-xs font-bold uppercase rounded bg-purple-50 text-purple-800 border border-purple-200">
            {report.reportType}
          </span>
          <DataSourceBadge status={report.dataStatus} size="md" />
        </div>

        <h1 className="text-2xl font-serif font-bold text-[#123B63] leading-tight">
          {report.title}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Publishing Authority</span>
            <span className="font-bold text-slate-900">{report.organization}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Publication Date</span>
            <span className="font-bold text-slate-900">{report.publicationDate}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Geographic Coverage</span>
            <span className="font-bold text-slate-900">{report.coverage}</span>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Executive Summary */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-[#123B63] border-b border-slate-100 pb-2">Executive Summary</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{report.summary}</p>
          </div>

          {/* Purpose & Methodology */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-[#123B63] mb-1">Purpose & Objectives</h4>
              <p className="text-slate-700 bg-slate-50 p-3 rounded border border-slate-200">{report.purpose}</p>
            </div>

            <div>
              <h4 className="font-bold text-[#123B63] mb-1">Methodology & Analytical Approach</h4>
              <p className="text-slate-700 bg-slate-50 p-3 rounded border border-slate-200">{report.methodology}</p>
            </div>
          </div>

          {/* Key Findings */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-[#123B63] border-b border-slate-100 pb-2">Key Audit & Policy Findings</h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {report.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Data Sources */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#123B63]">Data Sources Consulted</h3>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {report.dataSources.map((source, idx) => (
                <li key={idx} className="p-2 bg-slate-50 rounded border border-slate-100 font-medium text-[11px]">
                  {source}
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2 text-xs">
            <h3 className="font-bold text-[#123B63]">Report Scope & Limitations</h3>
            <p className="text-slate-600 bg-amber-50/50 p-3 rounded border border-amber-200">{report.limitations}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
