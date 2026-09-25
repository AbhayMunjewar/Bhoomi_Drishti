import React, { useState } from 'react';
import { Database, Search, Filter, HardDrive, Calendar, FileCode, Download, RefreshCw } from 'lucide-react';
import { PUBLIC_OPEN_DATASETS, PublicDataset } from '../../data/mockPublic';
import { PublicDatasetCard } from '../../components/public/PublicDatasetCard';

export const PublicOpenDataPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');

  const categories = [
    'All',
    'Land',
    'LULC',
    'Climate',
    'Rainfall',
    'Infrastructure',
    'Population',
    'Research',
    'Environment',
    'Projects'
  ];

  const formats = ['All', 'CSV', 'GeoJSON', 'NetCDF', 'KML', 'Shapefile'];

  const filteredDatasets = PUBLIC_OPEN_DATASETS.filter(ds => {
    const matchesSearch =
      ds.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.publisher.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === 'All' || ds.category === selectedCategory;
    const matchesFormat = selectedFormat === 'All' || ds.format === selectedFormat;

    return matchesSearch && matchesCat && matchesFormat;
  });

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center space-x-2 text-[#2E6B45] text-xs font-bold uppercase tracking-wider mb-1">
          <Database className="w-4 h-4 text-[#C98A18]" />
          <span>National Open Data Catalogue</span>
        </div>
        <h1 className="text-2xl font-serif font-bold text-[#123B63]">
          Public Spatial & Government Datasets
        </h1>
        <p className="text-xs text-slate-600 max-w-3xl">
          Browse, preview, and download open government land-governance datasets, IMD climate matrices, and spatial vector layers. Formatted in machine-readable GeoJSON and CSV schemas under Open Government Data (OGDL India) licenses.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search datasets by keyword, publisher, or category..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#1D5D91] text-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Dataset Category</label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md py-1.5 px-2 text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              {categories.map((c, idx) => (
                <option key={idx} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">File Format</label>
            <select
              value={selectedFormat}
              onChange={e => setSelectedFormat(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md py-1.5 px-2 text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              {formats.map((f, idx) => (
                <option key={idx} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedFormat('All');
              }}
              className="w-full py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md border border-slate-300 transition-colors flex items-center justify-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Catalogue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDatasets.map(ds => (
          <PublicDatasetCard key={ds.id} dataset={ds} />
        ))}
      </div>
    </div>
  );
};
