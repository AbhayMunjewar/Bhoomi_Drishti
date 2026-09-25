import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, AlertCircle, FileText, Database, Layers, ArrowRight } from 'lucide-react';
import { MOCK_PS_CHECKLIST } from '../../data/mockInnovation';

export const PSChecklistPage: React.FC = () => {
  const items = MOCK_PS_CHECKLIST;
  const implementedCount = items.filter(i => i.status === 'Implemented').length;
  const prototypeCount = items.filter(i => i.status === 'Prototype').length;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
            <Link to="/innovation" className="hover:underline">Innovation Hub</Link>
            <span>/</span>
            <span className="text-[#123B63] font-bold">PS 26019 Compliance Matrix</span>
          </div>
          <h1 className="text-2xl font-black text-[#123B63] font-serif mt-1">SIH Problem Statement 26019 Feature Audit</h1>
          <p className="text-xs text-slate-600">
            Comprehensive verification matrix mapping all 33 required capabilities of the National Land Governance Digital Platform.
          </p>
        </div>

        <div className="bg-[#123B63] text-white p-3 rounded-lg text-xs font-mono space-y-1">
          <div>Total Requirements: <strong>33 / 33 Covered</strong></div>
          <div className="text-amber-300">Fully Implemented UI/Flows: <strong>{implementedCount}</strong></div>
          <div className="text-emerald-300">Prototype / Mock Integration: <strong>{prototypeCount}</strong></div>
        </div>
      </div>

      {/* CHECKLIST TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-[#123B63] flex justify-between items-center">
          <span>SIH 26019 Requirement Breakdown</span>
          <span className="text-[10px] text-slate-500 font-normal">Honest Architectural Status Specification</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Requirement Title</th>
                <th className="py-3 px-4">Platform Implementation Status</th>
                <th className="py-3 px-4">Route / Location</th>
                <th className="py-3 px-4">Architecture & Implementation Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-500">{item.id}</td>
                  <td className="py-2.5 px-4 font-bold text-[#123B63]">{item.requirement}</td>
                  <td className="py-2.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'Implemented' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      item.status === 'Prototype' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                      'bg-blue-100 text-blue-800 border border-blue-300'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-mono text-[11px] text-[#1D5D91]">
                    <Link to={item.route} className="hover:underline">{item.route}</Link>
                  </td>
                  <td className="py-2.5 px-4 text-[11px] text-slate-600 max-w-xs">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
