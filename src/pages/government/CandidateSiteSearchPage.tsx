import React, { useState } from 'react';
import { CANDIDATE_SITES_NAGPUR, CandidateSiteItem } from '../../data/maps/candidateSites.json';
import { Search, MapPin, Sliders, Filter, CheckCircle2, AlertTriangle, ArrowRight, Building, ShieldCheck, ChevronRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CandidateSiteSearchPage: React.FC = () => {
  const [projectTitle, setProjectTitle] = useState('IIT Campus / Educational Institution');
  const [targetDistrict, setTargetDistrict] = useState('Nagpur');
  const [targetState, setTargetState] = useState('Maharashtra');
  const [requiredAreaAcres, setRequiredAreaAcres] = useState(40);
  const [maxRoadDistKm, setMaxRoadDistKm] = useState(5);
  const [maxFloodRisk, setMaxFloodRisk] = useState<'Low' | 'Moderate' | 'High'>('Low');
  
  const [candidateResults, setCandidateResults] = useState<CandidateSiteItem[]>(CANDIDATE_SITES_NAGPUR);
  const [selectedSite, setSelectedSite] = useState<CandidateSiteItem | null>(CANDIDATE_SITES_NAGPUR[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter candidate sites based on user parameters
    const filtered = CANDIDATE_SITES_NAGPUR.filter((site) => {
      const areaMatches = site.Available_Area_Acres >= requiredAreaAcres;
      const distMatches = site.Road_Distance_km <= maxRoadDistKm;
      const floodMatches = maxFloodRisk === 'High' ? true : maxFloodRisk === 'Moderate' ? site.Flood_Risk !== 'High' : site.Flood_Risk === 'Low';
      return areaMatches && distMatches && floodMatches;
    });

    setCandidateResults(filtered.length > 0 ? filtered : CANDIDATE_SITES_NAGPUR);
    if (filtered.length > 0) setSelectedSite(filtered[0]);
  };

  const getScoreBadge = (score: number) => {
    if (score >= 85) return 'bg-[#2E6B45] text-white';
    if (score >= 75) return 'bg-[#1D5D91] text-white';
    return 'bg-[#C98A18] text-white';
  };

  return (
    <div className="space-y-6 select-none text-xs">
      
      {/* Header Bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-md border border-[#D9DEE5] shadow-2xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D5D91] bg-[#1D5D91]/10 px-2 py-0.5 rounded">
            Government Portal &bull; Spatial Intelligence
          </span>
          <h2 className="text-xl font-bold text-[#123B63] font-serif mt-1">
            Candidate Site Selection & Multi-Criteria Spatial Filtering
          </h2>
          <p className="text-xs text-[#5B6573]">
            Automated spatial parcel search for major infrastructure projects (*e.g., "IIT in Nagpur"*)
          </p>
        </div>

        <Link
          to="/government/policy/simulator"
          className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-3.5 py-1.5 rounded font-bold text-xs shadow-2xs flex items-center space-x-1.5 transition-colors"
        >
          <Sliders className="w-3.5 h-3.5 text-[#C98A18]" />
          <span>Simulate Policy Scenarios</span>
        </Link>
      </div>

      {/* INPUT FORM: PROJECT REQUIREMENT PARSER */}
      <form onSubmit={handleSearch} className="bg-white p-5 rounded-lg border border-[#D9DEE5] shadow-xs space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
          <Search className="w-4 h-4 text-[#1D5D91]" />
          <h3 className="font-bold text-sm text-[#123B63]">Project Requirements & Multi-Criteria Constraints</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          <div>
            <label className="font-bold text-slate-700 block mb-1">Proposed Project Type:</label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full p-2 bg-[#F5F7F9] border border-[#D9DEE5] rounded font-semibold text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Target District:</label>
            <select
              value={targetDistrict}
              onChange={(e) => setTargetDistrict(e.target.value)}
              className="w-full p-2 bg-[#F5F7F9] border border-[#D9DEE5] rounded font-semibold text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="Nagpur">Nagpur (Maharashtra)</option>
              <option value="Thane">Thane (Maharashtra)</option>
              <option value="Raigad">Raigad (Maharashtra)</option>
              <option value="Pune">Pune (Maharashtra)</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Required Area (Acres):</label>
            <input
              type="number"
              value={requiredAreaAcres}
              onChange={(e) => setRequiredAreaAcres(parseInt(e.target.value) || 10)}
              className="w-full p-2 bg-[#F5F7F9] border border-[#D9DEE5] rounded font-semibold text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Max Highway Dist (km):</label>
            <input
              type="number"
              value={maxRoadDistKm}
              onChange={(e) => setMaxRoadDistKm(parseFloat(e.target.value) || 1)}
              className="w-full p-2 bg-[#F5F7F9] border border-[#D9DEE5] rounded font-semibold text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Max Flood Risk Level:</label>
            <select
              value={maxFloodRisk}
              onChange={(e) => setMaxFloodRisk(e.target.value as any)}
              className="w-full p-2 bg-[#F5F7F9] border border-[#D9DEE5] rounded font-semibold text-slate-800 focus:outline-none focus:border-[#1D5D91]"
            >
              <option value="Low">Low Flood Risk Only</option>
              <option value="Moderate">Low or Moderate Risk</option>
              <option value="High">Allow All Zones</option>
            </select>
          </div>

        </div>

        <button
          type="submit"
          className="bg-[#123B63] hover:bg-[#1D5D91] text-white px-6 py-2.5 rounded-md font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-2"
        >
          <Search className="w-4 h-4 text-[#C98A18]" />
          <span>Execute Spatial Filtering & Candidate Site Generation</span>
        </button>
      </form>

      {/* RESULTS DISPLAY: LEFT GIS MAP | RIGHT CANDIDATE CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT MAP DISPLAY */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex justify-between items-center bg-white p-3 rounded border border-[#D9DEE5]">
            <h3 className="font-bold text-[#123B63] text-xs">
              MapLibre GIS: Candidate Locations in {targetDistrict} ({candidateResults.length} Generated Sites)
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Layer: Candidate Parcels Vector</span>
          </div>

          {/* Interactive GIS Simulation Map */}
          <div className="relative h-[480px] bg-[#E3E8EE] rounded-lg border border-[#D9DEE5] p-6 flex flex-col justify-between overflow-hidden bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]">
            
            <div className="bg-white/95 px-3 py-1.5 rounded border border-[#D9DEE5] shadow-xs text-[11px] font-bold text-[#123B63] self-start">
              Project: {projectTitle} &bull; Required Area: {requiredAreaAcres} Acres
            </div>

            {/* Candidate Site Markers Grid */}
            <div className="my-auto grid grid-cols-2 sm:grid-cols-3 gap-3">
              {candidateResults.map((site) => {
                const isSelected = selectedSite?.Candidate_ID === site.Candidate_ID;
                const scoreColor = getScoreBadge(site.Suitability_Score);

                return (
                  <div
                    key={site.Candidate_ID}
                    onClick={() => setSelectedSite(site)}
                    className={`cursor-pointer p-3 rounded-md border bg-white shadow-md transition-all ${
                      isSelected ? 'ring-3 ring-[#1D5D91] border-[#1D5D91] scale-103' : 'border-slate-300 hover:border-[#1D5D91]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#123B63] truncate">{site.Candidate_ID}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${scoreColor}`}>
                        {site.Suitability_Score}%
                      </span>
                    </div>

                    <p className="font-bold text-[11px] text-slate-800 mt-1 line-clamp-1">{site.Candidate_Name}</p>
                    
                    <div className="mt-2 pt-1 border-t border-slate-100 flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>{site.Available_Area_Acres} Acres</span>
                      <span className="text-[#2E6B45] font-bold">{site.Flood_Risk} Flood</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-[10px] text-slate-500 bg-white/90 p-2 rounded self-start border border-slate-200">
              * Note: Displays analytical candidate site options. Final site allocation requires statutory government approval.
            </div>

          </div>
        </div>

        {/* RIGHT INSPECTION DRAWER FOR SELECTED CANDIDATE SITE */}
        <div className="lg:col-span-5 space-y-4">
          {selectedSite ? (
            <div className="bg-white p-5 rounded-lg border border-[#D9DEE5] shadow-xs space-y-4">
              
              <div className="border-b border-slate-200 pb-3 flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-[#1D5D91] uppercase tracking-wider">Candidate Site Profile</span>
                  <h3 className="font-bold text-sm text-[#123B63]">{selectedSite.Candidate_Name}</h3>
                  <p className="text-[11px] text-slate-500 font-mono">ID: {selectedSite.Candidate_ID} &bull; Parcel: {selectedSite.Parcel_ID}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded ${getScoreBadge(selectedSite.Suitability_Score)}`}>
                  Suitability: {selectedSite.Suitability_Score}%
                </span>
              </div>

              {/* Spatial Location & Land Status */}
              <div className="bg-[#F5F7F9] p-3 rounded border border-slate-200 space-y-1.5 text-[11px]">
                <div className="flex justify-between"><span>District / Taluka:</span><strong className="text-[#123B63]">{selectedSite.District}, {selectedSite.Taluka} ({selectedSite.Village})</strong></div>
                <div className="flex justify-between"><span>Available Land Area:</span><strong className="text-[#2E6B45] font-bold">{selectedSite.Available_Area_Acres} Acres</strong></div>
                <div className="flex justify-between"><span>Land Ownership / Status:</span><strong className="text-slate-800">{selectedSite.Land_Status}</strong></div>
                <div className="flex justify-between"><span>Current LULC Class:</span><strong className="text-slate-800">{selectedSite.LULC}</strong></div>
              </div>

              {/* Connectivity & Proximity Metrics */}
              <div>
                <span className="font-bold text-[#123B63] block text-[11px] mb-1.5">Infrastructure & Connectivity Access:</span>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded border border-slate-200">
                  <div><span>Highway Dist:</span> <strong className="text-[#1D5D91]">{selectedSite.Road_Distance_km} km</strong></div>
                  <div><span>Railway Dist:</span> <strong className="text-[#1D5D91]">{selectedSite.Rail_Distance_km} km</strong></div>
                  <div><span>Airport Dist:</span> <strong className="text-[#1D5D91]">{selectedSite.Airport_Distance_km} km</strong></div>
                  <div><span>Water Source:</span> <strong className="text-[#1D5D91]">{selectedSite.Water_Source_Distance_km} km</strong></div>
                </div>
              </div>

              {/* Terrain & Climate Profile */}
              <div>
                <span className="font-bold text-[#123B63] block text-[11px] mb-1.5">Climate & Terrain Profile:</span>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded border border-slate-200">
                  <div><span>Elevation / Slope:</span> <strong className="text-slate-800">{selectedSite.Elevation_m}m / {selectedSite.Slope_Degrees}°</strong></div>
                  <div><span>Flood Hazard:</span> <strong className="text-[#2E6B45]">{selectedSite.Flood_Risk}</strong></div>
                  <div><span>Rainfall / Temp:</span> <strong className="text-slate-800">{selectedSite.Rainfall_mm}mm / {selectedSite.Temperature_Max_C}°C</strong></div>
                  <div><span>Soil Drainage:</span> <strong className="text-slate-800">{selectedSite.Soil_Drainage}</strong></div>
                </div>
              </div>

              {/* Key Advantages */}
              <div>
                <span className="font-bold text-[#2E6B45] block text-[11px] mb-1">Key Spatial Advantages:</span>
                <ul className="space-y-1 text-slate-700 text-[11px]">
                  {selectedSite.Key_Advantages.map((adv, idx) => (
                    <li key={idx} className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2E6B45]" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-200 flex space-x-2">
                <Link
                  to="/government/policy/simulator"
                  className="flex-1 bg-[#123B63] hover:bg-[#1D5D91] text-white py-2 rounded text-center font-bold text-xs shadow-2xs transition-colors"
                >
                  Simulate Policy Impact
                </Link>
                <Link
                  to="/government/reports"
                  className="flex-1 border border-[#1D5D91] text-[#1D5D91] hover:bg-[#1D5D91] hover:text-white py-2 rounded text-center font-bold text-xs transition-colors"
                >
                  Generate Decision Brief
                </Link>
              </div>

            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg border border-[#D9DEE5] text-center text-slate-500">
              Select a candidate site from the map to inspect full parameters.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
