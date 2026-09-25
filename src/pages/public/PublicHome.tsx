import React from 'react';
import { Link } from 'react-router-dom';
import {
  Globe2,
  Search,
  Database,
  MapPin,
  FileText,
  BookOpen,
  FolderKanban,
  BarChart3,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import {
  PUBLIC_RESEARCH_PAPERS,
  PUBLIC_OPEN_DATASETS,
  PUBLIC_REPORTS,
  PUBLIC_PROJECTS,
  PUBLIC_CLIMATE_DATA,
  PUBLIC_LAND_USE_DATA,
  PUBLIC_NOTICES
} from '../../data/mockPublic';
import { PublicGISMap } from '../../components/maps/PublicGISMap';
import { PublicResearchCard } from '../../components/public/PublicResearchCard';
import { PublicDatasetCard } from '../../components/public/PublicDatasetCard';
import { PublicReportCard } from '../../components/public/PublicReportCard';
import { DataSourceBadge } from '../../components/common/DataSourceBadge';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const PublicHome: React.FC = () => {
  // Compute counts directly from available datasets
  const counts = {
    research: PUBLIC_RESEARCH_PAPERS.length,
    datasets: PUBLIC_OPEN_DATASETS.length,
    gisLayers: 18, // Total active public GIS vector layers
    reports: PUBLIC_REPORTS.length,
    projects: PUBLIC_PROJECTS.length,
    statistics: PUBLIC_LAND_USE_DATA.length + PUBLIC_CLIMATE_DATA.length
  };

  // Pie chart data for Land Use Distribution
  const lulcOverview = [
    { name: 'Agriculture', value: 42651.8, color: '#84cc16' },
    { name: 'Forest', value: 12402.2, color: '#15803d' },
    { name: 'Built-up', value: 6431.9, color: '#dc2626' },
    { name: 'Water Bodies', value: 2451.9, color: '#0284c7' },
    { name: 'Barren Land', value: 3929.1, color: '#94a3b8' }
  ];

  // Rainfall trend chart data
  const rainfallTrend = PUBLIC_CLIMATE_DATA.map(d => ({
    district: d.district,
    Actual: d.rainfallActualMm,
    Normal: d.rainfallNormalMm
  }));

  return (
    <div className="space-y-8 select-none">
      {/* Hero Section */}
      <div className="relative bg-[#123B63] text-white rounded-xl p-8 shadow-lg overflow-hidden border border-[#1D5D91]">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#C98A18_2px,transparent_2px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#1D5D91]/80 px-3 py-1 rounded-full text-xs font-semibold text-amber-300 border border-amber-400/30">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Public Information Portal • Read-Only Open Governance Access</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
            National Land Governance Knowledge & Information Portal
          </h1>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Explore publicly available land-governance research, approved datasets, maps, statistics, projects and evidence. Transparent insights for citizens, researchers, and public planners.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/public/map"
              className="px-5 py-2.5 rounded-lg bg-[#C98A18] hover:bg-[#b07814] text-slate-950 font-bold text-sm shadow-md transition-all flex items-center space-x-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Explore Public GIS Map</span>
            </Link>

            <Link
              to="/public/research"
              className="px-5 py-2.5 rounded-lg bg-[#1D5D91] hover:bg-[#15466e] text-white font-semibold text-sm border border-slate-400/30 transition-all flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Search Research</span>
            </Link>

            <Link
              to="/public/open-data"
              className="px-5 py-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-600 transition-all flex items-center space-x-2"
            >
              <Database className="w-4 h-4" />
              <span>Browse Open Data</span>
            </Link>
          </div>
        </div>
      </div>

      {/* A. Public Information Overview Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="text-lg font-bold text-[#123B63] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#C98A18]" />
            <span>Public Information Overview</span>
          </h2>
          <span className="text-xs text-slate-500 font-mono">Calculated from published data</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link
            to="/public/research"
            className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition-all group"
          >
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <BookOpen className="w-5 h-5 text-[#1D5D91]" />
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-[#123B63]">{counts.research}</div>
            <div className="text-xs font-semibold text-slate-600">Published Research</div>
          </Link>

          <Link
            to="/public/open-data"
            className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition-all group"
          >
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <Database className="w-5 h-5 text-[#2E6B45]" />
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-[#123B63]">{counts.datasets}</div>
            <div className="text-xs font-semibold text-slate-600">Public Datasets</div>
          </Link>

          <Link
            to="/public/map"
            className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition-all group"
          >
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <Layers className="w-5 h-5 text-[#C98A18]" />
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-[#123B63]">{counts.gisLayers}</div>
            <div className="text-xs font-semibold text-slate-600">Public GIS Layers</div>
          </Link>

          <Link
            to="/public/reports"
            className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition-all group"
          >
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <FileText className="w-5 h-5 text-purple-700" />
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-[#123B63]">{counts.reports}</div>
            <div className="text-xs font-semibold text-slate-600">Public Reports</div>
          </Link>

          <Link
            to="/public/projects"
            className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition-all group"
          >
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <FolderKanban className="w-5 h-5 text-indigo-700" />
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-[#123B63]">{counts.projects}</div>
            <div className="text-xs font-semibold text-slate-600">Public Projects</div>
          </Link>

          <Link
            to="/public/statistics"
            className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs hover:border-[#1D5D91] transition-all group"
          >
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <TrendingUp className="w-5 h-5 text-amber-700" />
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-[#123B63]">{counts.statistics}</div>
            <div className="text-xs font-semibold text-slate-600">Land Statistics</div>
          </Link>
        </div>
      </section>

      {/* C. Public GIS Preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div>
            <h2 className="text-lg font-bold text-[#123B63] flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-[#1D5D91]" />
              <span>Public GIS Preview</span>
            </h2>
            <p className="text-xs text-slate-500">Approved spatial vector layers (District Boundaries, Climate, LULC, Infrastructure)</p>
          </div>
          <Link
            to="/public/map"
            className="px-4 py-2 bg-[#1D5D91] hover:bg-[#123B63] text-white font-bold text-xs rounded-md shadow-xs transition-colors flex items-center space-x-1.5"
          >
            <span>Open Full GIS Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <PublicGISMap height="450px" />
      </section>

      {/* B. Featured Public Information */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-lg font-bold text-[#123B63]">Featured Public Information</h2>
          <p className="text-xs text-slate-500">Selected peer-reviewed research, open datasets, and official reports</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Research */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#123B63] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#1D5D91]" />
                <span>Recently Published Research</span>
              </h3>
              <Link to="/public/research" className="text-xs text-[#1D5D91] font-semibold hover:underline">View All</Link>
            </div>
            <PublicResearchCard paper={PUBLIC_RESEARCH_PAPERS[0]} />
          </div>

          {/* Featured Dataset */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#123B63] flex items-center gap-1.5">
                <Database className="w-4 h-4 text-[#2E6B45]" />
                <span>Recently Updated Dataset</span>
              </h3>
              <Link to="/public/open-data" className="text-xs text-[#1D5D91] font-semibold hover:underline">View All</Link>
            </div>
            <PublicDatasetCard dataset={PUBLIC_OPEN_DATASETS[0]} />
          </div>

          {/* Featured Report */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#123B63] flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-purple-700" />
                <span>Latest Public Report</span>
              </h3>
              <Link to="/public/reports" className="text-xs text-[#1D5D91] font-semibold hover:underline">View All</Link>
            </div>
            <PublicReportCard report={PUBLIC_REPORTS[0]} />
          </div>
        </div>
      </section>

      {/* D. Latest Statistics Preview */}
      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-[#123B63] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#C98A18]" />
              <span>Public Land Governance Statistics Summary</span>
            </h2>
            <p className="text-xs text-slate-500">Key metrics on land use distribution and rainfall patterns</p>
          </div>
          <Link
            to="/public/statistics"
            className="text-xs font-bold text-[#1D5D91] hover:text-[#123B63] flex items-center gap-1"
          >
            <span>View Interactive Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LULC Pie Chart */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
            <h4 className="font-bold text-xs text-slate-700 text-center">Maharashtra Land Use Distribution (km²)</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={lulcOverview}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {lulcOverview.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${Number(value).toLocaleString()} km²`, 'Area']} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rainfall Bar Chart */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
            <h4 className="font-bold text-xs text-slate-700 text-center">Monsoon Rainfall vs Normal Baseline (mm)</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rainfallTrend}>
                  <XAxis dataKey="district" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(value: any) => [`${value} mm`, 'Rainfall']} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="Actual" fill="#0284c7" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Normal" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* E. Public Notice / Data Updates */}
      <section className="bg-[#123B63]/5 p-6 rounded-xl border border-[#1D5D91]/30 space-y-4">
        <div className="flex items-center justify-between border-b border-[#1D5D91]/20 pb-3">
          <h2 className="text-base font-bold text-[#123B63] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#C98A18]" />
            <span>Public Notices & Data Bulletin</span>
          </h2>
          <span className="text-xs text-slate-500">Updated Real-Time</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PUBLIC_NOTICES.map((notice) => (
            <div key={notice.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-50 text-amber-800 border border-amber-200">
                  {notice.category}
                </span>
                <h4 className="font-bold text-xs text-[#123B63] mt-2 line-clamp-2">{notice.title}</h4>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{notice.date}</span>
                <Link to={notice.link} className="text-[#1D5D91] font-bold hover:underline flex items-center gap-0.5">
                  <span>Open</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
