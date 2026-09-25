import React, { useState } from 'react';
import { Sliders, ShieldCheck, Lock, Globe, Key, Bell, Database, CheckCircle2, UserCheck } from 'lucide-react';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';

export const AdminSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'roles' | 'platform' | 'notifications' | 'security'>('roles');
  const [savedMsg, setSavedMsg] = useState<boolean>(false);

  const rolesMatrix = [
    {
      role: 'SYSTEM ADMINISTRATOR',
      description: 'Platform infrastructure, user access control, institution verification, approval workflows, GIS access.',
      permissions: ['Manage Users', 'Manage Institutions', 'Approve Submissions', 'Configure GIS Visibility', 'Audit Logs', 'System Settings']
    },
    {
      role: 'DATA & GIS OFFICER',
      description: 'Ingest spatial vector layers, validate metadata schemas, PostGIS topology checks, resolve data conflicts.',
      permissions: ['Upload Datasets', 'Validate GIS Geometry', 'Resolve Data Conflicts', 'Inspect Topo Errors']
    },
    {
      role: 'RESEARCHER',
      description: 'AI RAG semantic research search, publish peer-reviewed papers, link empirical datasets, personal workspace.',
      permissions: ['AI Research Search', 'Submit Research Papers', 'Attach Open Datasets', 'Private Workspace']
    },
    {
      role: 'POLICY & PLANNING OFFICER',
      description: 'District land risk analysis, multi-criteria candidate site search, policy simulator, scenario comparison.',
      permissions: ['District Risk Analysis', 'Run Policy Simulator', 'Scenario Comparison', 'Candidate Site Search']
    },
    {
      role: 'INSTITUTIONAL USER',
      description: 'University & research center management, team member roster, research project oversight.',
      permissions: ['Manage Institutional Team', 'Oversight Publications', 'Grant Applications']
    },
    {
      role: 'PUBLIC USER',
      description: 'Read-only access to approved public GIS maps, open data downloads, published research, statistics.',
      permissions: ['View Public GIS Map', 'Download Open Datasets', 'View Research Abstracts', 'Read Public Reports']
    }
  ];

  const handleSave = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 4000);
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#123B63] text-xs font-bold uppercase tracking-wider mb-1">
              <Sliders className="w-4 h-4 text-[#C98A18]" />
              <span>Platform Configuration & Security</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63]">
              Settings & Role Permission Matrix
            </h1>
            <p className="text-xs text-slate-600 max-w-3xl">
              Configure platform-wide settings, role-based access control (RBAC) permission matrices, data retention schedules, and notification gateway preferences.
            </p>
          </div>
          <DataSourceBadge status="PROTOTYPE_DERIVED" size="md" />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex border-b border-slate-200 text-xs font-bold space-x-6">
          <button
            onClick={() => setActiveTab('roles')}
            className={`pb-2 transition-colors border-b-2 ${
              activeTab === 'roles' ? 'border-[#1D5D91] text-[#1D5D91] font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Role & Permission Matrix
          </button>
          <button
            onClick={() => setActiveTab('platform')}
            className={`pb-2 transition-colors border-b-2 ${
              activeTab === 'platform' ? 'border-[#1D5D91] text-[#1D5D91] font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Platform & Data Retention
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`pb-2 transition-colors border-b-2 ${
              activeTab === 'notifications' ? 'border-[#1D5D91] text-[#1D5D91] font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Notification Gateway
          </button>
        </div>

        {savedMsg && (
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded text-xs text-emerald-900 flex items-center space-x-2 font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Platform settings saved and logged to audit trail.</span>
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#123B63]">Role-Based Access Control (RBAC) System Matrix</h3>
              <span className="text-[10px] text-slate-400">Strict Separation of Responsibilities</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {rolesMatrix.map((r, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 font-bold text-[#123B63]">
                    <span>{r.role}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-mono">
                      {r.permissions.length} Rules
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{r.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {r.permissions.map((perm, pIdx) => (
                      <span key={pIdx} className="px-2 py-0.5 bg-white text-slate-700 rounded border border-slate-200 text-[10px] font-medium">
                        ✓ {perm}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Platform Tab */}
        {activeTab === 'platform' && (
          <div className="space-y-4 text-xs max-w-xl">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Platform Mode</label>
              <select className="w-full bg-slate-50 border border-slate-300 rounded p-2 focus:outline-none focus:border-[#1D5D91]">
                <option>Production Operational Mode (SIH Hackathon Deployment)</option>
                <option>Maintenance Mode</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Audit Trail Retention</label>
              <select className="w-full bg-slate-50 border border-slate-300 rounded p-2 focus:outline-none focus:border-[#1D5D91]">
                <option>Immutable 7-Year Government Compliance Retention</option>
                <option>3-Year Retention</option>
              </select>
            </div>

            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#123B63] hover:bg-[#1D5D91] text-white font-bold text-xs rounded shadow-xs"
            >
              Save Platform Configuration
            </button>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-3 text-xs max-w-xl">
            <h4 className="font-bold text-[#123B63]">Admin Alert Preferences</h4>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[#1D5D91]" />
              <span>Email alert on new researcher account registrations</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[#1D5D91]" />
              <span>Alert on spatial parcel boundary discrepancy detection</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[#1D5D91]" />
              <span>Alert on external API connector status changes</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
