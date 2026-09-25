import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import {
  LayoutDashboard,
  MapPin,
  FileSpreadsheet,
  AlertTriangle,
  Sliders,
  BarChart3,
  FileText,
  ShieldCheck,
  Search,
  BookOpen,
  FolderKanban,
  Database,
  Globe2,
  Users,
  Building,
  CheckCircle2,
  Lock,
  ChevronRight,
  Layers,
  CloudRain,
  HelpCircle,
  Activity
} from 'lucide-react';

interface SidebarProps {
  portalType: 'government' | 'research' | 'institution' | 'public' | 'admin' | 'data';
}

export const Sidebar: React.FC<SidebarProps> = ({ portalType }) => {
  const { user } = useAuthStore();
  const location = useLocation();

  const getMenuItems = () => {
    switch (portalType) {
      case 'government':
        return [
          { label: 'Overview', path: '/government/district', icon: LayoutDashboard },
          { label: 'GIS Intelligence', path: '/government/district', icon: MapPin },
          { label: 'State Authority', path: '/government/state', icon: Building },
          { label: 'National Authority', path: '/government/national', icon: Globe2 },
          { label: 'Land Risk Analysis', path: '/government/risk', icon: AlertTriangle },
          { label: 'Policy Simulator', path: '/government/policy/simulator', icon: Sliders },
          { label: 'Scenario Comparison', path: '/government/policy/scenario-comparison', icon: BarChart3 },
          { label: 'Research Evidence', path: '/government/research-evidence', icon: BookOpen },
          { label: 'Reports', path: '/government/reports', icon: FileText },
          { label: 'Audit Trail', path: '/government/audit', icon: ShieldCheck }
        ];

      case 'research':
        return [
          { label: 'Overview', path: '/research', icon: LayoutDashboard },
          { label: 'AI Research Search', path: '/research/search', icon: Search },
          { label: 'Research Map', path: '/research/map', icon: MapPin },
          { label: 'Research Papers', path: '/research/papers', icon: BookOpen },
          { label: 'Research Projects', path: '/research/projects', icon: FolderKanban },
          { label: 'Datasets', path: '/research/datasets', icon: Database },
          { label: 'Workspace', path: '/research/workspace', icon: FileSpreadsheet }
        ];

      case 'institution':
        return [
          { label: 'Overview', path: '/institution', icon: LayoutDashboard },
          { label: 'Researchers', path: '/institution/researchers', icon: Users },
          { label: 'Research Projects', path: '/institution/projects', icon: FolderKanban },
          { label: 'Datasets', path: '/institution/datasets', icon: Database },
          { label: 'Publications', path: '/institution/publications', icon: BookOpen }
        ];

      case 'public':
        return [
          { label: 'Home', path: '/public', icon: LayoutDashboard },
          { label: 'Public GIS Map', path: '/public/map', icon: MapPin },
          { label: 'Research Knowledge', path: '/public/research', icon: BookOpen },
          { label: 'Public Reports', path: '/public/reports', icon: FileText },
          { label: 'Statistics', path: '/public/statistics', icon: BarChart3 },
          { label: 'Open Data', path: '/public/open-data', icon: Database },

          // Secondary Section
          { label: 'Projects & Initiatives', path: '/public/projects', icon: FolderKanban, section: 'Exploration' },
          { label: 'Land-use Trends', path: '/public/land-use', icon: Layers },
          { label: 'Climate Information', path: '/public/climate', icon: CloudRain },
          { label: 'About BhoomiDrishti', path: '/public/about', icon: Globe2 },
          { label: 'Help / Data Guide', path: '/public/help', icon: HelpCircle }
        ];

      case 'data':
        return [
          { label: 'Overview', path: '/data/dashboard', icon: LayoutDashboard },

          // DATA MANAGEMENT
          { label: 'Datasets', path: '/data/datasets', icon: Database, section: 'Data Management' },
          { label: 'Upload & Ingestion', path: '/data/upload', icon: FileSpreadsheet },
          { label: 'Data Validation', path: '/data/validation', icon: CheckCircle2 },
          { label: 'Data Sources', path: '/data/sources', icon: Globe2 },
          { label: 'Dataset Versions', path: '/data/versions', icon: FolderKanban },

          // GIS MANAGEMENT
          { label: 'GIS Layers', path: '/data/gis-layers', icon: MapPin, section: 'GIS Management' },
          { label: 'GIS Map Workspace', path: '/data/gis-map', icon: Layers },
          { label: 'Spatial Analysis', path: '/data/spatial-analysis', icon: BarChart3 },

          // QUALITY & CONFLICTS
          { label: 'Data Quality', path: '/data/quality', icon: ShieldCheck, section: 'Quality & Conflicts' },
          { label: 'Data Conflicts', path: '/data/conflicts', icon: AlertTriangle },
          { label: 'Data Freshness', path: '/data/freshness', icon: CloudRain },

          // SYSTEM
          { label: 'Integrations', path: '/data/integrations', icon: Sliders, section: 'System' },
          { label: 'Data Activity Log', path: '/data/activity', icon: Activity }
        ];

      case 'admin':
        return [
          // ADMINISTRATION
          { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
          { label: 'User Management', path: '/admin/users', icon: Users },
          { label: 'Institutions', path: '/admin/institutions', icon: Building },
          { label: 'Approval Workflows', path: '/admin/approvals', icon: CheckCircle2 },

          // DATA GOVERNANCE
          { label: 'Datasets', path: '/admin/datasets', icon: Database, section: 'Data Governance' },
          { label: 'GIS Layers', path: '/admin/gis-layers', icon: MapPin },
          { label: 'Data Conflicts', path: '/admin/data-conflicts', icon: AlertTriangle },

          // SYSTEM
          { label: 'Integrations', path: '/admin/integrations', icon: Globe2, section: 'System' },
          { label: 'Audit Logs', path: '/admin/audit', icon: ShieldCheck },
          { label: 'System Health', path: '/admin/system-health', icon: Activity },
          { label: 'Settings & Roles', path: '/admin/settings', icon: Sliders }
        ];
    }
  };

  const items = getMenuItems();

  const getPortalTitle = () => {
    switch (portalType) {
      case 'government':
        return 'Government Portal';
      case 'research':
        return 'Research Portal';
      case 'institution':
        return 'Institution Portal';
      case 'public':
        return 'Public Information Portal';
      case 'data':
        return 'Data & GIS Officer Portal';
      case 'admin':
        return 'Admin Portal';
    }
  };

  return (
    <aside className="w-64 bg-[#123B63] text-slate-200 border-r border-[#1D5D91] min-h-[calc(100vh-110px)] shrink-0 flex flex-col justify-between select-none">
      <div>
        {/* Portal Header Card */}
        <div className="p-4 bg-[#1D5D91]/60 border-b border-[#1D5D91]">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#C98A18]"></div>
            <span className="font-bold text-xs uppercase tracking-wider text-white">
              {getPortalTitle()}
            </span>
          </div>
          {user && (
            <div className="mt-2 pt-2 border-t border-slate-600/40 text-[11px] text-slate-300">
              <p className="font-semibold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-slate-300 truncate">{user.department}</p>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-1 text-xs font-medium">
          {items.map((item, idx) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <React.Fragment key={idx}>
                {item.section && (
                  <div className="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-amber-400/80 border-t border-slate-700/50 mt-2">
                    {item.section}
                  </div>
                )}
                <NavLink
                  to={item.path}
                  end={item.path === '/public'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-[#1D5D91] text-white font-bold shadow-xs border-l-4 border-[#C98A18]'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#C98A18]' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3 h-3 text-[#C98A18]" />}
                </NavLink>
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Footer Info inside Sidebar */}
      <div className="p-3 m-2 bg-[#1D5D91]/30 border border-[#1D5D91]/60 rounded text-[10px] text-slate-300 space-y-1">
        <p className="font-semibold text-white">Public Access Mode</p>
        <p className="text-slate-400">Read-Only Governance Information & Evidence Ecosystem.</p>
      </div>
    </aside>
  );
};
