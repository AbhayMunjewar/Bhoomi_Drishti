import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Building, DollarSign, Calendar, FileText, CheckCircle2, ChevronRight, Filter } from 'lucide-react';
import { MOCK_RESEARCH_GRANTS, ResearchGrantItem } from '../../data/mockInnovation';
import { useAuthStore } from '../../stores/authStore';

export const ResearchGrantsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [grants] = useState<ResearchGrantItem[]>(MOCK_RESEARCH_GRANTS);
  const [selectedGrant, setSelectedGrant] = useState<ResearchGrantItem | null>(null);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
          <Link to="/innovation" className="hover:underline">Innovation Hub</Link>
          <span>/</span>
          <span className="text-[#123B63] font-bold">Research Grants</span>
        </div>
        <h1 className="text-2xl font-black text-[#123B63] font-serif mt-1">National Land Research Grants</h1>
        <p className="text-xs text-slate-600">
          Dedicated funding for academic researchers, policy labs, and institutional teams investigating critical land governance, tenure security, and climate adaptation topics.
        </p>
      </div>

      {/* RESEARCHER / INSTITUTION WORKFLOW STEPS */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-xs">
        <div className="p-2 bg-white rounded border border-slate-200">
          <div className="font-bold text-[#123B63]">1. Discovery</div>
          <div className="text-[10px] text-slate-500">Find Scheme</div>
        </div>
        <div className="p-2 bg-white rounded border border-slate-200">
          <div className="font-bold text-[#123B63]">2. Application</div>
          <div className="text-[10px] text-slate-500">Proposal & Budget</div>
        </div>
        <div className="p-2 bg-white rounded border border-slate-200">
          <div className="font-bold text-[#123B63]">3. Review</div>
          <div className="text-[10px] text-slate-500">Peer & Committee</div>
        </div>
        <div className="p-2 bg-white rounded border border-slate-200">
          <div className="font-bold text-[#123B63]">4. Selection</div>
          <div className="text-[10px] text-slate-500">Authority Approval</div>
        </div>
        <div className="p-2 bg-white rounded border border-slate-200">
          <div className="font-bold text-[#123B63]">5. Execution</div>
          <div className="text-[10px] text-slate-500">Pilot & Data</div>
        </div>
        <div className="p-2 bg-white rounded border border-slate-200">
          <div className="font-bold text-[#123B63]">6. Evidence</div>
          <div className="text-[10px] text-slate-500">Policy Output</div>
        </div>
      </div>

      {/* GRANT CARDS */}
      <div className="space-y-4">
        {grants.map((g) => (
          <div key={g.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3 hover:border-[#1D5D91] transition-all">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-bold">
                    {g.id}
                  </span>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    Area: {g.researchArea}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#123B63] mt-1">{g.title}</h3>
                <p className="text-xs text-slate-500">Funding Body: {g.fundingAgency}</p>
              </div>

              <div className="text-right">
                <span className="text-sm font-black text-[#2E6B45] block">{g.maxFundingAmount}</span>
                <span className="text-[10px] text-slate-500 font-semibold">Duration: {g.durationMonths} Months</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Eligibility</span>
                <span className="font-medium text-slate-700">{g.eligibility}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Application Deadline</span>
                <span className="font-bold text-amber-700">{g.applicationDeadline}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                Status: {g.status}
              </span>
              <button
                onClick={() => setSelectedGrant(g)}
                className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1"
              >
                <Award className="w-3.5 h-3.5 text-[#C98A18]" />
                <span>Apply for Grant</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* APPLICATION MODAL */}
      {selectedGrant && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-300">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <h3 className="font-bold text-[#123B63]">Grant Application — {selectedGrant.id}</h3>
              <button onClick={() => setSelectedGrant(null)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`Grant application submitted for ${selectedGrant.id}! Assigned tracking code GRT-2026-NAGP-09.`);
              setSelectedGrant(null);
            }} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Research Proposal Title</label>
                <input type="text" required placeholder="e.g. Quantitative Assessment of Tribal Land Rights & GIS Mapping" className="w-full p-2 border border-slate-300 rounded" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Principal Investigator (PI)</label>
                <input type="text" required defaultValue={user?.name || 'Dr. Ananya Roy'} className="w-full p-2 border border-slate-300 rounded" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Affiliated Institution</label>
                <input type="text" required defaultValue={user?.department || 'IIT Bombay'} className="w-full p-2 border border-slate-300 rounded" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Budget Breakdown & Expected Policy Deliverables</label>
                <textarea rows={3} required placeholder="Detail equipment, GIS data acquisition, fieldwork cost, and policy recommendations..." className="w-full p-2 border border-slate-300 rounded" />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setSelectedGrant(null)} className="px-3 py-1.5 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-[#123B63] text-white rounded font-bold">Submit Grant Proposal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
