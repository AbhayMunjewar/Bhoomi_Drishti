import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Calendar, Users, Award, CheckCircle2, ChevronRight, Trophy, Code, MapPin } from 'lucide-react';
import { MOCK_HACKATHONS, HackathonItem } from '../../data/mockInnovation';
import { useAuthStore } from '../../stores/authStore';

export const HackathonsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [hackathons] = useState<HackathonItem[]>(MOCK_HACKATHONS);
  const [activeModal, setActiveModal] = useState<HackathonItem | null>(null);

  const problemTracks = [
    'AI-Based Land Encroachment Vector Detection',
    'High-Tide Mangrove Buffer Boundary Verification',
    'PostGIS Parcel Discrepancy Reconciliation',
    'Climate Risk & Drought Land Adaptation Modeling'
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
          <Link to="/innovation" className="hover:underline">Innovation Hub</Link>
          <span>/</span>
          <span className="text-[#123B63] font-bold">Hackathons</span>
        </div>
        <h1 className="text-2xl font-black text-[#123B63] font-serif mt-1">National Land Governance AI Hackathons</h1>
        <p className="text-xs text-slate-600">
          Targeted hackathons connecting developers, geospatial experts, and researchers to build tangible prototypes for land administration challenges.
        </p>
      </div>

      {/* HACKATHON CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hackathons.map((h) => (
          <div key={h.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4 hover:border-[#1D5D91] transition-all">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-mono uppercase">
                  {h.status}
                </span>
                <h3 className="text-lg font-bold text-[#123B63] mt-1">{h.title}</h3>
                <p className="text-xs text-slate-500">{h.organizer}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-200 text-[#C98A18] flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {h.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Event Dates</span>
                <span className="font-semibold text-slate-700">{h.dates}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Prize Pool</span>
                <span className="font-bold text-[#2E6B45]">{h.prizePool}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Problem Statements</span>
                <span className="font-semibold text-slate-700">{h.problemStatementsCount} Tracks</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Registered Teams</span>
                <span className="font-semibold text-[#123B63]">{h.teamsRegistered} Teams</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-700">Problem Tracks:</div>
              <div className="flex flex-wrap gap-1.5">
                {problemTracks.map((ps: string, idx: number) => (
                  <span key={idx} className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-medium">
                    {ps}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-semibold">Eligibility: {h.eligibility}</span>
              <button
                onClick={() => setActiveModal(h)}
                className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1"
              >
                <span>Register Team</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* REGISTRATION MODAL */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-300">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <h3 className="font-bold text-[#123B63]">{activeModal.title} — Registration</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`Successfully registered team for ${activeModal.title}! Confirmation sent to team lead email.`);
              setActiveModal(null);
            }} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Team Name</label>
                <input type="text" required placeholder="e.g. GeoAI Innovators" className="w-full p-2 border border-slate-300 rounded" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Team Lead Name</label>
                <input type="text" required defaultValue={user?.name || 'Dr. Ananya Roy'} className="w-full p-2 border border-slate-300 rounded" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Track</label>
                <select className="w-full p-2 border border-slate-300 rounded">
                  {problemTracks.map((ps: string, idx: number) => (
                    <option key={idx} value={ps}>{ps}</option>
                  ))}
                </select>
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-3 py-1.5 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-[#123B63] text-white rounded font-bold">Confirm Registration</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
