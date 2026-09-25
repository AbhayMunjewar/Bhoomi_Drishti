import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Search, BookOpen, Database, MapPin, AlertCircle, Plus, ChevronRight, FileText } from 'lucide-react';
import { MOCK_RESEARCH_GAPS, ResearchGapItem } from '../../data/mockInnovation';
import { useAuthStore } from '../../stores/authStore';

export const ResearchGapsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [gaps, setGaps] = useState<ResearchGapItem[]>(MOCK_RESEARCH_GAPS);
  const [selectedGap, setSelectedGap] = useState<ResearchGapItem | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
            <Link to="/research" className="hover:underline">Research Portal</Link>
            <span>/</span>
            <span className="text-[#123B63] font-bold">Research Gaps</span>
          </div>
          <h1 className="text-2xl font-black text-[#123B63] font-serif mt-1">AI-Assisted Research Gap Identification</h1>
          <p className="text-xs text-slate-600">
            Systematic synthesis comparing indexed literature, datasets, and policy questions to identify under-researched geographic, dataset, and methodological gaps.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-4 py-2 rounded-lg font-bold text-xs shadow-xs transition-colors flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4 text-[#C98A18]" />
          <span>Identify New Research Gap</span>
        </button>
      </div>

      {/* AI DISCLAIMER BANNER */}
      <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl text-xs space-y-1">
        <div className="flex items-center space-x-2 font-bold text-[#123B63]">
          <Sparkles className="w-4 h-4 text-[#C98A18]" />
          <span>AI-Assisted Synthesis Notice</span>
        </div>
        <p className="leading-relaxed text-[11px]">
          AI tools assist researchers by indexing existing publications and highlighting sparse dataset coverage or unaddressed policy questions. AI does not independently assert scientifically validated facts; final academic validation is conducted by domain researchers.
        </p>
      </div>

      {/* GAPS LIST */}
      <div className="space-y-4">
        {gaps.map((gap) => (
          <div key={gap.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4 hover:border-[#1D5D91] transition-all">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded font-bold">
                    {gap.id}
                  </span>
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
                    Category: {gap.gapType}
                  </span>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{gap.districtOrState}</span>
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#123B63] mt-1">{gap.topic}</h3>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                Relevance Score: {gap.relevanceScore} / 100
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {gap.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Suggested AI Keywords</span>
                <div className="font-semibold text-[#123B63] mt-0.5">{gap.aiSuggestedKeywords.join(', ')}</div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Suggested Methodology</span>
                <div className="font-semibold text-slate-800 mt-0.5">{gap.suggestedMethodology}</div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-slate-500">
                AI Gap Identification Status: <strong>Validated for Research Proposals</strong>
              </span>
              <Link
                to="/innovation/grants"
                className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-2xs transition-colors flex items-center space-x-1"
              >
                <span>Propose Grant Proposal for this Gap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* SUBMIT GAP MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-300">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <h3 className="font-bold text-[#123B63]">Identify New Research Gap</h3>
              <button onClick={() => setIsSubmitModalOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Research gap submitted! AI agent indexing started to cross-reference existing literature and datasets.');
              setIsSubmitModalOpen(false);
            }} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Research Gap Topic</label>
                <input type="text" required placeholder="e.g. Assessment of Tribal Land Tenure Security in Vidarbha" className="w-full p-2 border border-slate-300 rounded" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Gap Category</label>
                <select className="w-full p-2 border border-slate-300 rounded">
                  <option value="Geographic Gap">Geographic Gap</option>
                  <option value="Dataset Gap">Dataset Gap</option>
                  <option value="Methodological Gap">Methodological Gap</option>
                  <option value="Policy Evidence Gap">Policy Evidence Gap</option>
                  <option value="Under-Researched Topic">Under-Researched Topic</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Description & Evidence Need</label>
                <textarea rows={3} required placeholder="Describe why this topic is under-researched and how evidence will support policy..." className="w-full p-2 border border-slate-300 rounded" />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsSubmitModalOpen(false)} className="px-3 py-1.5 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-[#123B63] text-white rounded font-bold">Submit Research Gap</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
