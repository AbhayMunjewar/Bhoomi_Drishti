import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Trophy, Award, CheckCircle2, ChevronRight, UserCheck } from 'lucide-react';
import { MOCK_KNOWLEDGE_COMPETITIONS, KnowledgeCompetitionItem } from '../../data/mockInnovation';
import { useAuthStore } from '../../stores/authStore';

export const KnowledgeCompetitionsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [competitions] = useState<KnowledgeCompetitionItem[]>(MOCK_KNOWLEDGE_COMPETITIONS);
  const [activeModal, setActiveModal] = useState<KnowledgeCompetitionItem | null>(null);

  const juryPanel = [
    'Dr. K. S. Rajan (DoLR)',
    'Prof. R. V. Sharma (IIT Bombay)',
    'Shri A. N. Joshi (NRSC / ISRO)',
    'Dr. Sunita Patel (NITI Aayog)'
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
          <Link to="/innovation" className="hover:underline">Innovation Hub</Link>
          <span>/</span>
          <span className="text-[#123B63] font-bold">Knowledge Competitions</span>
        </div>
        <h1 className="text-2xl font-black text-[#123B63] font-serif mt-1">National Knowledge & Excellence Competitions</h1>
        <p className="text-xs text-slate-600">
          Celebrating outstanding research papers, GIS innovations, climate resilience solutions, and digital land governance ideas.
        </p>
      </div>

      {/* COMPETITIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {competitions.map((comp) => (
          <div key={comp.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4 hover:border-[#1D5D91] transition-all">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-mono uppercase">
                  Category: {comp.category}
                </span>
                <h3 className="text-lg font-bold text-[#123B63] mt-1">{comp.title}</h3>
                <p className="text-xs text-slate-500">Organized by: {comp.organizer}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-200 text-[#C98A18] flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Deadline</span>
                <span className="font-semibold text-slate-700">{comp.deadline}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Submissions</span>
                <span className="font-bold text-[#2E6B45]">{comp.submissionsCount} Received</span>
              </div>
            </div>

            {/* JURY PANEL */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-1 font-bold text-slate-700 text-[11px]">
                <UserCheck className="w-3.5 h-3.5 text-[#1D5D91]" />
                <span>Evaluation Jury Panel:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {juryPanel.map((j: string, idx: number) => (
                  <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px]">
                    {j}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Status: {comp.status}
              </span>
              <button
                onClick={() => setActiveModal(comp)}
                className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1"
              >
                <span>Submit Entry</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SUBMISSION MODAL */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-300">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <h3 className="font-bold text-[#123B63]">Knowledge Competition Entry</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`Entry submitted for ${activeModal.title}! Sent to the Jury Panel for review.`);
              setActiveModal(null);
            }} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Paper / Idea Title</label>
                <input type="text" required placeholder="e.g. Geo-temporal LULC Change Matrix for Climate Resilient Infrastructure" className="w-full p-2 border border-slate-300 rounded" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Lead Author / Innovator</label>
                <input type="text" required defaultValue={user?.name || 'Dr. Ananya Roy'} className="w-full p-2 border border-slate-300 rounded" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Institution</label>
                <input type="text" required defaultValue={user?.department || 'IIT Bombay'} className="w-full p-2 border border-slate-300 rounded" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Executive Summary / Abstract</label>
                <textarea rows={3} required placeholder="Summarize key findings, methodology, and policy impact..." className="w-full p-2 border border-slate-300 rounded" />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-3 py-1.5 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-[#123B63] text-white rounded font-bold">Submit Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
