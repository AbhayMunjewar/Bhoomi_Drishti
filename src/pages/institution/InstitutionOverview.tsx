import React from 'react';
import { MOCK_INSTITUTION_PROFILE, MOCK_RESEARCHERS } from '../../data/mockInstitution';
import { MOCK_RESEARCH_PROJECTS } from '../../data/mockResearch';
import { Building2, Users, FolderKanban, BookOpen, Database, Plus } from 'lucide-react';

export const InstitutionOverview: React.FC = () => {
  return (
    <div className="space-y-6 select-none text-xs">
      
      {/* Institution Header matching user reference image */}
      <div className="bg-white p-4 rounded-md border border-[#D9DEE5] shadow-2xs flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-[#123B63] text-white flex items-center justify-center font-bold text-sm">
            VJTI
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D5D91] bg-[#1D5D91]/10 px-2 py-0.5 rounded">
              Institution Portal &bull; Organization Admin
            </span>
            <h2 className="text-xl font-bold text-[#123B63] font-serif mt-1">
              {MOCK_INSTITUTION_PROFILE.name}
            </h2>
            <p className="text-xs text-[#5B6573]">
              {MOCK_INSTITUTION_PROFILE.city}, {MOCK_INSTITUTION_PROFILE.state} &bull; Code: {MOCK_INSTITUTION_PROFILE.code}
            </p>
          </div>
        </div>

        <button className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-3.5 py-1.5 rounded font-bold text-xs shadow-2xs flex items-center space-x-1 transition-colors">
          <Plus className="w-4 h-4 text-[#C98A18]" />
          <span>Add New Researcher</span>
        </button>
      </div>

      {/* KPI Counters matching user reference image */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-[#D9DEE5] shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Researchers</span>
          <p className="text-2xl font-black text-[#123B63] mt-1">{MOCK_INSTITUTION_PROFILE.researchersCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#D9DEE5] shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Active Projects</span>
          <p className="text-2xl font-black text-[#C98A18] mt-1">{MOCK_INSTITUTION_PROFILE.projectsCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#D9DEE5] shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Publications</span>
          <p className="text-2xl font-black text-[#1D5D91] mt-1">{MOCK_INSTITUTION_PROFILE.publicationsCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#D9DEE5] shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Datasets Published</span>
          <p className="text-2xl font-black text-[#2E6B45] mt-1">{MOCK_INSTITUTION_PROFILE.datasetsCount}</p>
        </div>
      </div>

      {/* Recent Projects Table matching user reference image */}
      <div className="bg-white p-5 rounded-lg border border-[#D9DEE5] shadow-xs space-y-3">
        <h3 className="font-bold text-sm text-[#123B63]">Recent Research Projects</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F5F7F9] text-[#123B63] font-bold border-b border-[#D9DEE5]">
                <th className="p-2.5">Project Title</th>
                <th className="p-2.5">Principal Investigator</th>
                <th className="p-2.5">Target District</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5 text-right">Researchers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_RESEARCH_PROJECTS.map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-[#123B63]">{proj.title}</td>
                  <td className="p-2.5 text-slate-700">{proj.principalInvestigator}</td>
                  <td className="p-2.5 text-slate-600 font-semibold">{proj.district}</td>
                  <td className="p-2.5">
                    <span className="govt-badge bg-[#2E6B45]/10 text-[#2E6B45] border border-[#2E6B45]/30">
                      {proj.status}
                    </span>
                  </td>
                  <td className="p-2.5 text-right font-bold text-slate-800">{proj.researchersCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
