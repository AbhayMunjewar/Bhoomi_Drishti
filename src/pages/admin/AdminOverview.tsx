import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Users,
  Building,
  CheckCircle2,
  Database,
  MapPin,
  AlertTriangle,
  Activity,
  ArrowRight,
  TrendingUp,
  FileText,
  BookOpen,
  Search,
  Sliders,
  Globe2,
  RefreshCw
} from 'lucide-react';
import {
  MOCK_ADMIN_USERS,
  MOCK_ADMIN_INSTITUTIONS,
  MOCK_ADMIN_APPROVALS,
  MOCK_ADMIN_DATASETS,
  MOCK_ADMIN_GIS_LAYERS,
  MOCK_ADMIN_DATA_CONFLICTS,
  MOCK_ADMIN_SYSTEM_HEALTH,
  MOCK_ADMIN_AUDIT_LOGS
} from '../../data/mockAdmin';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export const AdminOverview: React.FC = () => {
  const navigate = useNavigate();

  // Compute metrics from mock backend dataset
  const metrics = {
    usersCount: MOCK_ADMIN_USERS.length,
    institutionsCount: MOCK_ADMIN_INSTITUTIONS.length,
    pendingApprovals: MOCK_ADMIN_APPROVALS.filter(a => a.status === 'Pending' || a.status === 'Under Review').length,
    pendingResearch: 3,
    datasetsCount: MOCK_ADMIN_DATASETS.length,
    gisLayersCount: MOCK_ADMIN_GIS_LAYERS.length,
    dataConflictsCount: MOCK_ADMIN_DATA_CONFLICTS.filter(c => c.status !== 'Resolved').length,
    systemHealth: 'System Healthy (1 Degraded API)'
  };

  const userGrowthData = [
    { month: 'Oct 2025', Users: 420 },
    { month: 'Nov 2025', Users: 680 },
    { month: 'Dec 2025', Users: 950 },
    { month: 'Jan 2026', Users: 1120 },
    { month: 'Feb 2026', Users: 1248 }
  ];

  const approvalStatusData = [
    { name: 'Approved', value: 24, color: '#2E6B45' },
    { name: 'Pending Review', value: 6, color: '#C98A18' },
    { name: 'Needs Changes', value: 3, color: '#1D5D91' },
    { name: 'Rejected', value: 2, color: '#A33A32' }
  ];

  return (
    <div className="space-y-6 select-none">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#1D5D91] text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-[#C98A18]" />
              <span>ADMIN PORTAL • SYSTEM ADMINISTRATION</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#123B63]">
              System Overview & Platform Administration
            </h1>
            <p className="text-xs text-slate-600 max-w-3xl">
              Manage platform user accounts, institutional verification, content approval workflows, spatial data governance, GIS layers, API integrations, and system health.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full font-bold text-xs flex items-center space-x-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{metrics.systemHealth}</span>
            </span>
            <DataSourceBadge status="PROTOTYPE_DERIVED" size="md" />
          </div>
        </div>
      </div>

      {/* System Status Indicators Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        {MOCK_ADMIN_SYSTEM_HEALTH.slice(1, 6).map(health => (
          <div key={health.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#123B63]">
              <span className="truncate">{health.category}</span>
              <span className={`w-2 h-2 rounded-full ${
                health.status === 'Healthy' ? 'bg-emerald-500' : 'bg-amber-500'
              }`}></span>
            </div>
            <div className="text-[10px] text-slate-500 truncate">{health.component}</div>
            <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-100 font-mono">
              <span className="text-slate-600">{health.responseTimeMs} ms</span>
              <span className="font-bold text-emerald-700">{health.uptimePercentage}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Real KPI Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <Link to="/admin/users" className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Users className="w-4 h-4 text-[#1D5D91]" />
            <span className="text-[9px] font-mono bg-slate-100 text-slate-600 px-1 rounded">Proto Data</span>
          </div>
          <div className="text-xl font-bold text-[#123B63]">1,248</div>
          <div className="text-[11px] font-semibold text-slate-600 truncate">Users</div>
        </Link>

        <Link to="/admin/institutions" className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Building className="w-4 h-4 text-[#2E6B45]" />
            <span className="text-[9px] font-mono bg-slate-100 text-slate-600 px-1 rounded">Proto Data</span>
          </div>
          <div className="text-xl font-bold text-[#123B63]">{metrics.institutionsCount}</div>
          <div className="text-[11px] font-semibold text-slate-600 truncate">Institutions</div>
        </Link>

        <Link to="/admin/approvals" className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
            <span className="text-[9px] font-mono bg-amber-50 text-amber-800 px-1 rounded">Action</span>
          </div>
          <div className="text-xl font-bold text-amber-700">{metrics.pendingApprovals}</div>
          <div className="text-[11px] font-semibold text-slate-600 truncate">Pending Review</div>
        </Link>

        <Link to="/admin/approvals" className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span className="text-[9px] font-mono bg-slate-100 text-slate-600 px-1 rounded">Papers</span>
          </div>
          <div className="text-xl font-bold text-[#123B63]">42</div>
          <div className="text-[11px] font-semibold text-slate-600 truncate">Pending Papers</div>
        </Link>

        <Link to="/admin/datasets" className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Database className="w-4 h-4 text-emerald-600" />
            <span className="text-[9px] font-mono bg-slate-100 text-slate-600 px-1 rounded">Open</span>
          </div>
          <div className="text-xl font-bold text-[#123B63]">{metrics.datasetsCount}</div>
          <div className="text-[11px] font-semibold text-slate-600 truncate">Datasets</div>
        </Link>

        <Link to="/admin/gis-layers" className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <MapPin className="w-4 h-4 text-[#C98A18]" />
            <span className="text-[9px] font-mono bg-slate-100 text-slate-600 px-1 rounded">Vectors</span>
          </div>
          <div className="text-xl font-bold text-[#123B63]">{metrics.gisLayersCount}</div>
          <div className="text-[11px] font-semibold text-slate-600 truncate">GIS Layers</div>
        </Link>

        <Link to="/admin/data-conflicts" className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs hover:border-red-500 transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-[9px] font-mono bg-red-50 text-red-800 px-1 rounded">Alert</span>
          </div>
          <div className="text-xl font-bold text-red-700">18</div>
          <div className="text-[11px] font-semibold text-slate-600 truncate">Data Conflicts</div>
        </Link>

        <Link to="/admin/system-health" className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span className="text-[9px] font-mono bg-emerald-50 text-emerald-800 px-1 rounded">Health</span>
          </div>
          <div className="text-xl font-bold text-emerald-700">99.9%</div>
          <div className="text-[11px] font-semibold text-slate-600 truncate">System Health</div>
        </Link>
      </div>

      {/* Quick Administrative Workflows Bar */}
      <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 shadow-xs space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-[#C98A18] flex items-center justify-between">
          <span>Administrative Quick Actions</span>
          <span className="text-[10px] text-slate-400">Direct Workflow Navigation</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => navigate('/admin/users')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 font-semibold transition-colors flex items-center space-x-1.5"
          >
            <Users className="w-3.5 h-3.5 text-[#C98A18]" />
            <span>Review Pending Users</span>
          </button>

          <button
            onClick={() => navigate('/admin/approvals')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 font-semibold transition-colors flex items-center space-x-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Review Research Papers</span>
          </button>

          <button
            onClick={() => navigate('/admin/datasets')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 font-semibold transition-colors flex items-center space-x-1.5"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Validate Dataset</span>
          </button>

          <button
            onClick={() => navigate('/admin/gis-layers')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 font-semibold transition-colors flex items-center space-x-1.5"
          >
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>Review GIS Layers</span>
          </button>

          <button
            onClick={() => navigate('/admin/data-conflicts')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 font-semibold transition-colors flex items-center space-x-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>Resolve Data Conflicts</span>
          </button>

          <button
            onClick={() => navigate('/admin/integrations')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 font-semibold transition-colors flex items-center space-x-1.5"
          >
            <Globe2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Check API Health</span>
          </button>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Registration Trend */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-sm text-[#123B63] flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#1D5D91]" />
              <span>Platform User Registrations Over Time</span>
            </h3>
            <span className="text-[10px] text-slate-400">Total: 1,248 Users</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="Users" stroke="#1D5D91" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Approval Workflows Breakdown */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-sm text-[#123B63] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Approval Workflows Status Breakdown</span>
            </h3>
            <span className="text-[10px] text-slate-400">Current Submissions</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={approvalStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {approvalStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities & Approval Log Table with UPDATED ROLE NAMES */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-[#123B63]">Recent Administrative Activity & Submission Audit Log</h2>
            <p className="text-xs text-slate-500">Updated in real-time across platform roles</p>
          </div>
          <Link to="/admin/audit" className="text-xs font-bold text-[#1D5D91] hover:underline flex items-center gap-1">
            <span>View Full Audit Log</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-[#123B63] font-bold border-b border-slate-200">
                <th className="p-2.5">User</th>
                <th className="p-2.5">Platform Role</th>
                <th className="p-2.5">Action</th>
                <th className="p-2.5">Resource</th>
                <th className="p-2.5">Date / Time</th>
                <th className="p-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="p-2.5 font-bold text-slate-900">Dr. Vikramaditya Joshi</td>
                <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-medium">Researcher</span></td>
                <td className="p-2.5 text-slate-700">Submitted Research Paper</td>
                <td className="p-2.5 font-mono text-slate-600">Land Use Study (Raigad)</td>
                <td className="p-2.5 text-slate-500">25 Sep 2026</td>
                <td className="p-2.5 text-right"><span className="px-2 py-0.5 bg-amber-50 text-amber-800 font-bold rounded">Pending Review</span></td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="p-2.5 font-bold text-slate-900">Priya Sharma</td>
                <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium">Data & GIS Officer</span></td>
                <td className="p-2.5 text-slate-700">Validated Dataset Vector</td>
                <td className="p-2.5 font-mono text-slate-600">District Boundaries v2.4</td>
                <td className="p-2.5 text-slate-500">25 Sep 2026</td>
                <td className="p-2.5 text-right"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-bold rounded">Success</span></td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="p-2.5 font-bold text-slate-900">Sanjay Deshmukh</td>
                <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-medium">Policy & Planning Officer</span></td>
                <td className="p-2.5 text-slate-700">Created Policy Scenario</td>
                <td className="p-2.5 font-mono text-slate-600">Policy Simulator (Buffer 50m)</td>
                <td className="p-2.5 text-slate-500">25 Sep 2026</td>
                <td className="p-2.5 text-right"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-bold rounded">Success</span></td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="p-2.5 font-bold text-slate-900">Abhay Kulkarni</td>
                <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 font-medium">System Administrator</span></td>
                <td className="p-2.5 text-slate-700">Approved User Account</td>
                <td className="p-2.5 font-mono text-slate-600">Researcher (Aniket Shinde)</td>
                <td className="p-2.5 text-slate-500">25 Sep 2026</td>
                <td className="p-2.5 text-right"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-bold rounded">Success</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
