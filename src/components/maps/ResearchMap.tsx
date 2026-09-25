import React, { useState } from 'react';
import { researchLocationsGeoJSON } from '../../data/maps/projects.geojson';
import { MapPin, BookOpen, FileText, Database, FolderKanban, Search, Filter } from 'lucide-react';

export const ResearchMap: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedItem, setSelectedItem] = useState(researchLocationsGeoJSON.features[0].properties);

  const features = researchLocationsGeoJSON.features;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Research Paper':
        return '#1D5D91';
      case 'Case Study':
        return '#C98A18';
      case 'Research Project':
        return '#2E6B45';
      default:
        return '#123B63';
    }
  };

  return (
    <div className="space-y-4">
      {/* Map Filter Bar */}
      <div className="bg-white p-3 rounded-md border border-[#D9DEE5] shadow-2xs flex flex-wrap justify-between items-center gap-3 text-xs">
        <div className="flex items-center space-x-3">
          <Filter className="w-4 h-4 text-[#1D5D91]" />
          <span className="font-bold text-[#123B63]">Filter Research by Topic:</span>
          
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="px-3 py-1 bg-[#F5F7F9] border border-[#D9DEE5] rounded font-semibold text-slate-700 focus:outline-none focus:border-[#1D5D91]"
          >
            <option>All Topics</option>
            <option>Climate & Land Resilience</option>
            <option>Land Administration & GIS</option>
            <option>Sustainable Land Use</option>
            <option>Industrial Land Governance</option>
          </select>
        </div>

        <div className="flex items-center space-x-4 text-slate-600">
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1D5D91]"></span>
            <span>Research Paper</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C98A18]"></span>
            <span>Case Study</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2E6B45]"></span>
            <span>Research Project</span>
          </span>
        </div>
      </div>

      {/* Map Body & Side Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Interactive Map Visualizer */}
        <div className="lg:col-span-2 relative h-[450px] bg-[#E3E8EE] rounded-lg border border-[#D9DEE5] p-6 flex flex-col justify-between overflow-hidden bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="bg-white/95 px-3 py-1.5 rounded border border-[#D9DEE5] shadow-xs text-xs font-semibold text-[#123B63] self-start">
            Geographic Distribution of Research Studies & Projects
          </div>

          {/* Markers */}
          <div className="my-auto grid grid-cols-2 gap-4">
            {features.map((feat, idx) => {
              const props = feat.properties;
              const isSelected = selectedItem?.id === props.id;
              const color = getTypeColor(props.type);

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedItem(props)}
                  className={`cursor-pointer p-4 rounded-md border bg-white shadow-md transition-all ${
                    isSelected ? 'ring-2 ring-[#1D5D91] border-[#1D5D91] scale-102' : 'border-slate-300 hover:border-[#1D5D91]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#123B63]">{props.district}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: color }}>
                      {props.type}
                    </span>
                  </div>
                  <h5 className="font-bold text-xs text-slate-800 mt-2 line-clamp-2">{props.title}</h5>
                  <p className="text-[11px] text-slate-500 mt-1">{props.authors} ({props.year})</p>
                </div>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-500 bg-white/90 p-2 rounded self-start">
            Click any research study marker to view geographic relevance & findings.
          </div>
        </div>

        {/* Selected Study Inspection Card */}
        {selectedItem && (
          <div className="bg-white p-5 rounded-lg border border-[#D9DEE5] shadow-xs space-y-3 text-xs">
            <div className="flex items-center space-x-2 text-[#1D5D91]">
              <BookOpen className="w-4 h-4" />
              <span className="font-bold text-xs uppercase tracking-wider">Research Study Details</span>
            </div>

            <h4 className="font-bold text-sm text-[#123B63] leading-snug">
              {selectedItem.title}
            </h4>

            <div className="space-y-1 text-slate-600 bg-[#F5F7F9] p-3 rounded border border-slate-200">
              <p><span className="font-bold text-slate-800">Authors:</span> {selectedItem.authors}</p>
              <p><span className="font-bold text-slate-800">Year:</span> {selectedItem.year}</p>
              <p><span className="font-bold text-slate-800">Geographic Location:</span> {selectedItem.district} District, MH</p>
              <p><span className="font-bold text-slate-800">Topic:</span> {selectedItem.topic}</p>
            </div>

            <div>
              <span className="font-bold text-[#123B63] block mb-1">Key Research Findings:</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Detailed remote sensing and field evaluation confirmed significant land-use conversion along flood risk buffers. Recommends statutory policy intervention.
              </p>
            </div>

            <a
              href="/research/papers/paper-01"
              className="w-full mt-3 bg-[#123B63] hover:bg-[#1D5D91] text-white py-2 rounded font-bold text-xs text-center block transition-colors shadow-2xs"
            >
              View Complete Research Paper & Evidence
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
