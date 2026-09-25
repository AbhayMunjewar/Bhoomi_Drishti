import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, CheckCircle2, MapPin, Clock, ArrowRight } from 'lucide-react';
import { MOCK_PILOT_PROJECTS, PilotProjectItem } from '../../data/mockInnovation';

export const AuthorityPilotApprovalsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
          <Link to="/authority/dashboard" className="hover:underline">Higher Authority</Link>
          <span>/</span>
          <span className="text-[#123B63] font-bold">Pilot Approvals</span>
        </div>
        <h1 className="text-2xl font-black text-[#123B63] font-serif mt-1">Innovation Pilot Authorizations</h1>
        <p className="text-xs text-slate-600">
          Review, approve, or request modifications for field innovation pilots proposed by research institutions and policy teams.
        </p>
      </div>

      <div className="space-y-4">
        {MOCK_PILOT_PROJECTS.map((p: PilotProjectItem) => (
          <div key={p.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded font-bold">
                  {p.id}
                </span>
                <h3 className="text-base font-bold text-[#123B63] mt-1">{p.innovationTitle}</h3>
                <p className="text-xs text-slate-500">Location: {p.location} ({p.district}) • Lead: {p.leadInstitution}</p>
              </div>

              <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-300">
                Status: {p.status}
              </span>
            </div>

            <p className="text-xs text-slate-600">{p.objective}</p>

            <div className="pt-2 flex justify-end space-x-2">
              <Link
                to="/innovation/pilots"
                className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-4 py-1.5 rounded text-xs font-bold transition-colors"
              >
                Inspect Pilot Metrics
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
