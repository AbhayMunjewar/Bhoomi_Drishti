import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Lightbulb,
  Search,
  Filter,
  Plus,
  Calendar,
  Building,
  MapPin,
  Database,
  ArrowRight,
  CheckCircle2,
  FileText,
  Tag,
  Clock
} from 'lucide-react';
import { MOCK_INNOVATION_CHALLENGES, InnovationChallengeItem } from '../../data/mockInnovation';
import { useAuthStore } from '../../stores/authStore';

export const InnovationChallengesPage: React.FC = () => {
  const { user } = useAuthStore();
  const [challenges, setChallenges] = useState<InnovationChallengeItem[]>(MOCK_INNOVATION_CHALLENGES);
  const [selectedTheme, setSelectedTheme] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [activeChallengeForSubmit, setActiveChallengeForSubmit] = useState<InnovationChallengeItem | null>(null);

  const filtered = challenges.filter(c => {
    if (selectedTheme !== 'ALL' && c.theme !== selectedTheme) return false;
    if (selectedStatus !== 'ALL' && c.status !== selectedStatus) return false;
    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase()) && !c.problemStatement.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* TOP HEADER & BREADCRUMB */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
            <Link to="/innovation" className="hover:underline">Innovation Hub</Link>
            <span>/</span>
            <span className="text-[#123B63] font-bold">Innovation Challenges</span>
          </div>
          <h1 className="text-2xl font-black text-[#123B63] font-serif mt-1">National Land Innovation Challenges</h1>
          <p className="text-xs text-slate-600">
            Government-issued problem statements calling for empirical AI, GIS, and policy solutions from researchers and institutions.
          </p>
        </div>

        {/* Publish Challenge Button for Authorities */}
        {(user?.role === 'POLICY_PLANNING_OFFICER' || user?.role === 'HIGHER_AUTHORITY' || user?.role === 'ADMIN') && (
          <button
            onClick={() => alert('Publish Challenge Form: Allows Government Officers to issue new land governance challenges with specific parameters, dataset access, and funding.')}
            className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-4 py-2 rounded-lg font-bold text-xs shadow-xs transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4 text-[#C98A18]" />
            <span>Publish New Challenge</span>
          </button>
        )}
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search challenges by title, department, or problem statement..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-[#1D5D91] outline-none"
          />
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold text-slate-700">Theme:</span>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700"
            >
              <option value="ALL">All Themes</option>
              <option value="AI & Remote Sensing Governance">AI & Remote Sensing Governance</option>
              <option value="Climate Resilience & Coastal Land Governance">Climate Resilience & Coastal Land Governance</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-slate-700">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700"
            >
              <option value="ALL">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Under Evaluation">Under Evaluation</option>
              <option value="Pilot">Pilot Phase</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* CHALLENGES LIST */}
      <div className="space-y-4">
        {filtered.map((ch) => (
          <div
            key={ch.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-[#1D5D91] transition-all space-y-4"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-bold">
                    {ch.id}
                  </span>
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
                    {ch.theme}
                  </span>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{ch.geography}</span>
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#123B63]">{ch.title}</h3>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  ch.status === 'Open' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                  ch.status === 'Pilot' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                  'bg-slate-100 text-slate-700 border border-slate-300'
                }`}>
                  Status: {ch.status}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {ch.problemStatement}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase">Issuing Department</div>
                <div className="font-semibold text-[#123B63] mt-0.5">{ch.department}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase">Expected Outcome</div>
                <div className="font-semibold text-slate-800 mt-0.5">{ch.expectedOutcome}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase">Submission Deadline</div>
                <div className="font-semibold text-amber-700 mt-0.5 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{ch.submissionDeadline}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                <span className="font-bold text-slate-700">Available Datasets:</span>
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded font-mono text-[10px] text-[#1D5D91]">
                  {ch.availableData}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setActiveChallengeForSubmit(ch);
                    setIsSubmitModalOpen(true);
                  }}
                  className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-2xs transition-colors flex items-center space-x-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C98A18]" />
                  <span>Submit Solution Proposal</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PROPOSAL SUBMISSION MODAL */}
      {isSubmitModalOpen && activeChallengeForSubmit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-300">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  Solution Proposal Submission
                </span>
                <h3 className="text-base font-bold text-[#123B63] mt-1">{activeChallengeForSubmit.title}</h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`Proposal submitted successfully for challenge ${activeChallengeForSubmit.id}! Submitted proposal has been queued for Higher Authority review.`);
              setIsSubmitModalOpen(false);
            }} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Proposal / Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Automated Land Encroachment Detection using Sentinel-2 LULC Embeddings"
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#1D5D91] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Lead Researcher / Officer</label>
                  <input
                    type="text"
                    required
                    defaultValue={user?.name || 'Dr. Ananya Roy'}
                    className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#1D5D91] outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Institution / Organization</label>
                  <input
                    type="text"
                    required
                    defaultValue={user?.department || 'IIT Bombay - Centre for Land Governance'}
                    className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#1D5D91] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Proposed Methodology & Architecture</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your technical approach, AI model architecture, PostGIS spatial queries, and dataset integration..."
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#1D5D91] outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Pilot Geography & Timeline</label>
                <input
                  type="text"
                  required
                  defaultValue="Nagpur District, Maharashtra (6 Months Pilot)"
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#1D5D91] outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#123B63] hover:bg-[#1D5D91] text-white rounded-lg font-bold shadow-2xs"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
